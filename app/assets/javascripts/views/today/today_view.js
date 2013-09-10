App.Views.TodayView = Backbone.View.extend({
  
  template: JST['today/today_view'],
  
  events: {
    "click a.today-remove-task": "removeTask",
    "click a.today-do-later": "doLater",
    "click .task-unchecked": "taskComplete",
    "click .task-checked": "taskIncomplete"
  },
  
  initialize: function() {
    this.listenTo(this, 'updateToday', this.update);
  },
   
  render: function() {
    var that = this;
    
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    
    this.collection.each(function(todayItem) {
      var todayItemView = new App.Views.TodayItemView({ model: todayItem });
      that.$('table').append(todayItemView.render().$el);
    });
    
    return this;
  },
  
  doLater: function() {
    event.preventDefault();
    var task_id = $(event.target).attr('data-id');
    var task = this.collection.get(task_id);
    task.save(
      { today: false },
      { success: function() { 
        appRouter.TasksView.trigger('updateList');
        appRouter.TodayView.trigger('updateToday');
      }
    });
  },
  
  removeTask: function() {
    event.preventDefault();
    var task_id = $(event.target).attr('data-id');
    var task = this.collection.get(task_id);
    task.destroy(
      { success: function() { 
        appRouter.TasksView.trigger('updateList');
        appRouter.TodayView.trigger('updateToday');
      }
    });
  },
  
  taskComplete: function() {
    console.log("Task complete!");
    var task_id = $(event.target).attr('data-id');
    var task = this.collection.get(task_id);
    task.save(
      { complete: true },
      { success: function() { 
        appRouter.TasksView.trigger('updateList');
        appRouter.TodayView.trigger('updateToday');
      }
    });
  },
  
  taskIncomplete: function() {
    console.log("Task incomplete!");
    var task_id = $(event.target).attr('data-id');
    var task = this.collection.get(task_id);
    task.save(
      { complete: false },
      { success: function() { 
        appRouter.TasksView.trigger('updateList');
        appRouter.TodayView.trigger('updateToday');
      }
    });
  },
  
  update: function() {
    console.log('Execute updateToday');
    var that = this;
    this.collection.fetch().done(function() {
      that.setElement(that.$el).render().$el;
    });
  },
  
  leave: function() {
    this.unbind();
    this.remove();
  }
});