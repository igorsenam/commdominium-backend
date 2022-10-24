const express = require('express');
const Complaint = require('../models/Complaint');

const router = express.Router();

router.post('/searchUserComplaints', async (req, res) => {
  try {
    const searchUserComplaints = await Complaint.findAll({
      where: {
        id_user: req.body.id_user,
      },
      attributes: { exclude: ['userId'] },
      order: [['createdAt', 'DESC']],
    });
    if (searchUserComplaints == 0) {
      res.status(204).send({ error: 'Não possuem reclamações registradas' });
    } else {
      res.status(200).send(searchUserComplaints);
    }
  } catch (err) {
    res.status(400).send({ error: 'Falha ao buscar as reclamações' });
  }
});

module.exports = (app) => app.use('/services', router);
