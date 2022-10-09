const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE,process.env.USER,process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: process.env.DIALECT
});

sequelize.authenticate()
.then(function(){
  console.log("Conexão estabelecida")
}).catch(function(){
  console.log("Conexão não estabelecida")
})

module.exports = sequelize;