const express = require('express');
const Condominium = require('../models/Condominium');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const createCondominium = await Condominium.create({
      name: req.body.name,
      state: req.body.state,
      city: req.body.city,
      street: req.body.street,
      number: req.body.number,
    });
    res.send({ createCondominium });
  } catch (err) {
    return res.status(400).send({ error: 'Falha no registro do condomínio' });
  }
});

router.get('/findAll', async (req, res) => {
  try {
    const searchCondominium = await Condominium.findAll({
      attributes: { exclude: ['userId'] },
    });
    if (searchCondominium == null)
      res.status(400).send({ error: 'Não existem condomínios cadastrados' });
    else res.status(200).send({ Condominium: searchCondominium });
  } catch (err) {
    return res.status(400).send({ error: 'Falha na busca do condomínio' });
  }
});

router.post('/findById', async (req, res) => {
  try {
    const searchCondominiumById = await Condominium.findOne({
      where: { id: req.body.id },
      attributes: { exclude: ['userId'] },
    });
    if (searchCondominiumById == null)
      res.status(400).send({ error: 'Condomínio inexistente' });
    else res.status(200).send({ Condominium: searchCondominiumById });
  } catch (err) {
    return res.status(400).send({ error: 'Falha na busca do condomínio' });
  }
});

router.patch('/update', async (req, res) => {
  try {
    const searchCondominiumById = await Condominium.findOne({
      where: { id: req.body.id },
      attributes: { exclude: ['userId'] },
    });
    if (searchCondominiumById == null) {
      return res.status(400).send({ error: 'Condomínio inexistente' });
    } else {
      const updateCondominium = await Condominium.update(
        {
          name: req.body.name,
          state: req.body.state,
          city: req.body.city,
          street: req.body.street,
          number: req.body.number,
        },
        { where: { id: req.body.id } }
      );
      res
        .status(200)
        .send({ status: 'Condomínio ID: ' + req.body.id + ' atualizado' });
    }
  } catch (err) {
    return res.status(400).send({ error: 'Falha ao atualizar o condomínio' });
  }
});

router.delete('/delete', async (req, res) => {
  try {
    const searchCondominiumById = await Condominium.findOne({
      where: { id: req.body.id },
      attributes: { exclude: ['userId'] },
    });
    if (searchCondominiumById == null) {
      return res.status(400).send({ error: 'Condomínio inexistente' });
    } else {
      const deleteCondominium = await Condominium.destroy({
        where: { id: req.body.id },
      });
      res
        .status(200)
        .send({ status: 'Condomínio ID: ' + req.body.id + ' apagado' });
    }
  } catch (err) {
    return res.status(400).send({ error: 'Falha ao excluir o condomínio' });
  }
});

module.exports = (app) => app.use('/condominium', router);
