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
    const totalAmountSum = orders.reduce((val, order) => {
      console.log(order, val);
      return +order.total_amount + +val;
    }, 0);
    const orderIds = orders.map(order => order.id);

    const orderProducts = await OrderProduct.findAll({
      where: {
        OrderId: orderIds,
      },
    });

    // Сума усіх товарів у всіх замовленнях за поточний місяць
    const totalProductCount = orderProducts.reduce((val, orderProduct) => {
      return orderProduct.quantity + val;
    }, 0);

    const currentMonth = moment().format('MMMM');
    const currentYear = moment().format('YYYY');

    return {
      totalAmountSum,
      orderCount,
      totalProductCount,
      currentMonth,
      currentYear
    };
  }
}

module.exports = new AdminController();
