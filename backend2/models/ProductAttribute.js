module.exports = (sequelize, Sequelize) => {
  const ProductAttribute = sequelize.define('ProductAttribute', {
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
    tableName: 'productattributes',
  });

  ProductAttribute.associate = () => {
  };

  return ProductAttribute;
};
