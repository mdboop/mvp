var TrucksView = Backbone.View.extend({
  tagName: 'div',
  className: 'trucks-list',
  initialize: function () {
    this.listenTo(this.collection, 'doneAdding', this.render);
    this.render();
  },

  render: function () {
    var $els = this.collection.map(function(model) {
      return new TruckEntryView({ model: model });
    });
    this.$el.empty();
    $els.forEach(function(node) {
      this.$el.append(node.$el);
    }.bind(this));

    return this.$el;

  }

});