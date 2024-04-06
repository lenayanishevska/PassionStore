const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    firstName: {type: DataTypes.STRING, required: true},
    lastName: {type: DataTypes.STRING, required: true},
    email: {type: DataTypes.STRING, unique: true,required: true},
    password: {type: DataTypes.STRING, required: true},
    isAdmin: {type: DataTypes.BOOLEAN, required: true, defaultValue: false},
})

module.exports = {User}