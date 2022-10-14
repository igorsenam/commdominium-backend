const Sequelize = require('sequelize');
const db = require('../database/index.js');

const noticeType = db.define('noticeTypes', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    unique: true,
    primaryKey: true,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

noticeType.sync();

module.exports = noticeType;
