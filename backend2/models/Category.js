const Sequelize = require('sequelize');
module.exports = (sequelize) => {
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
    gender: {
      field: 'gender',
      type: Sequelize.ENUM('Women', 'Men'),
      allowNull: false,
    },
  }, {
    timestamps: false,
    tableName: 'categories',
  });

  Category.associate = (models) => {
    Category.hasMany(models.Product);
  };

  return Category;
};
