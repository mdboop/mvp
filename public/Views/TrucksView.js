var TrucksView = Backbone.View.extend({
  tagName: 'div',
  initialize: function () {
    this.listenTo(this.collection, 'add', this.render);
    this.render();
  },

  render: function () {
    var $els = this.collection.map(function(model) {
      return new TruckEntryView({ model: model });
    });
    $els.forEach(function(node) {
      this.$el.append(node.$el);
    }.bind(this));

    return this.$el;

  }

});