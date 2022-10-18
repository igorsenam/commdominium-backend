require('dotenv').config({ path: './../commdominium-backend/.env' });
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const db = require('./database/index.js');
const Condominium = require('./models/Condominium.js');
const userType = require('./models/userType.js');
const User = require('./models/User.js');
const noticeType = require('./models/noticeType.js');
const Notice = require('./models/Notice.js');
const Complaint = require('./models/Complaint.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

require('./controllers/condominiumController')(app);
require('./controllers/userTypeController')(app);
require('./controllers/userController')(app);
require('./controllers/noticeTypeController')(app);
require('./controllers/noticeController')(app);
require('./controllers/complaintController')(app);

require('./authentication/authController')(app);
require('./authentication/queryTokenController')(app);

require('./services/searchOrderedNotices')(app);
require('./services/searchUserList')(app);
require('./services/userActiveStatus')(app);
require('./services/searchComplaints')(app);
require('./services/complaintResolvedStatus')(app);

app.listen(process.env.PORT);
