var AppView = Backbone.View.extend({
  tagName: 'div',
  template: _.template('<h1>Food Truck Finder</h1> \
  <h3>Hungry? Enter your location:</h3> \
  <input class="inputField" type="text"/> \
  <input class="submitButton" type="submit"/>'),

  events: {
    'click .formSubmit' : 'formSubmit',
    'keydown input'   : 'formSubmit'
  },

  formSubmit : function(e) {
    if(e.which === 13) {
      console.log('hello');
      this.model.getTime();
    }
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