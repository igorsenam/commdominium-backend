const express = require('express');
const Notice = require('../models/Notice');

const router = express.Router();

router.post('/findAllOrderedNotices', async (req, res) => {
  try {
    const searchOrderedNotices = await Notice.findAll({
      where: {
        id_condominium: req.body.id_condominium,
      },
      order: [['createdAt', 'DESC']],
    });
    if (searchOrderedNotices == 0) {
      res.status(204).send({ error: 'Não possuem avisos registrados' });
    } else {
      res.status(200).send(searchOrderedNotices);
    }
  } catch (err) {
    res.status(400).send({ error: 'Falha ao buscar os avisos' });
  }
});

module.exports = (app) => app.use('/services', router);
