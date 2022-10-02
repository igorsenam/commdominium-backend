const Sequelize = require('sequelize');
const db = require('../database/index.js');
const tipoUsuario = require('./tipoUsuario.js');
const Condominio = require('./condominio.js');

const Usuario = db.define('usuarios', {
  IDusuario: {
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
  bloco: {
    type: Sequelize.STRING,
    allowNull: true
  },
  predio: {
    type: Sequelize.STRING,
    allowNull: true
  },
  numero: {
    type: Sequelize.STRING,
    allowNull: false
  },
  login: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  senha: {
    type: Sequelize.STRING,
    allowNull: false
  },
  ativo: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  IDtipo_usuario: {
    type: Sequelize.INTEGER,
    required: true,
    references: {
      model: 'tipo_usuarios',
      key: 'IDtipo_usuario'
    }
  },
  IDcondominio: {
    type: Sequelize.INTEGER,
    required: true,
    references: {
      model: 'condominios',
      key: 'IDcondominio'
    }
  }
});

tipoUsuario.hasOne(Usuario)
tipoUsuario.belongsTo(Usuario)
Usuario.hasOne(Condominio)
Condominio.belongsTo(Usuario)

Usuario.sync();

module.exports = Usuario;