module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('User', {
    id: {
      field: 'id',
      type: Sequelize.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    firstname: {
      field: 'firstname',
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    lastname: {
      field: 'lastname',
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    email: {
      field: 'email',
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    password: {
      field: 'password',
      type: Sequelize.STRING(255),
      allowNull: false,
    },
  }, {
    timestamps: false,
    tableName: 'users',
  });

  User.associate = () => {
  };

  return User;
};
