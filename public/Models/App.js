var App = Backbone.Model.extend({
  initialize: function () {
    this.set('trucks', new Trucks());
  }
});