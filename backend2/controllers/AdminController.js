const { Op } = require('sequelize');
const moment = require('moment');
const { Order, OrderProduct } = require('../models');

class AdminController {
  async monthInfo(req, res, next) {
    const orders = await Order.findAll({
      where: {
        date: { [Op.gte]: moment.utc().startOf('month').format('YYYY-MM-DD HH:mm:ss') }
      },
    });

    const orderCount = orders.length;
    const totalAmountSum = orders.reduce((order, val) => {
      return order.total_amount + val;
    }, 0);
    const orderIds = orders.map(order => order.id);

    const orderProductCount = await OrderProduct.count({
      where: {
        id: orderIds,
      },
    });

    return {
      totalAmountSum,
      orderCount,
      orderProductCount,
    };
  }
}

module.exports = new AdminController();
