const express = require('express');

const tipoUsuario = require('../models/Condominio')

const router = express.Router();

router.post('/cadastrar', async (req, res) => {
  try {
    const userType = await tipoUsuario.create(req.body)
    res.send({ userType });
  } catch(err) {
    return res.status(400).send({ error: "Falha no registro do condomínio"})
  }
});

module.exports = app => app.use('/condominium', router);