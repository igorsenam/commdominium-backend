const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/validatePassword', async (req, res) => {
  const searchLogin = await User.findOne({
    where: { id: req.body.id },
  });
  if (searchLogin) {
    const password_valid = await bcrypt.compare(
      req.body.old_password,
      searchLogin.password
    );
    if (password_valid) {
      res.status(200).send({ ok: 'Senha correta' });
    } else {
      res.status(400).send({ error: 'Senha incorreta' });
    }
  } else {
    return res.status(500).send({ error: 'Usuário incorreto' });
  }
});

module.exports = (app) => app.use('/user', router);
