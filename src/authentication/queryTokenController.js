const express = require('express');
const authMiddleware = require('../middlewares/auth');
const User = require('../models/User');

const router = express.Router();
router.use(authMiddleware);

router.get('/', (req, res) => {
  res.send({ id: req.userId, email: req.userEmail });
});

module.exports = (app) => app.use('/queryToken', router);
