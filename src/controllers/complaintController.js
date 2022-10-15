const express = require('express');
const Complaint = require('../models/Complaint');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const createComplaint = await Complaint.create({
      message: req.body.message,
      resolved: req.body.resolved,
      id_user: req.body.id_user,
      id_condominium: req.body.id_condominium,
    });
    res.send(createComplaint);
  } catch (err) {
    return res.status(400).send({ error: 'Falha no registro da reclamação' });
  }
});

router.get('/findAll', async (req, res) => {
  try {
    const searchComplaint = await Complaint.findAll();
    if (searchComplaint == 0)
      res.status(400).send({ error: 'Não existem reclamações cadastradas' });
    else res.status(200).send(searchComplaint);
  } catch (err) {
    return res.status(400).send({ error: 'Falha na busca da reclamação' });
  }
});

router.post('/findById', async (req, res) => {
  try {
    const searchComplaintById = await Complaint.findOne({
      where: { id: req.body.id },
    });
    if (searchComplaintById == null)
      res.status(400).send({ error: 'Reclamação inexistente' });
    else res.status(200).send(searchComplaintById);
  } catch (err) {
    return res.status(400).send({ error: 'Falha na busca da reclamação' });
  }
});

router.patch('/update', async (req, res) => {
  try {
    const searchComplaintById = await Complaint.findOne({
      where: { id: req.body.id },
    });
    if (searchComplaintById == null) {
      return res.status(400).send({ error: 'Reclamação inexistente' });
    } else {
      const updateComplaint = await Complaint.update(
        {
          message: req.body.message,
          resolved: req.body.resolved,
          id_user: req.body.id_user,
          id_condominium: req.body.id_condominium,
        },
        { where: { id: req.body.id } }
      );
      res
        .status(200)
        .send({ status: 'Reclamação ID: ' + req.body.id + ' atualizado' });
    }
  } catch (err) {
    return res.status(400).send({ error: 'Falha ao atualizar a reclamação' });
  }
});

router.delete('/delete', async (req, res) => {
  try {
    const searchComplaintById = await Complaint.findOne({
      where: { id: req.body.id },
    });
    if (searchComplaintById == null) {
      return res.status(400).send({ error: 'Reclamação inexistente' });
    } else {
      const deleteComplaint = await Complaint.destroy({
        where: { id: req.body.id },
      });
      res
        .status(200)
        .send({ status: 'Reclamação ID: ' + req.body.id + ' apagado' });
    }
  } catch (err) {
    return res.status(400).send({ error: 'Falha ao excluir a reclamação' });
  }
});

module.exports = (app) => app.use('/complaint', router);
