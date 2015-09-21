var Trucks = Backbone.Collection.extend({

  model: Truck,

  getOpenTrucks: function(location, time) {
    $.get(
      ('https://data.sfgov.org/resource/jjew-r69b.json?dayorder=' + time.day),
      function(data) {
        var trucks = [];
        _.each(data, function(truck) { 
          var truckStart = Number(truck.start24.slice(0,2));
          var truckEnd = Number(truck.end24.slice(0,2));
          var nowTime = Number(time.hour);
          if(nowTime > truckStart && nowTime < truckEnd) {
            trucks.push(truck);
          }
        });
        this.filterTrucksByDistance(location, trucks);
      }
    );
  },

  filterTrucksByDistance: function (location, trucks) {

  },

  getTime: function() {
    var daysKey = {
      "Sun": 0, "Mon": 1, "Tue": 2, "Wed": 3, 
      "Thur": 4, "Fri": 5, "Sat": 6
    };

    var now = new Date().toString().split(' ');
    var time =  {
      day: daysKey[now[0]],
      hour: now[4].slice(0,2)
    };
    this.getOpenTrucks('here', time);
  }

});