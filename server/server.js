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
    var geocode = JSON.parse(data[1]);
    var userLocation = geocode.results[0].geometry.location;
    var loc = {
      latitude: userLocation.lat,
      longitude: userLocation.lng
    };

    var trucks = handler.getOpenTrucks(time, data[0]);
    var results = handler.getDistance(trucks, loc);
    res.send(results);

  })
  .catch(function(err) {
    console.log('server: ', err);
  });
  
});


app.listen(8080);