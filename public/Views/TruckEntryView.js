var TruckEntryView = Backbone.View.extend({
  tagname: 'ul',
  className: 'collection',
  template: _.template('<li class="collection-item deep-orange lighten-3 truck-name"><%= name %></li> \
                        <a href= http://maps.google.com/?q=<%= latitude %>,<%= longitude %>> \
                        <li class="collection-item"><%= location %></li></a> \
                        <li class="collection-item"><%= distance %></li>'),

  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
    this.render();
  },

  render: function () {
    return this.$el.html(this.template(this.model.attributes));
  }
 
});