const express = require('express');
const Payment = require('../models/Payment');

const router = express.Router();

router.patch('/updatePaidStatus', async (req, res) => {
  try {
    const searchPaymentById = await Payment.findOne({
      where: { id: req.body.id_payment },
      attributes: { exclude: ['userId'] },
    });
    if (searchPaymentById == null) {
      return res.status(204).send({ error: 'Pagamento inexistente' });
    } else {
      if (searchPaymentById.paid == true) {
        const paymentPaidStatus = await Payment.update(
          {
            paid: false,
          },
          { where: { id: req.body.id_payment } }
        );
        res.status(200).send({
          status:
            'Status Pago do Pagamento ID: ' +
            req.body.id_payment +
            ' atualizado',
        });
      } else {
        const paymentPaidStatus = await Payment.update(
          {
            paid: true,
          },
          { where: { id: req.body.id_payment } }
        );
        res.status(200).send({
          status:
            'Status Pago do Pagamento ID: ' +
            req.body.id_payment +
            ' atualizado',
        });
      }
    }
  } catch (err) {
    return res
      .status(400)
      .send({ error: 'Falha ao atualizar o status pago do pagamento' });
  }
});

module.exports = (app) => app.use('/services', router);
