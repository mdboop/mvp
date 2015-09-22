var request = require('request-promise');
var Promise = require('bluebird');
var _ = require('underscore');
var geolib = require('geolib');
var key = require('./env/config.js');

var yelp = require("yelp").createClient({
  consumer_key: "oMe1MKnLxKsPtJFq-vPw8A", 
  consumer_secret: "P_yy5mbRrkI_xko-UhPEORWFPxU",
  token: "Y5qfwitYiF_7IhQ5sjY2RRWMgl6ffpBw",
  token_secret: "SB63i_AYNs22GIsIJOI-JhomeTM"
});

var getMatrixDistances = function(trucks, location) {

  var trucksA = trucks.slice(0,trucks.length/2);
  var trucksB = trucks.slice(trucks.length/2);
  var matrixRequestA = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=' +
                      loc.latitude + ',' + loc.longitude + '&destinations=';
  var matrixRequestB = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=' +
                      loc.latitude + ',' + loc.longitude + '&destinations=';
  _.each(trucksA, function(truck, i) {
    if(i < trucks.length - 1) {
      matrixRequestA += truck.latitude + ',' + truck.longitude + '|';
    }
  });

  _.each(trucksB, function(truck, i) {
    if(i < trucks.length - 1) {
      matrixRequestB += truck.latitude + ',' + truck.longitude + '|';
    }
  });
  matrixRequestA = matrixRequestA.slice(0,matrixRequestA.length - 1) + '&key=' + key.key;
  matrixRequestB = matrixRequestB.slice(0,matrixRequestB.length - 1) + '&key=' + key.key;

  Promise.all([
    request(matrixRequestA),
    request(matrixRequestB)
    ])
  .then()
};

var getOpenTrucks = function(time, data) {
  data = JSON.parse(data);
  var trucks = [];
  var nowTime = Number(time.hour);

  _.each(data, function(truck) { 
    var truckStart = Number(truck.start24.slice(0,2));
    var truckEnd = Number(truck.end24.slice(0,2));
    if(nowTime > truckStart && nowTime < truckEnd) {
      trucks.push(truck);
    }
  });
  return trucks;
};


var getDistances = function(trucks, location) {
  var formattedTrucks = [];
  _.each(trucks, function(truck) {
    if(truck.latitude && truck.longitude) {
      var truckLocation = {
        latitude: truck.latitude,
        longitude: truck.longitude
      };
      var distance = (geolib.getDistance(location, truckLocation) * 0.000621371);
      distance = distance.toPrecision(2) + ' miles';
      var formattedTruck = {
        name: truck.applicant,
        latitude: truck.latitude,
        longitude: truck.longitude,
        distance: distance,
        location: truck.location
      };
      formattedTrucks.push(formattedTruck); 
    }
  });
  return formattedTrucks;
};

exports.getYelpResult = getMatrixDistances;
exports.getOpenTrucks = getOpenTrucks;
exports.getDistance = getDistances;