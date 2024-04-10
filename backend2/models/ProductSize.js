module.exports = (sequelize, Sequelize) => {

  const ProductSize = sequelize.define('ProductSize', {
    id: {
      field: 'id',
      type: Sequelize.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    quantity: {
      field: 'quantity',
      type: Sequelize.INTEGER(),
      allowNull: false,
    },
  }, {
    timestamps: false,
    tableName: 'product_sizes',
  });

  ProductSize.associate = (models) => {
  };

  return ProductSize;
};
