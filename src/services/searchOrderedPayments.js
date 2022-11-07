const express = require('express');
const Payment = require('../models/Payment');

const router = express.Router();

router.post('/findAllOrderedPayments', async (req, res) => {
  try {
    const searchOrderedPayments = await Payment.findAll({
      where: {
        id_user: req.body.id_user,
      },
      order: [['dueDate', 'DESC']],
    });
    if (searchOrderedPayments == 0) {
      res.status(204).send({ error: 'Não possuem pagamentos registrados' });
    } else {
      res.status(200).send(searchOrderedPayments);
    }
  } catch (err) {
    res.status(400).send({ error: 'Falha ao buscar os pagamentos' });
  }
});

module.exports = (app) => app.use('/services', router);
