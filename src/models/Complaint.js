const Sequelize = require('sequelize');
const db = require('../database/index.js');
const User = require('./User.js');
const Condominium = require('./Condominium.js');

const Complaint = db.define('complaint', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    unique: true,
    primaryKey: true,
  },
  message: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  resolved: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  id_user: {
    type: Sequelize.INTEGER,
    required: true,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  id_condominium: {
    type: Sequelize.INTEGER,
    required: true,
    allowNull: false,
    references: {
      model: 'condominiums',
      key: 'id',
    },
  },
});

User.hasOne(Complaint);
Complaint.belongsTo(User);
Complaint.hasOne(Condominium);
Condominium.belongsTo(Complaint);

Complaint.sync();

module.exports = Complaint;
