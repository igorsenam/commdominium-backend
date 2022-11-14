const express = require('express');
const userType = require('../models/userType');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const createUserType = await userType.create({
      type: req.body.type,
    });
    res.send(createUserType);
  } catch (err) {
    return res
      .status(400)
      .send({ error: 'Falha no registro do tipo de usuário' });
  }
});

router.get('/findAll', async (req, res) => {
  try {
    const searchAllUserType = await userType.findAll({
      attributes: { exclude: ['userId'] },
    });
    res.status(200).send(searchAllUserType);
  } catch (err) {
    return res.status(400).send({ error: 'Falha na busca do tipo de usuário' });
  }
});

router.post('/findById', async (req, res) => {
  try {
    const searchUserTypeById = await userType.findOne({
      where: { id: req.body.id },
      attributes: { exclude: ['userId'] },
    });
    if (searchUserTypeById == null)
      res.status(204).send({ error: 'Tipo de usuário inexistente' });
    else res.status(200).send(searchUserTypeById);
  } catch (err) {
    return res.status(400).send({ error: 'Falha na busca do tipo de usuário' });
  }
});

router.patch('/update', async (req, res) => {
  try {
    const searchUserTypeById = await userType.findOne({
      where: { id: req.body.id },
      attributes: { exclude: ['userId'] },
    });
    if (searchUserTypeById == null) {
      return res.status(204).send({ error: 'Tipo de usuário inexistente' });
    } else {
      const updateUserType = await userType.update(
        { type: req.body.type },
        { where: { id: req.body.id } }
      );
      res
        .status(200)
        .send({ status: 'Tipo de usuário ID: ' + req.body.id + ' atualizado' });
    }
  } catch (err) {
    return res
      .status(400)
      .send({ error: 'Falha ao atualizar o tipo de usuário' });
  }
});

router.delete('/delete', async (req, res) => {
  try {
    const searchUserTypeById = await userType.findOne({
      where: { id: req.body.id },
      attributes: { exclude: ['userId'] },
    });
    if (searchUserTypeById == null) {
      return res.status(204).send({ error: 'Tipo de usuário inexistente' });
    } else {
      const deleteUserType = await userType.destroy({
        where: { id: req.body.id },
      });
      res
        .status(200)
        .send({ status: 'Tipo de usuário ID: ' + req.body.id + ' apagado' });
    }
  } catch (err) {
    return res
      .status(400)
      .send({ error: 'Falha ao excluir o tipo de usuário' });
  }
});

module.exports = (app) => app.use('/usertype', router);
