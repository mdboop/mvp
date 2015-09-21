var express = require('express');
var path = require('path');
var cors = require('cors');
var request = require('request');
var Promise = require('bluebird');
var root = __dirname + "../public/";

var requestPromise = Promise.promisify(request);

var app = express();

app.use(express.static(path.resolve('../public/')));

app.get('/', function() {
  res.sendFile('index.html');
});


app.listen(8080);