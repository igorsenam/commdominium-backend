const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    if (
      await User.findOne({
        where: { email: req.body.email },
      })
    ) {
      return res.status(400).send({ error: 'Usuário já existente' });
    }
    const createUser = await User.create({
      fullname: req.body.fullname,
      block: req.body.block,
      building: req.body.building,
      number: req.body.number,
      email: req.body.email,
      password: req.body.password,
      active: req.body.active,
      id_userType: req.body.id_userType,
      id_condominium: req.body.id_condominium,
    });
    res.send(createUser);
  } catch (err) {
    return res.status(400).send({ error: 'Falha no registro do usuário' });
  }
});

router.get('/findAll', async (req, res) => {
  try {
    const searchUser = await User.findAll({
      attributes: { exclude: ['password'] },
    });
    if (searchUser == 0)
      res.status(204).send({ error: 'Não existem usuários cadastrados' });
    else res.status(200).send(searchUser);
  } catch (err) {
    return res.status(400).send({ error: 'Falha na busca do usuário' });
  }
});

router.post('/findById', async (req, res) => {
  try {
    const searchUserById = await User.findOne({
      where: { id: req.body.id },
      attributes: { exclude: ['password'] },
    });
    if (searchUserById == null)
      res.status(204).send({ error: 'Usuário inexistente' });
    else res.status(200).send(searchUserById);
  } catch (err) {
    return res.status(400).send({ error: 'Falha na busca do usuário' });
  }
});

router.patch('/update', async (req, res) => {
  try {
    const searchUserById = await User.findOne({
      where: { id: req.body.id },
      attributes: { exclude: ['password'] },
    });
    if (searchUserById == null) {
      return res.status(204).send({ error: 'Usuário inexistente' });
    } else {
      const updateUser = await User.update(
        {
          fullname: req.body.fullname,
          block: req.body.block,
          building: req.body.building,
          number: req.body.number,
          email: req.body.email,
          active: req.body.active,
          id_userType: req.body.id_userType,
          id_condominium: req.body.id_condominium,
        },
        { where: { id: req.body.id } }
      );
      res
        .status(200)
        .send({ status: 'Usuário ID: ' + req.body.id + ' atualizado' });
    }
  } catch (err) {
    return res.status(400).send({ error: 'Falha ao atualizar o usuário' });
  }
});

router.delete('/delete', async (req, res) => {
  try {
    const searchUserById = await User.findOne({
      where: { id: req.body.id },
    });
    if (searchUserById == null) {
      return res.status(204).send({ error: 'Usuário inexistente' });
    } else {
      const deleteUser = await User.destroy({
        where: { id: req.body.id },
      });
      res
        .status(200)
        .send({ status: 'Usuário ID: ' + req.body.id + ' apagado' });
    }
  } catch (err) {
    return res.status(400).send({ error: 'Falha ao excluir o usuário' });
  }
});

module.exports = (app) => app.use('/user', router);
