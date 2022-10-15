const express = require('express');
const Notice = require('../models/Notice');

const router = express.Router();

router.post('/findAllOrderedNotices', async (req, res) => {
  try {
    const searchNoticeById = await Notice.findAll({
      where: {
        id_condominium: req.body.id_condominium,
      },
      order: [['createdAt', 'DESC']],
    });
    if (searchNoticeById == 0) {
      res.status(400).send({ error: 'Não possuem avisos registrados' });
    } else {
      res.status(200).send(searchNoticeById);
    }
  } catch (err) {
    res.status(200).send({ error: 'Falha ao busca os avisos' });
  }
});

module.exports = (app) => app.use('/project', router);
