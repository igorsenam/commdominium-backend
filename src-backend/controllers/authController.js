const express = require('express');

const Usuario = require('../models/Usuario')
const Condominio = require('../models/Condominio')

const router = express.Router();

router.get('/searchLogin', async (req, res) => {
  try {
    const searchUser = await Usuario.findOne({
      where: { login: req.query.login, senha: req.query.senha }
    })
    if (searchUser == null){
      return res.status(404).send({ error: "Usuário ou senha incorretos"})
    }
    else{
      res.send({ searchUser })
    }
  } catch(err) {
    return res.status(500).send({ error: "Falha na consulta"})
  }
});

module.exports = app => app.use('/auth', router);