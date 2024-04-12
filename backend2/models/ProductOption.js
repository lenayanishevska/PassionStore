module.exports = (sequelize, Sequelize) => {
  const ProductOption = sequelize.define('ProductOption', {
    id: {
      field: 'id',
      type: Sequelize.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    value: {
      field: 'value',
      type: Sequelize.STRING(255),
      allowNull: false,
    },
  }, {
    timestamps: false,
    tableName: 'product_options',
  });

  ProductOption.associate = (models) => {
  };

  return ProductOption;
};
