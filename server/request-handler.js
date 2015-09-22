var request = require('request-promise');
var Promise = require('bluebird');
var _ = require('underscore');
var key = require('./env/config.js');

var getOpenTrucks = function(time) {
  request('https://data.sfgov.org/resource/jjew-r69b.json?dayorder=' + time.day)
  .then(function(data) {
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
  })
  .catch(function(err) {
    console.log('getOpenTrucks error: ', err);
  });
};

var getLocation = function(location) {
  request('https://maps.googleapis.com/maps/api/geocode/json?address=' + 
    location + key.key)
  .then(function(data) {
    return data;
  });
};

var filterTrucks = function(trucks, location) {

};

exports.getLocation = getLocation;
exports.getOpenTrucks = getOpenTrucks;
exports.filterTrucks = filterTrucks;