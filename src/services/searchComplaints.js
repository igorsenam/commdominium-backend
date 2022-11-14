const express = require('express');
const sequelize = require('../database');

const router = express.Router();

router.post('/findAllComplaints', async (req, res) => {
  try {
    const [searchComplaintsResults, searchComplaintsMetadata] =
      await sequelize.query(
        `SELECT c.id, message, resolved, id_user, c.id_condominium,
        c.createdAt, c.updatedAt, fullname, avatarArchive FROM complaints AS c
        LEFT JOIN users AS u 
        ON u.id = c.id_User 
        WHERE c.id_condominium = ` +
          req.body.id_condominium +
          ' ORDER BY createdAt ASC;'
      );

    res.status(200).send(searchComplaintsResults);
  } catch (err) {
    res.status(400).send({ error: 'Falha ao buscar as reclamações' });
  }
});

module.exports = (app) => app.use('/services', router);
