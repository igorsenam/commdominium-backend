const express = require('express');
const Payment = require('../models/Payment');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    if (
      await Payment.findOne({
        where: {
          id_user: req.body.id_user,
          dueDate: req.body.dueDate + 'T00:00:00.000Z',
        },
        attributes: { exclude: ['userId'] },
      })
    ) {
      return res
        .status(403)
        .send({ error: 'Boleto já existente para esse usuário' });
    }
    const createPayment = await Payment.create({
      billArchive: req.body.billLink,
      dueDate: req.body.dueDate,
      paid: req.body.paid,
      id_user: req.body.id_user,
    });
    res.send(createPayment);
  } catch (err) {
    return res.status(400).send({ error: 'Falha no registro do pagamento' });
  }
});

router.get('/findAll', async (req, res) => {
  try {
    const searchPayment = await Payment.findAll({
      attributes: { exclude: ['userId'] },
    });
    if (searchPayment == 0)
      res.status(204).send({ error: 'Não existem pagamentos cadastrados' });
    else res.status(200).send(searchPayment);
  } catch (err) {
    return res.status(400).send({ error: 'Falha na busca do pagamento' });
  }
});

router.post('/findById', async (req, res) => {
  try {
    const searchPaymentById = await Payment.findOne({
      where: { id: req.body.id },
      attributes: { exclude: ['userId'] },
    });
    if (searchPaymentById == null)
      res.status(204).send({ error: 'Pagamento inexistente' });
    else res.status(200).send(searchPaymentById);
  } catch (err) {
    return res.status(400).send({ error: 'Falha na busca do pagamento' });
  }
});

router.patch('/update', async (req, res) => {
  try {
    const searchPaymentById = await Payment.findOne({
      where: { id: req.body.id },
      attributes: { exclude: ['userId'] },
    });
    if (searchPaymentById == null) {
      return res.status(204).send({ error: 'Pagamento inexistente' });
    } else {
      const updatePayment = await Payment.update(
        {
          billArchive: req.body.billLink,
          dueDate: req.body.dueDate,
          paid: req.body.paid,
          id_user: req.body.id_user,
        },
        { where: { id: req.body.id } }
      );
      res
        .status(200)
        .send({ status: 'Pagamento ID: ' + req.body.id + ' atualizado' });
    }
  } catch (err) {
    return res.status(400).send({ error: 'Falha ao atualizar o pagamento' });
  }
});

router.delete('/delete', async (req, res) => {
  try {
    const searchPaymentById = await Payment.findOne({
      where: { id: req.body.id },
      attributes: { exclude: ['userId'] },
    });
    if (searchPaymentById == null) {
      return res.status(204).send({ error: 'Pagamento inexistente' });
    } else {
      const deletePayment = await Payment.destroy({
        where: { id: req.body.id },
      });
      res
        .status(200)
        .send({ status: 'Pagamento ID: ' + req.body.id + ' apagado' });
    }
  } catch (err) {
    return res.status(400).send({ error: 'Falha ao excluir o pagamento' });
  }
});

module.exports = (app) => app.use('/payment', router);
