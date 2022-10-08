const express = require('express');

const userType = require('../models/userType')

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const createUserType = await userType.create(req.body)
    res.send({ createUserType });
  } catch(err) {
    return res.status(400).send({ error: "Falha no registro do tipo de usuário"})
  }
});

module.exports = app => app.use('/usertype', router);