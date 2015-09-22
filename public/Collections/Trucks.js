var Trucks = Backbone.Collection.extend({

  model: Truck,

  getTrucks: function (location, time) {
    var data = {
      location: location,
      time: time
    };
    $.post('/food-trucks', data, function(res) {
      this.addTrucks(res);
    }.bind(this));
  },

  addTrucks: function (trucks) {
    var truckModels = _.map(trucks, function(truck) {
      var newTruck = new Truck({
        name: truck.name,
        location: truck.location,
        distance: truck.distance
      });
      return newTruck;
    });
    _.each(truckModels, function(truck) {
      this.add(truck);
    }.bind(this));
  }
 
});