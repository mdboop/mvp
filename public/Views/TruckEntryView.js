var TruckEntryView = Backbone.View.extend({
  tagname: 'div',
  className: 'truck',
  template: _.template('<span class="truck-name"><%= name %></span> \
                        <a href= http://maps.google.com/?q=<%= latitude %>,<%= longitude %>> \
                        <span class="truck-location"><%= location %></span></a> \
                        <span class="truck-distance"><%= distance %></span>'),

  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
    this.render();
  },

  render: function () {
    return this.$el.html(this.template(this.model.attributes));
  }
 
});