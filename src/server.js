// import requirements
require('dotenv/config');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const checkAuth = require('./middleware/checkAuth')
const jwt = require('jsonwebtoken');

// initialize express application
const app = express();

// intitialize middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkAuth);

// link database
require('../data/fish-db.js');

// Routes
const router = require('./routes/index.js');
app.use(router);

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Fish app listening on port ${process.env.PORT}`)
})

module.exports = app;
