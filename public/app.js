var App = Backbone.Model.extend({

  url: 'https://data.sfgov.org/resource/jjew-r69b.json',

  defaults: {
    dayOrder: {
      "Sun": 0,
      "Mon": 1,
      "Tue": 2,
      "Wed": 3,
      "Thur": 4,
      "Fri": 5,
      "Sat": 6
    }
  },

  getFoodTrucks: function(location, time) {

  },

  getTime: function() {

    var key = {
      "Sun": 0, "Mon": 1, "Tue": 2, "Wed": 3, 
      "Thur": 4, "Fri": 5, "Sat": 6
    };

    var now = new Date().toString().split(' ');
    var day = key[now[0]];
    var time = now[4].slice(0,2);
    var result =  {
      day: day,
      hour: time
    };
    console.log(result);
  }


});


var getUserInfo = function(location) {
  var now = new Date().toString().split(' ');

  var day = now[0];
  var hour = now[4];

  return {
    day: day,
    hour: hour
  };

};