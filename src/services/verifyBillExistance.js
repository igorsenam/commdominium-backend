const express = require('express');
const sequelize = require('../database');
const Payment = require('../models/Payment');

const router = express.Router();

router.post('/verifyBillExistance', async (req, res) => {
  try {
    const [verifyBillResults, verifyBillMetadata] = await sequelize.query(
      'SELECT * FROM payments WHERE id_user = ' +
        req.body.id_user +
        ' AND MONTH(dueDate) = ' +
        req.body.month +
        ' AND YEAR(dueDate) = ' +
        req.body.year +
        ';'
    );
    if (verifyBillResults != 0) {
      return res.status(200).send({
        message: 'Pagamento já existente para esse usuário',
        bill: verifyBillResults,
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
