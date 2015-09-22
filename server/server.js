var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var request = require('request-promise');
var Promise = require('bluebird');
var handler = require('./request-handler.js');
var root = __dirname + "../public/";
var key = require('./env/config.js');

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
  Promise.all([
    request('https://data.sfgov.org/resource/jjew-r69b.json?dayorder=' + time.day),
    request('https://maps.googleapis.com/maps/api/geocode/json?address=' + loc + key.key)
    ])
  .then(function(data) {
    var userLocation = data[1].results[0].geometry.location;
    
    handler.getOpenTrucks(data[0]);
  })
  .catch(function(err) {
    console.log('server: ', err);
  });
  
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