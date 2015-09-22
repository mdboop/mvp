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
  filterDupes: function (trucks) {
    return _.uniq(trucks, function(truck) {
      return truck.name;
    });
  },

  sortTrucks: function (trucks) {
    return _.sortBy(trucks, function(truck) {
      return truck.distance;
    });
  },

  makeTruckModels: function(trucks) {
    return _.map(trucks, function(truck) {
      var newTruck = new Truck({
        name: truck.name,
        location: truck.location,
        distance: truck.distance
      });
      return newTruck;
    });
  },

  addTrucks: function (trucks) {
    this.reset();
    trucks = this.filterDupes(trucks);
    trucks = this.sortTrucks(trucks).slice(0,5);
    var truckModels = this.makeTruckModels(trucks);

    _.each(truckModels, function(truck) {
      this.add(truck);
    }.bind(this));

    this.trigger('doneAdding');
  }
 
});