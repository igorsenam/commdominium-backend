const express = require('express');

const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { email } = req.body.email;
  try {
    if (await User.findOne({ email })) {
      return res.status(400).send({ error: 'Usuário já existente' });
    }
    const createUser = await User.create(req.body);
    res.send({ createUser });
  } catch (err) {
    return res.status(400).send({ error: 'Falha no registro do usuário' });
  }
});

module.exports = (app) => app.use('/user', router);
