App.Routers.AppRouter = Backbone.Router.extend({
    
  initialize: function () {
    this.$rootEl = $('.container');
  },
  
  routes: {
    "": "index",
    "lists/:id": "showList",
  },
  
  index: function() {
    this.lists = new App.Collections.Lists();
    var that = this;
    this.lists.fetch({
      success:function() {
        that.showSidebar();
        if (!that.requestedListId) { 
          that.requestedListId = that.lists.first().id
        }
        that.showList(that.requestedListId);
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
        if (this.tasksView) { this.tasksView.leave(); }
        that.tasksView = new App.Views.TasksView({ 
          collection: that.tasks,
          listTitle: that.currentListTitle,
          viewType: "tasksView"
        });
        $('.current-tasks').html(that.tasksView.render().$el);
        that.tasksView.activateHover(); 
      });
    } else {
      this.requestedListId = id;
      this.index();
    }
  },
  
  showSidebar: function() {
    this.listsView = new App.Views.ListsView( { collection: this.lists });
    $('.sidebar').html(this.listsView.render().$el);
    this.listsView.activateHover();
  },
  
  showToday: function() {
    console.log('Executed showToday');
    var that = this;
    this.todayTasks = new App.Collections.TodayTasks();

    this.todayTasks.fetch().done(function() {
      if (that.todayView) { that.todayView.leave(); }
      that.todayView = new App.Views.TasksView({
        collection: that.todayTasks,
        viewType: "todayView"
      });
      $('.today-tasks').html(that.todayView.render().$el)
      that.todayView.activateHover();   
    });
  }
  
});
