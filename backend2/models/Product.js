module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define('Product', {
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
    tableName: 'products',
  });

  Product.associate = () => {
  };

  return Product;
};
