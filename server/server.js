var express = require('express');
var path = require('path');
var cors = require('cors');
var request = require('request');
var Promise = require('bluebird');
var handler = require('./request-handler.js');
var root = __dirname + "../public/";

var requestPromise = Promise.promisify(request);

var app = express();

app.use(cors());

app.use(express.static(path.resolve('../public/')));

app.get('/', function() {
  res.sendFile('index.html');
});

app.post('/food-trucks', function(req, res) {
  console.log('test');
});


app.listen(8080);