module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define('Category', {
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
    tableName: 'categories',
  });

  Category.associate = () => {
  };

  return Category;
};
