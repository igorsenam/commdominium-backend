const express = require('express');

const User = require('../models/User')

const router = express.Router();

router.post('/searchLogin', async (req, res) => {
  try {
    const searchUser = await User.findOne({
      where: { email: req.body.email, password: req.body.password }
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