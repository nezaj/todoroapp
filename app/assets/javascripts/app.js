window.App = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  
  // Called from dashboard/show
  initialize: function() {
    vent = _.extend({}, Backbone.Events);
    appRouter = new App.Routers.AppRouter();
    Backbone.history.start();
  }
};