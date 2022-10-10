const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/authenticate', async (req, res) => {
  const searchLogin = await User.findOne({ where: { email: req.body.email } });
  if (searchLogin) {
    const password_valid = await bcrypt.compare(
      req.body.password,
      searchLogin.password
    );
    if (password_valid) {
      token = jwt.sign(
        { id: searchLogin.id, email: searchLogin.email },
        process.env.SECRET
      );
      res.status(200).send({ user: searchLogin, token: token });
    } else {
      res.status(400).send({ error: 'Senha incorreta' });
    }
  } else {
    return res.status(500).send({ error: 'Usuário incorreto' });
  }
});

module.exports = (app) => app.use('/auth', router);
