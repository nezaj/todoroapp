App.Routers.Lists = Backbone.Router.extend({
  
  initialize: function ($rootEl, lists) {
    this.$rootEl = $rootEl;
    this.lists = lists;
  },
  
  routes: {
    "": "index",
    "lists/:id": "show"
  },
  
  index: function () {
    var that = this
    
    var ListsIndex = new App.Views.ListsIndex( {
      collection: that.lists
    })
    
    that.$rootEl.html(ListsIndex.render().$el);
  },
  
  show: function (id) {
    console.log("Show Booya!")
  }
  
});
