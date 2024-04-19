module.exports = (sequelize, Sequelize) => {
  const ProductOption = sequelize.define('ProductOption', {
    id: {
      field: 'id',
      type: Sequelize.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    productId: {
      field: 'product_id',
      type: Sequelize.INTEGER(),
      allowNull: false,
    },
    optionValueId: {
      field: 'option_value_id',
      type: Sequelize.INTEGER(),
      allowNull: false,
    },
  }, {
    timestamps: false,
    tableName: 'product_options',
  });

  ProductOption.associate = (models) => {
    ProductOption.belongsTo(models.Product, {
      as: 'product',
      constraints: false,
      targetKey: 'id',
      foreignKey: 'productId',
    });
    ProductOption.belongsTo(models.OptionValue, {
      as: 'optionValue',
      constraints: false,
      targetKey: 'id',
      foreignKey: 'optionValueId',
    });
  };

  return ProductOption;
};
