const { Op } = require("sequelize");
const moment = require("moment");
const { Order, OrderProduct } = require("../models");
const Joi = require('joi');

class AdminController {
  async orders(req, res, next) {
    const querySchema = Joi.object({
      itemPerPage: Joi.number().default(10),
      page: Joi.number().default(0),
      sort: Joi.string().valid('date').default('date'),
    });

    const { itemPerPage, page, sort } = await querySchema.validateAsync(req.query);

    const totalCount = await await Order.count({});

    const pageCount = Math.floor(totalCount / itemPerPage);

    const list = await Order.findAll({
      order: [
        [sort, "DESC"],
      ],
      limit: itemPerPage,
      offset: page * itemPerPage,
    });

    return {
      totalCount,
      itemPerPage,
      pageCount,
      list,
    };
  }

  async updateOrder(req, res, next) {
    const bodySchema = Joi.object({
      id: Joi.number().required(),
      status: Joi.string().required(),
    });

    const { id, status } = await bodySchema.validateAsync(req.query);

    const order = await Order.findOne({
      where: {
        id,
      },
    });

    if (!order) {
      throw new Error('Order not found');
    }

    await Order.update({
      status,
    }, {
      where: {
        id,
      },
    });

    return true;
  }

  async saleChart(req, res, next) {
    let date = moment();
    const values = [];
    const names = [];
    for (let index = 0; index < 12; index++) {
      const startOfMonth = date.startOf("month").format("YYYY-MM-DD HH:mm:ss");
      const endOfMonth = date.endOf("month").format("YYYY-MM-DD HH:mm:ss");
      const orders = await Order.count({
        where: {
          date: { [Op.between]: [startOfMonth, endOfMonth] },
        },
      });
      values.push(orders);
      names.push(date.format("MMM YYYY"));
      date = date.subtract(1, "month");
    }
    return {
      values,
      names,
    };
  }

  async monthInfo(req, res, next) {
    const orders = await Order.findAll({
      where: {
        date: {
          [Op.gte]: moment.utc().startOf("month").format("YYYY-MM-DD HH:mm:ss"),
        },
      },
    });

    const orderCount = orders.length;
    const totalAmountSum = orders.reduce((val, order) => {
      console.log(order, val);
      return +order.total_amount + +val;
    }, 0);
    const orderIds = orders.map((order) => order.id);

    const orderProducts = await OrderProduct.findAll({
      where: {
        OrderId: orderIds,
      },
    });

    // Сума усіх товарів у всіх замовленнях за поточний місяць
    const totalProductCount = orderProducts.reduce((val, orderProduct) => {
      return orderProduct.quantity + val;
    }, 0);

    const currentMonth = moment().format("MMMM");
    const currentYear = moment().format("YYYY");

    return {
      totalAmountSum,
      orderCount,
      totalProductCount,
      currentMonth,
      currentYear,
    };
  }
}

module.exports = new AdminController();
