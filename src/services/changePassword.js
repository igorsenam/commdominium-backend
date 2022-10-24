const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.patch('/changePassword', async (req, res) => {
  try {
    const searchUserById = await User.findOne({
      where: { id: req.body.id },
      attributes: { exclude: ['password'] },
    });
    if (searchUserById == null) {
      return res.status(204).send({ error: 'Usuário inexistente' });
    } else {
      const changeUserPassword = await User.update(
        {
          password: req.body.new_password,
        },
        { where: { id: req.body.id }, individualHooks: true }
      );
      res.status(200).send({
        status: 'Senha do Usuário ID: ' + req.body.id + ' atualizada',
      });
    }
  } catch (err) {
    console.log('err', err);
    return res
      .status(400)
      .send({ error: 'Falha ao atualizar a senha do usuário' });
  }
});

module.exports = (app) => app.use('/user', router);
