module.exports = (sequelize, Sequelize) => {
  const ProductOption = sequelize.define('ProductOption', {
    id: {
      field: 'id',
      type: Sequelize.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
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
  };

  return ProductOption;
};
