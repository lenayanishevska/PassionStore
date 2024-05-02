const { Op } = require("sequelize");
const moment = require("moment");
const { Order, OrderProduct, User, UserAddress, Income, Expense } = require("../models");
const Joi = require('joi');
const { sequelize } = require("../models");

class AdminController {
  async orders(req, res, next) {
    const querySchema = Joi.object({
      itemPerPage: Joi.number().default(10),
      page: Joi.number().default(0),
      sort: Joi.string().optional(),
      filters: Joi.string().optional(),
    });

    const { itemPerPage, page, sort, filters } = await querySchema.validateAsync(req.query);

    const where = {};

    if (filters) {
      const { status, fromPrice, toPrice } =
        JSON.parse(filters); 

      if (status) {
        where.status = status;
      }

      if (fromPrice && toPrice) {
        where.total_amount = { [Op.between]: [fromPrice, toPrice] };
      }
    }

    let order = [];
    if (sort) {
      const { sortField, sortOrder } = JSON.parse(sort);
      order = [[sortField, sortOrder]];
    }

    const list = await Order.findAll({
      where,
      order,
      limit: itemPerPage,
      offset: page * itemPerPage,
    });

    const totalCount = await Order.count({ where });

    const pageCount = Math.ceil(totalCount/ itemPerPage);

    return {
      totalCount,
      itemPerPage,
      pageCount,
      list,
    };
  }

  async users(req, res, next) {
    const querySchema = Joi.object({
      itemPerPage: Joi.number().default(10),
      page: Joi.number().default(0),
      sort: Joi.string().optional(),
      filters: Joi.string().optional(),
    });

    const { itemPerPage, page, sort, filters } = await querySchema.validateAsync(req.query);

    const where = {};

    if (filters) {
      // const { status, fromPrice, toPrice } = JSON.parse(filters); 

      // if (status) {
      //   where.status = status;
      // }

      // if (fromPrice && toPrice) {
      //   where.total_amount = { [Op.between]: [fromPrice, toPrice] };
      // }
    }

    let order = [];
    if (sort) {
      const { sortField, sortOrder } = JSON.parse(sort);
      order = [[sortField, sortOrder]];
    }

    const list = await User.findAll({
      where,
      order,
      limit: itemPerPage,
      offset: page * itemPerPage,
      include: [
        {
          model: UserAddress,
        },
      ],
    });
    

    const totalCount = await User.count({ where });

    const pageCount = Math.ceil(totalCount / itemPerPage);

    return {
      totalCount,
      itemPerPage,
      pageCount,
      list,
    };
}

  async updateOrder(req, res, next) {
    console.log(req.body);
    const bodySchema = Joi.object({
      id: Joi.number().required(),
      status: Joi.string().required(),
    });

    const { id, status } = await bodySchema.validateAsync(req.body);

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
    const expenses = [];
    const names = [];
    for (let index = 0; index < 12; index++) {
      const startOfMonth = date.startOf("month").format("YYYY-MM-DD HH:mm:ss");
      const endOfMonth = date.endOf("month").format("YYYY-MM-DD HH:mm:ss");
      const incomes = await Income.sum('amount', {
        where: {
          date: { [Op.between]: [startOfMonth, endOfMonth] },
        },
      });
      values.push(incomes);
      const expensesSum = await Expense.sum('amount', {
        where: {
          date: { [Op.between]: [startOfMonth, endOfMonth] },
        },
      });
      expenses.push(expensesSum);
      names.push(date.format("MMM YYYY"));
      date = date.subtract(1, "month");
    }
    return {
      values,
      expenses,
      names,
    };
}

async orderChart(req, res, next) {
  let date = moment();
  const values = [];
  const names = [];

  for (let index = 0; index < 12; index++) {
    const startOfMonth = date.clone().startOf("month").format("YYYY-MM-01 00:00:00.000000");
    const endOfMonth = date.clone().endOf("month").format("YYYY-MM-DD 23:59:59.999999");

    const orders = await Order.findAll({
      where: {
        date: {
          [Op.between]: [startOfMonth, endOfMonth],
        },
      },
    });

    const orderCount = orders.length;
    values.push(orderCount);

    names.push(date.format("MMM YYYY"));
    date = date.subtract(1, "month");
  }

  values.reverse(); // Reverse the values array to match the chronological order of months.
  names.reverse(); // Reverse the names array to match the chronological order of months.

  return {
    values,
    names,
  };
}



  async monthInfo(req, res, next) {
    const startOfMonth = moment().startOf('month').format('YYYY-MM-DD HH:mm:ss');
    const endOfMonth = moment().endOf('month').format('YYYY-MM-DD HH:mm:ss');
    const orders = await Order.findAll({
      where: {
        date: {
          [Op.between]: [startOfMonth, endOfMonth],
        },
      },
    });

    const orderCount = orders.length;
    // const totalAmountSum = orders.reduce((val, order) => {
    //   console.log(order, val);
    //   return +order.total_amount + +val;
    // }, 0);

    const totalAmountSum = await Income.sum('amount', {
      where: {
        date: {
          [Op.between]: [startOfMonth, endOfMonth],
        },
      },
    });


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

  async getOrdersWithUsers(req, res, next) {
    const query = "SELECT get_orders_with_users_and_addresses() AS orders_with_users_info";
    const result = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    const exportFile = result[0].orders_with_users_info;
    return exportFile;
  }

  async exportOrdersWithUsers(req, res, next) {
    try {
        // Виконання запиту SQL
        const query = "SELECT * FROM export_product_category_manufacturer()";
        const result = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
        
        // Перетворення кожного об'єкта у рядок CSV
        const csvRows = result.map(row => Object.values(row).join(','));

        // Створення рядка CSV з рядками
        const csvData = csvRows.join('\n');

        res.set({
            'Content-Type': 'text/csv',
            'Content-Disposition': 'attachment; filename=orders_with_users.csv'
        });
        res.send(csvData);
    } catch (error) {
        console.error('Error while exporting:', error);
        res.status(500).json({ success: false, message: 'Error while exporting' });
    }
}
}

module.exports = new AdminController();
