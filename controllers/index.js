const express = require('express');

const crypto = require('./cryptocurrency');

const miniApp = express.Router();

miniApp.get('/get_current_rate', crypto.getCurrentRate);

module.exports = miniApp;
