const Joi = require("joi");
const uuid = require("uuid");
const path = require("path");
const { Op } = require("sequelize");

const {
  Product,
  OrderProduct,
  Order,
  Attribute,
  Option,
  OptionValue,
  Category,
  Manufacturer,
  ProductAttribute,
  ProductOption,
  Size,
  ProductSize
} = require("../models");

class ProductController {
  async list(req, res, next) {
    const querySchema = Joi.object({
      parentCategoryId: Joi.number(),
      sort: Joi.string().optional(),
      filter: Joi.string().optional(),
    });

    const { parentCategoryId, sort, filter } = await querySchema.validateAsync(
      req.query
    );

    const where = {};

    if (parentCategoryId) {
      const categories = await Category.findAll({
        where: { parentCategoryId },
      });
      const categoryIds = categories.map((category) => category.id);
      where.CategoryId = categoryIds;
    }

    if (filter) {
      const { CategoryId, manufacturer, fromPrice, toPrice } =
        JSON.parse(filter); // Витягуємо параметри фільтру з об'єкта filter

      if (CategoryId) {
        where.CategoryId = CategoryId; // Додаємо умову для категорії одягу
      }
      if (manufacturer) {
        // Отримуємо ідентифікатор виробника за його іменем з іншої таблички Manufacturer
        const manufacturerInstance = await Manufacturer.findOne({
          where: { name: manufacturer },
        });
        console.log("Manufacturer: ", manufacturerInstance.id);
        if (manufacturerInstance) {
          where.ManufacturerId = manufacturerInstance.id; // Додаємо умову для ідентифікатора виробника
        }
      }
      if (fromPrice && toPrice) {
        where.price = { [Op.between]: [fromPrice, toPrice] }; // Додаємо умову для ціни в межах від fromPrice до toPrice
      }
    }

    console.log("Filters ................", where);

    let order = [];
    if (sort) {
      // Якщо переданий параметр сортування, додати його до умови сортування
      const { sortField, sortOrder } = JSON.parse(sort);
      order = [[sortField, sortOrder]];
    }

    const list = await Product.findAll({ where, order });

    return list;
  }

  async create(req, res, next) {
    const bodySchema = Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number().required(),
      SKU: Joi.string().required(),
      CategoryId: Joi.number().required(),
      ManufacturerId: Joi.number().required(),
    });

    const { name, description, price, SKU, CategoryId, ManufacturerId } =
      await bodySchema.validateAsync(req.body);
    const { image_url } = req.files;
    let fileName = uuid.v4() + ".jpg";
    image_url.mv(path.resolve(__dirname, "..", "static", fileName));

    const product = await Product.create({
      name,
      description,
      price,
      SKU,
      image_url: fileName,
      CategoryId,
      ManufacturerId,
    });

    return product;
  }

  async getById(req, res, next) {
    const querySchema = Joi.object({
      productId: Joi.number(),
    });

    const { productId } = await querySchema.validateAsync(req.query);

    const product = await Product.findOne({
      where: {
        id: productId,
      },
      include: [
        {
          model: Category,
        },
        {
          model: Manufacturer,
        },
      ],
    });

    if (!product) {
      throw new Error("Product not found");
    }

    const attributes = await ProductAttribute.findAll({
      where: {
        productId,
      },
      include: [
        {
          model: Attribute,
          as: 'attribute',
        },
      ],
    });

    const options = await ProductSize.findAll({
      where: {
        productId,
      },
      include: [
        {
          model: Size,
          as: 'size',
        },
      ],
    });

    return {
      product,
      attributes: attributes.map(attribute => ({
        name: attribute.attribute.name,
        value: attribute.value,
      })),
      options: options.map(option => ({
        id: option.id,
        name: option.size.name,
      })),
    };
  }

  async addToCart(req, res, next) {
    const bodySchema = Joi.object({
      productId: Joi.number().required(),
      quantity: Joi.number().required(),
      sizeId: Joi.number().required(),
    });

    const { productId, quantity, sizeId } = await bodySchema.validateAsync(
      req.body
    );

    const userId = req.user.id;

    const product = await Product.findOne({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    const orderProduct = await OrderProduct.findOne({
      where: {
        ProductId: productId,
        UserId: userId,
      },
    });

    if (orderProduct) {
      await OrderProduct.update(
        {
          quantity: orderProduct.quantity + quantity,
          amount: product.price * (orderProduct.quantity + quantity),
        },
        {
          where: {
            id: orderProduct.id,
          },
        }
      );
    } else {
      await OrderProduct.create({
        ProductId: productId,
        UserId: userId,
        amount: product.price * quantity,
        quantity: quantity,
        OrderId: null,
      });
    }

    return true;
  }

  async deleteFromCart(req, res, next) {
    const querySchema = Joi.object({
      orderProductId: Joi.number().required(),
    });

    const { orderProductId } = await querySchema.validateAsync(req.query);

    const item = await OrderProduct.destroy({
      where: {
        id: orderProductId,
        OrderId: null,
      },
    });

    return item;
  }

  async cartList(req, res, next) {
    const userId = req.user.id;

    const list = await OrderProduct.findAll({
      where: {
        UserId: userId,
        OrderId: null,
      },
      include: { model: Product },
    });

    return list;
  }

  async createOrder(req, res, next) {
    const userId = req.user.id;

    console.log("User ID: ", userId)

    const orderProductList = await OrderProduct.findAll({
      where: {
        UserId: userId,
        OrderId: null,
      },
      include: [{ model: Product }],
    });

    console.log("................... ",orderProductList);

    if (!orderProductList) {
      throw new Error("No products in cart");
    }

    let totalAmount = 0;
    for (let index = 0; index < orderProductList.length; index++) {
      totalAmount += orderProductList[index].amount; 
    }

    const currentDate = new Date();

    console.log("Total Amount: ", totalAmount, "Date: ", currentDate);

    const order = await Order.create({
      total_amount: totalAmount,
      status: "Processing",
      UserId: userId,
      date: currentDate,
    });

    for (let index = 0; index < orderProductList.length; index++) {
      await OrderProduct.update(
        {
          OrderId: order.id,
        },
        {
          where: {
            id: orderProductList[index].id,
          },
        }
      );
    }

    return order;
  }

  async createAttribute(req, res, next) {
    const bodySchema = Joi.object({
      name: Joi.string().required(),
    });

    const { name } = await bodySchema.validateAsync(req.body);

    const attribute = await Attribute.create({
      name,
    });

    return attribute;
  }

  async createSize(req, res, next) {
    const bodySchema = Joi.object({
      name: Joi.string().required(),
    });

    const { name } = await bodySchema.validateAsync(req.body);

    const size = await Size.create({
      name,
    });

    return size;
  }

  async createProductSize(req, res, next) {
    const bodySchema = Joi.object({
      productId: Joi.number().required(),
      sizeId: Joi.number().required(),
      quantity: Joi.number().required()
    });

    const { productId, sizeId, quantity } = await bodySchema.validateAsync(req.body);

    const productSize = await ProductSize.create({
      ProductId: productId,
      SizeId: sizeId,
      quantity: quantity
    });

    return productSize;
  }
}

module.exports = new ProductController();
