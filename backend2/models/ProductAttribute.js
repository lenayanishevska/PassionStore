module.exports = (sequelize, Sequelize) => {
  const ProductAttribute = sequelize.define('ProductAttribute', {
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
    tableName: 'product_attributes',
  });

  ProductAttribute.associate = (models) => {
  };

  return ProductAttribute;
};
