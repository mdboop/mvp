var TruckEntryView = Backbone.View.extend({
  tagname: 'div',
  template: _.template('<li><%= name %></li> \
                        <li><%= location %></li> \
                        <li><%= distance %></li>'),

  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
    this.render();
  },

  render: function () {
    return this.$el.html(this.template(this.model.attributes));
  }
 
});