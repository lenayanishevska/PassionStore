const { Op } = require('sequelize');
const moment = require('moment');
const { Order, OrderProduct } = require('../models');

class AdminController {
  async orders(req, res, next) {
    const orders = await Order.findAll({

    });

    return orders;
  }

  async saleChart(req, res, next) {
    let date = moment();
    const values = [];
    const names = [];
    for (let index = 0; index < 12; index++) {
      const startOfMonth = date.startOf('month').format('YYYY-MM-DD HH:mm:ss');
      const endOfMonth = date.endOf('month').format('YYYY-MM-DD HH:mm:ss');
      const orders = await Order.count({
        where: {
          date: { [Op.between]: [startOfMonth, endOfMonth] },
        },
      });
      values.push(orders);
      names.push(date.format('MMM YYYY'));
      date = date.subtract(1, 'month');
    }
    return {
      values,
      names,
    };
  }

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
