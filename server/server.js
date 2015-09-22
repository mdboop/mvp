var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var request = require('request-promise');
var Promise = require('bluebird');
var handler = require('./request-handler.js');
var root = __dirname + "../public/";


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use(express.static(path.resolve('../public/')));

app.get('/', function() {
  res.sendFile('index.html');
});

app.post('/food-trucks', function(req, res) {
  var loc = req.body.location;
  var time = req.body.time;

  handler.getOpenTrucks(time);
  // .then(function (trucks) {
  //   res.send(trucks);
  // });
  // handler.getLocation(loc)
  // .then(function(data) {
  //   console.log(data);
  // })
  // .catch(function(err) {
  //   console.log('getLocation error: ', err);
  // });
  res.sendStatus(200);
});


app.listen(8080);