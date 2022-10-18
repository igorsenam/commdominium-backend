const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.patch('/updateActiveStatus', async (req, res) => {
  try {
    const searchUserById = await User.findOne({
      where: { id: req.body.id_user },
      attributes: { exclude: ['complaintId'] },
    });
    if (searchUserById == null) {
      return res.status(204).send({ error: 'Usuário inexistente' });
    } else {
      if (searchUserById.active == true) {
        const userActiveStatus = await User.update(
          {
            active: false,
          },
          { where: { id: req.body.id_user } }
        );
        res.status(200).send({
          status:
            'Status Ativo do Usuário ID: ' + req.body.id_user + ' atualizado',
        });
      } else {
        const userActiveStatus = await User.update(
          {
            active: true,
          },
          { where: { id: req.body.id_user } }
        );
        res.status(200).send({
          status:
            'Status Ativo do Usuário ID: ' + req.body.id_user + ' atualizado',
        });
      }
    }
  } catch (err) {
    return res
      .status(400)
      .send({ error: 'Falha ao atualizar o status ativo usuário' });
  }
});

module.exports = (app) => app.use('/services', router);
