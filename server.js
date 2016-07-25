'use strict';

var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var decipher = require('./decipher');

var app = express();
var urlencodedParser = bodyParser.urlencoded({extended: false});

var serverData = {
  staticFolder: './client',
  serverPort: 3000,
  decode: '/decode'
};

var shiftError = {
  'status': 'error',
  'error': 'Invalid shift value'
};

var inputError = {
  'status': 'error',
  'error': 'Invalid input'
};

var msgSuccess = {
  'status': 'ok',
  "text": ''
};

function validateInput(res, text, shift) {
  if (shift <= -26 || shift >= 26) {
    res.status(400).json(shiftError);
    return;
  }
  if (text < 1) {
    res.status(400).json(inputError);
    return;
  }
  return;
}

app.use(bodyParser.json());
app.use(express.static(serverData.staticFolder));

app.post(serverData.decode, urlencodedParser, function(req, res) {
  validateInput(res, req.body.text, req.body.shift);
  msgSuccess.text = decipher.decipherMessage(req.body.text, req.body.shift);
  res.json(msgSuccess);
});
app.listen(serverData.serverPort);
