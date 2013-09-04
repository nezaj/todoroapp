window.App = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  
  // Called from dashboard/show
  initialize: function() {
    appRouter = new App.Routers.Lists();
    Backbone.history.start();
    // Fetch Lists data
    // var listsCollection = new App.Collections.Lists();  
//     listsCollection.fetch({
//       success: function(collection) {
//         new App.Routers.Lists(collection);
//         Backbone.history.start();      
//       }
//     });
  }
};