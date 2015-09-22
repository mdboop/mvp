var request = require('request-promise');
var Promise = require('bluebird');
var _ = require('underscore');
var geolib = require('geolib');
var key = require('./env/config.js');

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
        distance: distance,
        location: truck.location
      };
      formattedTrucks.push(formattedTruck); 
    }
  });
  return formattedTrucks;
};

exports.getOpenTrucks = getOpenTrucks;
exports.getDistance = getDistances;