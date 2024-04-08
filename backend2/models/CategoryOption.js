module.exports = (sequelize, Sequelize) => {
  const CategoryOption = sequelize.define('CategoryOption', {
    id: {
      field: 'id',
      type: Sequelize.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
  }, {
    timestamps: false,
    tableName: 'categoryoptions',
  });

  CategoryOption.associate = () => {
  };

  return CategoryOption;
};
