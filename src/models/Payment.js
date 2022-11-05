const Sequelize = require('sequelize');
const db = require('../database/index.js');
const User = require('./User.js');

const Payment = db.define('payment', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    unique: true,
    primaryKey: true,
  },
  dueDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  paid: {
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
});

User.hasMany(Payment);
Payment.belongsTo(User);

Payment.sync();

module.exports = Payment;
