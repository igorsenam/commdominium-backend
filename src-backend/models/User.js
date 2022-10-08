const Sequelize = require('sequelize');
const db = require('../database/index.js');
const userType = require('./userType.js');
const Condominium = require('./Condominium.js');

const User = db.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    unique: true,
    primaryKey: true
  },
  fullname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  block: {
    type: Sequelize.STRING,
    allowNull: true
  },
  building: {
    type: Sequelize.STRING,
    allowNull: true
  },
  number: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  active: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  id_userType: {
    type: Sequelize.INTEGER,
    required: true,
    references: {
      model: 'userTypes',
      key: 'id'
    }
  },
  id_condominium: {
    type: Sequelize.INTEGER,
    required: true,
    references: {
      model: 'condominiums',
      key: 'id'
    }
  }
});

User.hasOne(userType)
userType.belongsTo(User)
User.hasOne(Condominium)
Condominium.belongsTo(User)

User.sync();

module.exports = User;