module.exports = (sequelize, Sequelize) => {
  const Page = sequelize.define('Page', {
    id: {
      field: 'id',
      type: Sequelize.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
  }, {
    timestamps: false,
    tableName: 'pages',
  });

  Page.associate = () => {
  };

  return Page;
};
