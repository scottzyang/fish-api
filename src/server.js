// import requirements
require('dotenv/config');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const expressValidator = require('express-validator');

// initialize express application
const app = express();

// intitialize middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(expressValidator());
app.use(cookieParser());

// require controllers

// link database
require('../data/fish-db.js');

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Fish app listening on port ${process.env.PORT}`)
})
