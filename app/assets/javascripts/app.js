window.App = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  // Called from dashboard/show
  initialize: function($rootEl, lists) {
    var listsCollection = new App.Collections.Lists(lists);
    new App.Routers.Lists($rootEl, listsCollection);
    Backbone.history.start();
  }
};