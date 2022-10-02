const express = require('express');

const tipoUsuario = require('../models/tipoUsuario')

const router = express.Router();

router.post('/cadastrar', async (req, res) => {
  try {
    const userType = await tipoUsuario.create(req.body)
    res.send({ userType });
  } catch(err) {
    return res.status(400).send({ error: "Falha no registro do tipo de usuário"})
  }
});

module.exports = app => app.use('/usertype', router);