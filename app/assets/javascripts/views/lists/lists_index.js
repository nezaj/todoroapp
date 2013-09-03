App.Views.ListsIndex = Backbone.View.extend({

  events: {
    "submit.new": "newList",
    "click a.remove": "removeList"
  },

  template: JST['lists/index'],
  
  initialize: function() {
    this.listenTo(this.collection, 'remove', this.render)
    this.listenTo(this.collection, 'add', this.render)
  },
  
  render: function() {
    var renderedContent = this.template({ lists: this.collection });
    this.$el.html(renderedContent);
    return this;
  },
  
  newList: function(event) {
    event.preventDefault();
    var formData = $(event.target).serializeJSON().list
    console.log(formData)
    this.collection.create(formData, {
      success: function() {
        Backbone.history.navigate("#", {trigger: true})
      }
    });
  },
  
  removeList: function(event) {
    event.preventDefault();
    var id = $(event.currentTarget).attr('data-id');
    var listToDelete = this.collection.get(id)
    listToDelete.destroy();
  }

});
