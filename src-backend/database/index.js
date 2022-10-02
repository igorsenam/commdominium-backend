const Sequelize = require('sequelize');
var dblogin = require('./database-login');

const sequelize = new Sequelize(dblogin.DATABASE,dblogin.USER,dblogin.PASSWORD, {
  host: dblogin.HOST,
  dialect: 'mysql'
});

sequelize.authenticate()
.then(function(){
  console.log("Conexão estabelecida")
}).catch(function(){
  console.log("Conexão não estabelecida")
})

module.exports = sequelize;