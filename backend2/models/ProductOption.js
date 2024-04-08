module.exports = (sequelize, Sequelize) => {
  const ProductOption = sequelize.define('ProductOption', {
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
    tableName: 'productoptions',
  });

  ProductOption.associate = () => {
  };

  return ProductOption;
};
