App.Routers.Lists = Backbone.Router.extend({
    
  initialize: function () {
    this.$rootEl = $('.container');
  },
  
  routes: {
    "": "index",
    "lists/:id": "showList",
    "today/": "showToday"
  },
  
  index: function() {
    this.lists = new App.Collections.Lists();
    var that = this;
    this.lists.fetch({
      success:function() {
        that.showSidebar();
        // Load ListDetail if deep-linked
        if (that.requestedId) { that.showList(that.requestedId); }
        //that.showToday();
        that.showToday();
        }
      });
  },
  
  showList: function (id) {
    // Deep-linking pattern:
    // See: http://coenraets.org/blog/2011/12/backbone-js-wine-cellar-tutorial-part-3-deep-linking-and-application-states/
    if (this.lists) {
      this.currentList = this.lists.get(id)
      this.tasks = this.currentList.get('tasks');
      // Clean up previous view
      if (this.listShow) { this.listShow.leave(); }
      this.listShow = new App.Views.ListShow({ collection: this.tasks });
      $('.current-list-tasks').html(this.listShow.render().$el);
    } else {
      this.requestedId = id;
      this.index();
    }
  },
  
  showSidebar: function() {
    if (this.lists) {
      this.listsIndex = new App.Views.ListsIndex( { collection: this.lists });
      $('.sidebar').html(this.listsIndex.render().$el);
    } else {
      this.index();
    }
  },
  
  showToday: function() {
    console.log("Today!")
    if (this.lists) {
      this.tasksForToday = new App.Collections.TasksForToday();
      var that = this;
      this.tasksForToday.fetch({
        success:function() {
          if (that.todayView) { that.todayView.leave(); }
          that.todayView = new App.Views.TodayView({
            collection: that.tasksForToday
          });
          $('.today-list-tasks').html(that.todayView.render().$el)
        }
      });
    } else {
      this.index();
    }
  }
  
});
