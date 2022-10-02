const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const db = require('./database/index')
const tipoUsuario = require('./models/tipoUsuario')
const Condominio = require('./models/condominio')
const Usuario = require('./models/usuario')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

require('./controllers/tipoUsuarioController')(app);
require('./controllers/condominioController')(app);
require('./controllers/usuarioController')(app);

app.get('/', (req, res) => {
  res.send('Página Inicial OK!');
});

app.listen(3000);