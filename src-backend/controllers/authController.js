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
      delete searchLogin.password;
      res.status(200).send({
        user: {
          id: searchLogin.id,
          fullname: searchLogin.fullname,
          block: searchLogin.block,
          building: searchLogin.building,
          number: searchLogin.number,
          email: searchLogin.email,
          active: searchLogin.id,
          id_userType: searchLogin.id_userType,
          id_condominium: searchLogin.id_condominium,
          createdAt: searchLogin.createdAt,
          updatedAt: searchLogin.updatedAt,
        },
        token: token,
      });
    } else {
      res.status(400).send({ error: 'Senha incorreta' });
    }
  } else {
    return res.status(500).send({ error: 'Usuário incorreto' });
  }
});

module.exports = (app) => app.use('/auth', router);
