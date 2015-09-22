var request = require('request-promise');
var Promise = require('bluebird');
var _ = require('underscore');
var key = require('./env/config.js');

var getOpenTrucks = function(data) {
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

};

var filterTrucks = function(trucks, location) {

};

exports.getLocation = getLocation;
exports.getOpenTrucks = getOpenTrucks;
exports.filterTrucks = filterTrucks;