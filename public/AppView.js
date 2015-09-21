var AppView = Backbone.View.extend({
  tagName: 'div',
  template: _.template('<h1>Food Truck Finder</h1> \
  <h3>Hungry? Enter your location:</h3> \
  <input type="text"/> \
  <input type="submit"/>'),

  events: {
    'click' : 'formSubmit',
    'key'   : 'formSubmit'
  },

  formSubmit : function() {

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