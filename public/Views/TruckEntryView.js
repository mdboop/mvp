var TruckEntryView = Backbone.View.extend({
  tagname: 'div',
  className: 'truck',
  template: _.template('<li class="truck-name"><%= name %></li> \
                        <li class="truck-location"><%= location %></li> \
                        <li class="truck-distance"><%= distance %></li>'),

  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
    this.render();
  },

  render: function () {
    return this.$el.html(this.template(this.model.attributes));
  }
 
});