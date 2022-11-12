const express = require('express');
const Complaint = require('../models/Complaint');

const router = express.Router();

router.post('/findAllComplaints', async (req, res) => {
  try {
    const searchUnresolvedComplaints = await Complaint.findAll({
      where: {
        id_condominium: req.body.id_condominium,
      },
      attributes: { exclude: ['userId'] },
      order: [['createdAt', 'ASC']],
    });
    if (searchUnresolvedComplaints == 0) {
      res.status(204).send({ error: 'Não possuem reclamações registradas' });
    } else {
      res.status(200).send(searchUnresolvedComplaints);
    }
  } catch (err) {
    res.status(400).send({ error: 'Falha ao buscar as reclamações' });
  }
});

module.exports = (app) => app.use('/services', router);
