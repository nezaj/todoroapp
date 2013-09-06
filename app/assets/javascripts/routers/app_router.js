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
      this.currentList = this.lists.get(id);
      this.currentListTitle = this.currentList.get('title');
      this.tasks = this.currentList.get('tasks');
      // Clean up previous view
      if (this.listShow) { this.listShow.leave(); }
      this.TasksView = new App.Views.TasksView({ 
        collection: this.tasks,
        listTitle: this.currentListTitle
      });
      $('.current-tasks').html(this.TasksView.render().$el);
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
        if (that.todayView) { that.todayView.leave(); }
        that.todayView = new App.Views.TodayView({collection: that.todayTasks});
        $('.today-tasks').html(that.todayView.render().$el)      
      });
    } else {
      this.index();
    }
  }
  
});
