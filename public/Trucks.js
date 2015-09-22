var Trucks = Backbone.Collection.extend({

  model: Truck,

  getTrucks: function (location, time) {
    var data = {
      location: location,
      time: time
    };
    console.log('client side data: ', data);

    $.ajax({
      url: '/food-trucks', 
      method: 'post',
      'data': data,
      success: function(res) {
        console.log('server response: ', res);
      } 
  });
  }
 
});