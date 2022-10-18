const express = require('express');
const Complaint = require('../models/Complaint');

const router = express.Router();

router.patch('/updateResolvedStatus', async (req, res) => {
  try {
    const searchComplaintById = await Complaint.findOne({
      where: { id: req.body.id_complaint },
    });
    if (searchComplaintById == null) {
      return res.status(204).send({ error: 'Reclamação inexistente' });
    } else {
      if (searchComplaintById.resolved == true) {
        const complaintResolvedStatus = await Complaint.update(
          {
            resolved: false,
          },
          { where: { id: req.body.id_complaint } }
        );
        res.status(200).send({
          status:
            'Status Resolvido da Reclamação ID: ' +
            req.body.id_complaint +
            ' atualizado',
        });
      } else {
        const complaintResolvedStatus = await Complaint.update(
          {
            resolved: true,
          },
          { where: { id: req.body.id_complaint } }
        );
        res.status(200).send({
          status:
            'Status Resolvido da Reclamação ID: ' +
            req.body.id_complaint +
            ' atualizado',
        });
      }
    }
  } catch (err) {
    return res
      .status(400)
      .send({ error: 'Falha ao atualizar o status resolvido da reclamação' });
  }
});

module.exports = (app) => app.use('/services', router);
