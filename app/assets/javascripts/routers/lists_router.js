App.Routers.Lists = Backbone.Router.extend({
    
  initialize: function (collection) {
    this.$rootEl = $('.container');
    this.collection = collection;
  },
  
  routes: {
    "": "index",
    "lists/:id": "show"
  },
  
  index: function () {
    var that = this;
    var listsIndex = new App.Views.ListsIndex({
      collection: that.collection
    });
    
    $('.sidebar').html(listsIndex.render().$el);
  },
  
  show: function (id) {
    var that = this;
    var currentList = that.collection.get(id);
    var tasksCollection = currentList.get('tasks');
    
    var listShow = new App.Views.ListShow({
      collection: tasksCollection
    });
    
    $('.current-list-tasks').html(listShow.render().$el);
  }
  
});
