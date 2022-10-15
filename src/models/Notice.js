const Sequelize = require('sequelize');
const db = require('../database/index.js');
const noticeType = require('./noticeType.js');
const Condominium = require('./Condominium.js');

const Notice = db.define('notices', {
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
  id_noticeType: {
    type: Sequelize.INTEGER,
    required: true,
    allowNull: false,
    references: {
      model: 'noticeTypes',
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

Notice.hasOne(noticeType);
noticeType.belongsTo(Notice);
Notice.hasOne(Condominium);
Condominium.belongsTo(Notice);

Notice.sync();

module.exports = Notice;
