window.App = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  
  // Called from dashboard/show
  initialize: function() {
    appRouter = new App.Routers.Lists();
    Backbone.history.start();
  }
};