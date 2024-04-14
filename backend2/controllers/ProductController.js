const Joi = require('joi');
const uuid = require('uuid');
const path = require('path');
const { Op } = require("sequelize");

const { Product, OrderProduct, Order, Attribute, Option, OptionValue, Category, Manufacturer } = require("../models");

class ProductController {
  async list(req, res, next) {
    const querySchema = Joi.object({
      parentCategoryId: Joi.number(),
      sort: Joi.string().optional(),
      filter: Joi.string().optional(),
    });

    const { parentCategoryId, sort, filter} = await querySchema.validateAsync(req.query);

    console.log("Filter string ....................",filter)

    const where = {};

    if (parentCategoryId) {
      const categories = await Category.findAll({ where: { parentCategoryId } });
      const categoryIds = categories.map(category => category.id);
      where.CategoryId = categoryIds;
    }

    if(filter) {
      const { CategoryId, manufacturer, fromPrice, toPrice } = JSON.parse(filter); // Витягуємо параметри фільтру з об'єкта filter

      if(CategoryId) {
        where.CategoryId = CategoryId; // Додаємо умову для категорії одягу
      }
      if(manufacturer) {
        // Отримуємо ідентифікатор виробника за його іменем з іншої таблички Manufacturer
        const manufacturerInstance = await Manufacturer.findOne({ where: { name: manufacturer } });
        console.log("Manufacturer: ", manufacturerInstance.id)
        if(manufacturerInstance) {
          where.ManufacturerId = manufacturerInstance.id; // Додаємо умову для ідентифікатора виробника
        }
      }
      if(fromPrice && toPrice) {
        where.price = { [Op.between]: [fromPrice, toPrice] }; // Додаємо умову для ціни в межах від fromPrice до toPrice
      }
    }

    console.log("Filters ................", where);

    let order = [];
    if (sort) { // Якщо переданий параметр сортування, додати його до умови сортування
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

    const { name, description, price, SKU, CategoryId, ManufacturerId} = await bodySchema.validateAsync(req.body);
    const {image_url} = req.files;
    let fileName = uuid.v4() + ".jpg";
    image_url.mv(path.resolve(__dirname, '..', 'static', fileName));


    const product = await Product.create({
      name,
      description,
      price,
      SKU,
      image_url: fileName,
      CategoryId,
      ManufacturerId
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
          model: Category
        },
        {
          model: Manufacturer
        },
      ],
    });

    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  }

  async sortedList(req, res, next) {
    const querySchema = Joi.object({
      sortField: Joi.string(),
      sortOrder: Joi.string(),
    });

    const { sortField, sortOrder } = await querySchema.validateAsync(req.query);

    try {
        const products = await Product.findAll({
            order: [[sortField, sortOrder]], // sortField - поле для сортування, sortOrder - 'ASC' або 'DESC'
        });
        return products;
    } catch (error) {
        console.error('Error fetching sorted products:', error);
        throw error;
    }
  }

  

  async addToCart(req, res, next) {
    const bodySchema = Joi.object({
      productId: Joi.number().required(),
    });

    const { productId } = await bodySchema.validateAsync(req.body);

    const userId = req.user.id;

    const product = await Product.findOne({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    const orderProduct = await OrderProduct.findOne({
      where: {
        productId,
        userId,
      },
    });

    if (orderProduct) {
      await OrderProduct.update({
        quantity: orderProduct.quantity + 1,
        amount: product.amount * (orderProduct.quantity + 1),
      }, {
        where: {
          id: orderProduct.id,
        },
      });
    } else {
      await OrderProduct.create({
        productId,
        userId,
        amount: product.amount,
        quantity: 1,
        orderId: null,
      });
    }

    return true;
  }

  async cartList(req, res, next) {
    const userId = req.user.id;

    const list = await OrderProduct.findAll({
      where: {
        userId,
        orderId: null,
      },
    });

    return list;
  }

  async createOrder(req, res, next) {
    const userId = req.user.id;

    const orderProductList = await OrderProduct.findOne({
      where: {
        userId,
        orderId: null,
      },
    });

    if (orderProductList) {
      throw new Error('No products in cart');
    }

    const order = await Order.create({
      total_amount: 1,
      status: "Processing",
      userId,
    });

    for (let index = 0; index < orderProductList.length; index++) {
      await OrderProduct.update({
        orderId: order.id,
      }, {
        where: {
          id: orderProductList[index].id,
        },
      });
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

  async createOption(req, res, next) {
    const bodySchema = Joi.object({
      name: Joi.string().required(),
      values: Joi.array().items(Joi.string()),
    });

    const { name, values } = await bodySchema.validateAsync(req.body);

    const option = await Option.create({
      name,
    });

    for (let index = 0; index < values.length; index++) {
      await OptionValue.create({
        optionId: option.id,
        value: values[index],
      });
    }

    return option;
  }
}

module.exports = new ProductController();
