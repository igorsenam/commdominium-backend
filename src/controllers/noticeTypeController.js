const express = require('express');
const noticeType = require('../models/noticeType');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const createNoticeType = await noticeType.create({
      type: req.body.type,
    });
    res.send(createNoticeType);
  } catch (err) {
    return res
      .status(400)
      .send({ error: 'Falha no registro do tipo de aviso' });
  }
});

router.get('/findAll', async (req, res) => {
  try {
    const searchAllNoticeType = await noticeType.findAll({
      attributes: { exclude: ['userId', 'noticeId'] },
    });
    if (searchAllNoticeType == 0)
      res.status(204).send({ error: 'Não existem tipos de aviso cadastrados' });
    else res.status(200).send(searchAllNoticeType);
  } catch (err) {
    return res.status(400).send({ error: 'Falha na busca do tipo de aviso' });
  }
});

router.post('/findById', async (req, res) => {
  try {
    const searchNoticeTypeById = await noticeType.findOne({
      where: { id: req.body.id },
      attributes: { exclude: ['userId', 'noticeId'] },
    });
    if (searchNoticeTypeById == null)
      res.status(204).send({ error: 'Tipo de aviso inexistente' });
    else res.status(200).send(searchNoticeTypeById);
  } catch (err) {
    return res.status(400).send({ error: 'Falha na busca do tipo de aviso' });
  }
});

router.patch('/update', async (req, res) => {
  try {
    const searchNoticeTypeById = await noticeType.findOne({
      where: { id: req.body.id },
      attributes: { exclude: ['userId', 'noticeId'] },
    });
    if (searchNoticeTypeById == null) {
      return res.status(204).send({ error: 'Tipo de aviso inexistente' });
    } else {
      const updateNoticeType = await noticeType.update(
        { type: req.body.type },
        { where: { id: req.body.id } }
      );
      res
        .status(200)
        .send({ status: 'Tipo de aviso ID: ' + req.body.id + ' atualizado' });
    }
  } catch (err) {
    return res
      .status(400)
      .send({ error: 'Falha ao atualizar o tipo de aviso' });
  }
});

router.delete('/delete', async (req, res) => {
  try {
    const searchNoticeTypeById = await noticeType.findOne({
      where: { id: req.body.id },
      attributes: { exclude: ['userId', 'noticeId'] },
    });
    if (searchNoticeTypeById == null) {
      return res.status(204).send({ error: 'Tipo de aviso inexistente' });
    } else {
      const deleteNoticeType = await noticeType.destroy({
        where: { id: req.body.id },
      });
      res
        .status(200)
        .send({ status: 'Tipo de aviso ID: ' + req.body.id + ' apagado' });
    }
  } catch (err) {
    return res.status(400).send({ error: 'Falha ao excluir o tipo de aviso' });
  }
});

module.exports = (app) => app.use('/noticetype', router);
