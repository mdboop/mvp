var Trucks = Backbone.Collection.extend({

  model: Truck,

  getTrucks: function (location, time) {
    $.post('/food-trucks', function(data) {

    });
  }
 
});