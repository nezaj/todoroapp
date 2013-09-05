App.Views.ListsView = Backbone.View.extend({
  events: {
    "submit.new": "newList",
    "click a.remove": "removeList",
    "click a.open" : "openList"
  },

  template: JST['lists/lists_view'],
  
  initialize: function() {
    this.listenTo(this.collection, 'remove', this.render)
    this.listenTo(this.collection, 'add', this.render)
  },
  
  render: function() {
    var self = this;
    
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    
    // Create individual list views
    this.collection.each(function (list) {
      var listsItemView = new App.Views.ListsItemView({ model: list });
      self.$('table').append(listsItemView.render().$el);
    });
    
    return this;
  },
  
  newList: function(event) {
    event.preventDefault();
    var formData = $(event.target).serializeJSON().list;
    this.collection.create(formData, { wait: true });
  },
  
  openList: function(event) {
    event.preventDefault();
    var id = $(event.target).parent().attr('data-id');
    appRouter.navigate('lists/' + id, {trigger: true});
  },
  
  removeList: function(event) {
    event.preventDefault();
    var id = $(event.target).parent().attr('data-id');
    var listToDelete = this.collection.get(id);
    listToDelete.destroy();
  },
  
  leave: function() {
    this.off();
    this.remove();
  }
  
});
