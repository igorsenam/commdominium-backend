const express = require('express');
const Notice = require('../models/Notice');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const createNotice = await Notice.create({
      message: req.body.message,
      id_noticeType: req.body.id_noticeType,
      id_condominium: req.body.id_condominium,
    });
    res.send(createNotice);
  } catch (err) {
    return res.status(400).send({ error: 'Falha no registro do aviso' });
  }
});

router.get('/findAll', async (req, res) => {
  try {
    const searchNotice = await Notice.findAll();
    if (searchNotice == 0)
      res.status(204).send({ error: 'Não existem avisos cadastrados' });
    else res.status(200).send(searchNotice);
  } catch (err) {
    return res.status(400).send({ error: 'Falha na busca do aviso' });
  }
});

router.post('/findById', async (req, res) => {
  try {
    const searchNoticeById = await Notice.findOne({
      where: { id: req.body.id },
    });
    if (searchNoticeById == null)
      res.status(204).send({ error: 'Aviso inexistente' });
    else res.status(200).send(searchNoticeById);
  } catch (err) {
    return res.status(400).send({ error: 'Falha na busca do aviso' });
  }
});

router.patch('/update', async (req, res) => {
  try {
    const searchNoticeById = await Notice.findOne({
      where: { id: req.body.id },
    });
    if (searchNoticeById == null) {
      return res.status(204).send({ error: 'Aviso inexistente' });
    } else {
      const updateNotice = await Notice.update(
        {
          message: req.body.message,
          id_noticeType: req.body.id_noticeType,
          id_condominium: req.body.id_condominium,
        },
        { where: { id: req.body.id } }
      );
      res
        .status(200)
        .send({ status: 'Aviso ID: ' + req.body.id + ' atualizado' });
    }
  } catch (err) {
    return res.status(400).send({ error: 'Falha ao atualizar o aviso' });
  }
});

router.delete('/delete', async (req, res) => {
  try {
    const searchNoticeById = await Notice.findOne({
      where: { id: req.body.id },
    });
    if (searchNoticeById == null) {
      return res.status(204).send({ error: 'Aviso inexistente' });
    } else {
      const deleteNotice = await Notice.destroy({
        where: { id: req.body.id },
      });
      res.status(200).send({ status: 'Aviso ID: ' + req.body.id + ' apagado' });
    }
  } catch (err) {
    return res.status(400).send({ error: 'Falha ao excluir o aviso' });
  }
});

module.exports = (app) => app.use('/notices', router);
