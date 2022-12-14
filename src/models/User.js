const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const db = require('../database/index.js');
const userType = require('./userType.js');
const Condominium = require('./Condominium.js');

const User = db.define(
  'user',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    fullname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    block: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    building: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    number: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    avatarArchive: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    active: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    id_userType: {
      type: Sequelize.INTEGER,
      required: true,
      allowNull: false,
      references: {
        model: 'userTypes',
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
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSaltSync(10, 'a');
          user.password = bcrypt.hashSync(user.password, salt);
        }
      },
      beforeUpdate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSaltSync(10, 'a');
          user.password = bcrypt.hashSync(user.password, salt);
        }
      },
    },
  }
);

User.hasOne(userType);
userType.belongsTo(User);
User.hasOne(Condominium);
Condominium.belongsTo(User);

User.sync();

module.exports = User;
