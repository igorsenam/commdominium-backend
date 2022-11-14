const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.post('/findUserList', async (req, res) => {
  try {
    const searchUserList = await User.findAll({
      where: {
        id_condominium: req.body.id_condominium,
      },
      attributes: { exclude: ['password'] },
      order: [['fullname', 'ASC']],
    });
    res.status(200).send(searchUserList);
  } catch (err) {
    res.status(400).send({ error: 'Falha ao buscar os usuários' });
  }
});

module.exports = (app) => app.use('/services', router);
