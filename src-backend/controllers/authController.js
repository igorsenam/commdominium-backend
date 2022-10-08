const express = require('express');
const bcrypt = require('bcryptjs')
const User = require('../models/User')

const router = express.Router();

async function authenticate({ email, password }) {
  const searchLogin = await User.findOne({ email });
  if (!searchLogin || !bcrypt.compareSync(password, searchLogin.password)) {
      return false;
  }
  else {
      return true;
  }
}

router.post('/searchLogin', async (req, res) => {
  const searchLogin = await User.findOne({ where : { email : req.body.email }});
  if(searchLogin){
     const password_valid = await bcrypt.compare(req.body.password,searchLogin.password);
     if (password_valid){
      res.status(200).send(searchLogin)
     }
     else{
      res.status(400).send({ error: "Senha incorreta" })
     }
  }else{
    return res.status(500).send({ error: "Usuário incorreto" })
  }
});

module.exports = app => app.use('/auth', router);