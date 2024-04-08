module.exports = (sequelize, Sequelize) => {
  const Manufacturer = sequelize.define('Manufacturer', {
    id: {
      field: 'id',
      type: Sequelize.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
  }, {
    timestamps: false,
    tableName: 'manufacturers',
  });

  Manufacturer.associate = () => {
  };

  return Manufacturer;
};
