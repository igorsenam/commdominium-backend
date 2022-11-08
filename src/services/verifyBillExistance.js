const express = require('express');
const Payment = require('../models/Payment');

const router = express.Router();

router.post('/verifyBillExistance', async (req, res) => {
  try {
    const verifyBill = await Payment.findOne({
      where: {
        id_user: req.body.id_user,
        dueDate: req.body.dueDate + 'T00:00:00.000Z',
      },
      attributes: { exclude: ['userId'] },
    });
    if (verifyBill) {
      return res.status(200).send({
        error: 'Pagamento já existente para esse usuário',
        billId: verifyBill.id,
      });
    } else {
      return res.status(400).send({
        error: 'Pagamento não existente para esse usuário',
      });
    }
  } catch (err) {
    console.log('err', err);
    return res.status(400).send({ error: 'Falha buscar pagamento do usuário' });
  }
});

module.exports = (app) => app.use('/services', router);
