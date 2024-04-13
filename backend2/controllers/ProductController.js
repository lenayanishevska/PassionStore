const Joi = require('joi');
const uuid = require('uuid');
const path = require('path');
const { Product, OrderProduct, Order, Attribute, Option, OptionValue, Category } = require("../models");

class ProductController {
  async list(req, res, next) {
    const querySchema = Joi.object({
      parentCategoryId: Joi.number(),
      CategoryId: Joi.number(),
    });

    const { parentCategoryId, CategoryId } = await querySchema.validateAsync(req.query);
  
    const where = {};

    if (!CategoryId) {
      const categories = await Category.findAll({ where: { parentCategoryId } });
      const categoryIds = categories.map(category => category.id);
      where.CategoryId = categoryIds;
    }
    else {
      where.CategoryId = CategoryId;
    }

    const list = await Product.findAll({ where });

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
