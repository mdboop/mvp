var App = Backbone.Model.extend({

  defaults: {

  },

  getFoodTrucks: function(location) {

  },

  getTime: function() {
    var now = new Date().toString().split(' ');
    var day = now[0];
    var time = now[4];
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