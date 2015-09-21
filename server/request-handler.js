var request = require('request');
var Promise = require('bluebird');
var _ = require('underscore');
var requestPromise = Promise.promisify(request);

exports.getOpenTrucks = function(time) {
  request('https://data.sfgov.org/resource/jjew-r69b.json?dayorder=' + time.day)
  .then(function(data) {
    var trucks = [];
    _.each(data, function(truck) { 
      var truckStart = Number(truck.start24.slice(0,2));
      var truckEnd = Number(truck.end24.slice(0,2));
      var nowTime = Number(time.hour);
      if(nowTime > truckStart && nowTime < truckEnd) {
        trucks.push(truck);
      }
    });
    return trucks;
  })
};

exports.getLocation = function(location) {
  request('https://maps.googleapis.com/maps/api/geocode/json?address=' + 
    location + 'AIzaSyAQe-GOI8rolvi4Ez3L5kdPkHyarcAYAuI')
  .then(function() {

  });
};