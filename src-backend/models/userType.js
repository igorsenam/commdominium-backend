const Sequelize = require('sequelize');
const db = require('../database/index.js')

const userType = db.define('userTypes', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    unique: true,
    primaryKey: true
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

userType.sync();

module.exports = userType;