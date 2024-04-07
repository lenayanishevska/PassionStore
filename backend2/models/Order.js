module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define('Order', {
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
    tableName: 'orders',
  });

  Order.associate = () => {
  };

  return Order;
};
