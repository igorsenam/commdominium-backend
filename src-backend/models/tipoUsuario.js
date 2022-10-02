const Sequelize = require('sequelize');
const db = require('../database/index.js')

const tipoUsuario = db.define('tipo_usuarios', {
  IDtipo_usuario: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    unique: true,
    primaryKey: true
  },
  tipo: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

tipoUsuario.sync();

module.exports = tipoUsuario;