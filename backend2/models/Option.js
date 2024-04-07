module.exports = (sequelize, Sequelize) => {
  const Option = sequelize.define('Option', {
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
    tableName: 'options',
  });

  Option.associate = () => {
  };

  return Option;
};
