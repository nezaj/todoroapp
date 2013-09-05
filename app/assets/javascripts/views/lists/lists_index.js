App.Views.ListsIndex = Backbone.View.extend({
  events: {
    "submit.new": "newList",
    "click a.remove": "removeList",
    "click a.open" : "openList"
  },

  template: JST['lists/index'],
  
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
      var listItem = new App.Views.ListsItem({ model: list });
      self.$('table').append(listItem.render().$el);
    });
    
    return this;
  },
  
  newList: function(event) {
    event.preventDefault();
    
    var formData = $(event.target).serializeJSON().list;
    this.collection.create(formData, {
      // success: function() { appRouter.navigate("#") },
      // error: function() { appRouter.navigate("#") },
      wait: true
    });
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
  }
  
});
