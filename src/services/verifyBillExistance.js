const express = require('express');
const sequelize = require('../database');

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
    return res.status(200).send(verifyBillResults);
  } catch (err) {
    console.log('err', err);
    return res.status(400).send({ error: 'Falha buscar pagamento do usuário' });
  }
});

module.exports = (app) => app.use('/services', router);
