const express = require('express');
const sequelize = require('../database');

const router = express.Router();

router.post('/searchCondominiumAssignee', async (req, res) => {
  try {
    const [searchAssigneeResults, verifyAssigneeMetadata] =
      await sequelize.query(
        `SELECT u.id, fullname, block, building, u.number, email, active, id_usertype, 
        id_condominium, u.createdAt, u.updatedAt, avatarArchive FROM users AS u
        LEFT JOIN condominiums AS c 
        ON c.id = u.id_condominium 
        WHERE u.id_userType = 2 AND c.id = ` +
          req.body.id_condominium +
          ';'
      );
    if (searchAssigneeResults != 0) {
      return res.status(200).send(searchAssigneeResults);
    } else {
      return res.status(204).send({
        error: 'Síndico não existente para esse condomínio',
      });
    }
  } catch (err) {
    console.log('err', err);
    return res
      .status(400)
      .send({ error: 'Falha buscar síndico do condomínio' });
  }
});

module.exports = (app) => app.use('/services', router);
