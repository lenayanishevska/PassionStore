module.exports = (sequelize, Sequelize) => {
  const OrderProduct = sequelize.define('OrderProduct', {
    id: {
      field: 'id',
      type: Sequelize.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    amount: {
      field: 'amount',
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    quantity: {
      field: 'quantity',
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  }, {
    timestamps: false,
    tableName: 'order_products',
  });

  OrderProduct.associate = (models) => {
    OrderProduct.belongsTo(models.Order);
    OrderProduct.belongsTo(models.Product);
  };

  return OrderProduct;
};
