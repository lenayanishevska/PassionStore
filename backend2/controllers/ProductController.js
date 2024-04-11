const { Product, OrderProduct } = require("../models");

class ProductController {
  async list(req, res, next) {
    const { categoryId } = req.query;

    const where = {};

    if (categoryId) {
      where.categoryId = categoryId;
    }

    const list = await Product.findAll({ where });

    return list;
  }

  async create(req, res, next) {
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const SKU = req.body.SKU;
    const image_url = req.body.image_url;

    if (!name || !gender) {
      throw new Error("Invalid data");
    }

    const product = await Product.create({
      name,
      description,
      price,
      SKU,
      image_url,
    });

    return product;
  }

  async addToCart(req, res, next) {
    const { productId } = req.body;
    const userId = req.user.id;

    const orderProduct = await OrderProduct.findOne({
      where: {
        productId,
        userId,
      },
    });

    if (orderProduct) {
      throw new Error('Product alreadt in cart');
    }

    await OrderProduct.create({
      productId,
      userId,
      amount: 1,
      quantity: 1,
    });

    return true;
  }

  async cartList(req, res, next) {
    const userId = req.user.id;

    const list = await OrderProduct.findAll({
      where: {
        userId,
      },
    });

    return list;
  }
}

module.exports = new ProductController();
