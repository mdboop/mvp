var AppView = Backbone.View.extend({
  tagName: 'div',
  template: _.template('<h1>Food Truck Finder</h1> \
  <h3>Hungry? Enter your location:</h3> \
  <input class="inputField" type="text"/> \
  <input class="submitButton" type="submit"/>'),

  events: {
    'click .formSubmit': 'formSubmit',
    'keydown input'    : 'formSubmit'
  },

  formSubmit : function(e) {
    if(e.which === 13) {
      console.log('hello');
      var loc = $('.inputField').val();
      var time = this.formatTime();
      var location = this.formatLocation(loc);
      this.collection.getTrucks(location, time);
    }
  },

  formatLocation : function (location) {
    return location.split(' ').join('+') + ',San+Francisco=';
  },

  formatTime : function () {
    var daysKey = {
      "Sun": 0, "Mon": 1, "Tue": 2, "Wed": 3, 
      "Thur": 4, "Fri": 5, "Sat": 6
    };

    var now = new Date().toString().split(' ');
    var time =  {
      day: daysKey[now[0]],
      hour: now[4].slice(0,2)
    };
    return time;
  },

  initialize: function () {
    this.listenTo(this.collection, 'add', this.render);
    this.render();
  }, 
  render: function () {
    var el = this.$el.append(this.template());
    $('body').append(el);
  }
});