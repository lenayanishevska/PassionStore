module.exports = (sequelize, Sequelize) => {
  const OptionValue = sequelize.define('OptionValue', {
    id: {
      field: 'id',
      type: Sequelize.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    optionId: {
      field: 'option_id',
      type: Sequelize.INTEGER(),
      allowNull: false,
    },
    value: {
      field: 'value',
      type: Sequelize.STRING(255),
      allowNull: false,
    },
  }, {
    timestamps: false,
    tableName: 'option_values',
  });

  OptionValue.associate = (models) => {
    OptionValue.belongsToMany(models.Product, { through: models.ProductOption });

    OptionValue.belongsTo(models.Option, {
      as: 'option',
      constraints: false,
      targetKey: 'id',
      foreignKey: 'optionId',
    });
  };

  return OptionValue;
};
