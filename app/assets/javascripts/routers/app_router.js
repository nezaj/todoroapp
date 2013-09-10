App.Routers.AppRouter = Backbone.Router.extend({
    
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
        that.showToday();
        }
      });
  },
  
  showList: function (id) {
    console.log('Executed showList');
    if (this.lists) {
      var that = this;
      this.currentList = this.lists.get(id);
      this.currentListTitle = this.currentList.get('title');
      this.tasks = this.currentList.get('tasks');
      
      this.tasks.fetch().done(function() {
        // Clean up previous view
        if (this.TasksView) { this.TasksView.leave(); }
        that.TasksView = new App.Views.TasksView({ 
          collection: that.tasks,
          listTitle: that.currentListTitle,
          viewType: "tasksView"
        });
        $('.current-tasks').html(that.TasksView.render().$el);  
      });
    } else {
      this.requestedId = id;
      this.index();
    }
  },
  
  showSidebar: function() {
    console.log('Executed showSidebar');
    if (this.lists) {
      this.listsView = new App.Views.ListsView( { collection: this.lists });
      $('.sidebar').html(this.listsView.render().$el);
    } else {
      this.index();
    }
  },
  
  showToday: function() {
    console.log('Executed showToday');
    var that = this;
    
    if (this.lists) {
      this.todayTasks = new App.Collections.TodayTasks();
      this.todayTasks.fetch().done(function() {
        if (that.TodayView) { that.TodayView.leave(); }
        that.TodayView = new App.Views.TasksView({
          collection: that.todayTasks,
          viewType: "todayView"
        });
        $('.today-tasks').html(that.TodayView.render().$el)      
      });
    } else {
      this.index();
    }
  }
  
});
