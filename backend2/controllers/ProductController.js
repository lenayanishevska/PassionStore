const { Product, OrderProduct, Order } = require("../models");

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
      orderId: null,
    });

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

    const orderProductList = await OrderProduct.findAll({
      where: {
        productId,
        userId,
        orderId: null,
      },
    });

    if (!orderProductList.length) {
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
}

module.exports = new ProductController();
