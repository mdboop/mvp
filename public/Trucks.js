var Trucks = Backbone.Collection.extend({

  model: Truck,

  getTrucks: function (location, time) {
    var data = {
      location: location,
      time: time
    };
    console.log('client side data: ', data);
    $.post('/food-trucks', data, function(res) {
      this.addTrucks(res);
    }.bind(this));
  },

  addTrucks: function (trucks) {
    _.each(trucks, function(truck) {
      this.add({ model: new Truck({
        
      })
    });

    }.bind(this));
  }
 
});