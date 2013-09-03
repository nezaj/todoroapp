App.Routers.Lists = Backbone.Router.extend({
  
  initialize: function ($rootEl, lists) {
    this.$rootEl = $rootEl;
    this.collection = lists;
  },
  
  routes: {
    "": "index",
    "lists/:id": "show"
  },
  
  index: function () {
    var that = this;
    var ListsIndex = new App.Views.ListsIndex({
      collection: that.collection
    })
    
    $('.sidebar').html(ListsIndex.render().$el);
  },
  
  show: function (id) {
    var that = this;
    var currentList = that.collection.get(id)
    
    console.log(currentList)
  }
  
});
