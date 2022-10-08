const express = require('express');

const Condominium = require('../models/Condominium')

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const createCondominium = await Condominium.create(req.body)
    res.send({ createCondominium });
  } catch(err) {
    return res.status(400).send({ error: "Falha no registro do condomínio"})
  }
});

module.exports = app => app.use('/condominium', router);