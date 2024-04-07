module.exports = (sequelize, Sequelize) => {
  const OrderProduct = sequelize.define('OrderProduct', {
    id: {
      field: 'id',
      type: Sequelize.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      field: 'name',
      type: Sequelize.STRING(255),
      allowNull: false,
    },
  }, {
    timestamps: false,
    tableName: 'orderproducts',
  });

  OrderProduct.associate = () => {
  };

  return OrderProduct;
};
