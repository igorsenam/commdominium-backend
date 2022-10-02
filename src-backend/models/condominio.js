const Sequelize = require('sequelize');
const db = require('../database/index.js')

const Condominio = db.define('condominios', {
  IDcondominio: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    unique: true,
    primaryKey: true
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false
  },
  estado: {
    type: Sequelize.STRING,
    allowNull: true
  },
  cidade: {
    type: Sequelize.STRING,
    allowNull: true
  },
  logradouro: {
    type: Sequelize.STRING,
    allowNull: false
  },
  numero: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
});

Condominio.sync();

module.exports = Condominio;