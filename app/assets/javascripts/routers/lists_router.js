App.Routers.Lists = Backbone.Router.extend({
    
  initialize: function () {
    this.$rootEl = $('.container');
  },
  
  routes: {
    "": "index",
    "lists/:id": "show"
  },
  
  index: function () {
    this.displaySidebar();
    this.displayTodayTasks();
    //this.displayUnplannedTasks();
  },
  
  show: function (id) {
    // Deep-linking pattern:
    // See: http://coenraets.org/blog/2011/12/backbone-js-wine-cellar-tutorial-part-3-deep-linking-and-application-states/
    if (this.lists) {
      this.currentList = this.lists.get(id)
      this.tasks = this.currentList.get('tasks');
      // Add close method to properly remove view
      // if (this.listShow) { this.listShow.close(); }
      this.listShow = new App.Views.ListShow({ collection: this.tasks });
      $('.current-list-tasks').html(this.listShow.render().$el);
    } else {
      this.requestedId = id;
      this.index();
    }
  },
  
  displaySidebar: function() {
    this.lists = new App.Collections.Lists();
    var that = this;
    this.lists.fetch({
      success:function() {
        that.listsIndex = new App.Views.ListsIndex( { collection: that.lists });
        $('.sidebar').html(that.listsIndex.render().$el);
        if (that.requestedId) { that.show(that.requestedId); }
      }
    });
  },
  
  displayTodayTasks: function() {
    //var todayTasks = new App.Collections.TodayTasks();
    console.log("Let's do this!")
  }
  
});
