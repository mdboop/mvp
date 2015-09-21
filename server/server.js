var express = require('express');
var path = require('path');
var root = __dirname + "../public/";

var app = express();

app.use(express.static(path.resolve('../public/')));

app.get('/', function() {
  res.sendFile('index.html');
});

app.listen(8080);