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

function validateInput(text, shift) {
  if (shift <= -26 || shift >= 26) {
    res.json(shiftError);
    return;
  }
  if (text < 1) {
    res.json(inputError);
    return;
  }
  return;
}

app.use(bodyParser.json());
app.use(express.static(serverData.staticFolder));

app.post(serverData.decode, urlencodedParser, function(req, res) {
  validateInput(req.body.text, req.body.shift);
  res.json(decipher.decipherMessage(req.body.text, req.body.shift));
});

app.listen(serverData.serverPort);
