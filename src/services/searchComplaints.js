const express = require('express');
const Complaint = require('../models/Complaint');

const router = express.Router();

router.post('/findAllUnsolvedComplaints', async (req, res) => {
  try {
    const searchUnsolvedComplaints = await Complaint.findAll({
      where: {
        id_condominium: req.body.id_condominium,
        resolved: false,
      },
      order: [['createdAt', 'ASC']],
    });
    if (searchUnsolvedComplaints == 0) {
      res.status(204).send({ error: 'Não possuem reclamações registradas' });
    } else {
      res.status(200).send(searchUnsolvedComplaints);
    }
  } catch (err) {
    res.status(200).send({ error: 'Falha ao buscar as reclamações' });
  }
});

router.post('/findAllSolvedComplaints', async (req, res) => {
  try {
    const searchSolvedComplaints = await Complaint.findAll({
      where: {
        id_condominium: req.body.id_condominium,
        resolved: true,
      },
      order: [['createdAt', 'DESC']],
    });
    if (searchSolvedComplaints == 0) {
      res.status(204).send({ error: 'Não possuem reclamações registradas' });
    } else {
      res.status(200).send(searchSolvedComplaints);
    }
  } catch (err) {
    res.status(200).send({ error: 'Falha ao buscar as reclamações' });
  }
});

module.exports = (app) => app.use('/services', router);
