App.Views.TasksView = Backbone.View.extend({

  template: JST['tasks/tasks_view'],
  
  events: {
    "submit #task-form": "addTask",
    "click a.list-remove-task": "removeTask",
    "click a.list-do-today": "doToday",
    "click a.list-do-later": "doLater",
    "click .task-unchecked": "taskComplete",
    "click .task-checked": "taskIncomplete",
    "click .task-edit-link": "displayEditForm",
    "submit .task-edit": "editTaskTitle",
    "blur .task-edit-form": "editTaskTitle"
  },
  
  initialize: function(options) {
    this.listTitle = options.listTitle;
    this.viewType = options.viewType;
    this.listenTo(this, 'updateTasks', this.update);
    this.listenTo(this.collection, 'add', this.render);
  },
    
  render: function() {
    var that = this;
    
    var renderedContent = this.template({
      tasks: this.collection,
      listTitle: this.listTitle,
      viewType: this.viewType
    });
    this.$el.html(renderedContent);
    
    // Create individual task views
    this.collection.each(function (task) {
      var tasksItemView = new App.Views.TasksItemView({ 
        model: task,
        viewType: that.viewType 
      });
      that.$('#task-content').append(tasksItemView.render().$el);
    });
    
    return this;
  },
  
  addTask: function() {
    event.preventDefault();
    var formData = $(event.target).serializeJSON().task;
    formData.list_id = this.collection.list_id;
    this.collection.create(formData, { 
      success: function() { appRouter.listsView.trigger('updateTasks'); },
      wait: true 
    });
  },
  
  displayEditForm: function() {
    event.preventDefault();
    $(event.target).parents('.task-item').find('.task-options')
    .toggleClass('hidden');
    $(event.target).parents('.task-item').find('.task-title')
    .toggleClass('hidden');
    $(event.target).parents('.task-item').find('.task-edit-form')
    .toggleClass('hidden').focus();
  },
  
  doLater: function() {
    event.preventDefault();
    var task_id = $(event.target).attr('data-id');
    var task = this.collection.get(task_id);
    task.save(
      { today: false },
      { success: function() { 
        if (appRouter.tasksView) {appRouter.tasksView.trigger('updateTasks'); }
        appRouter.todayView.trigger('updateTasks');
      }
    });
  },

  doToday: function() {
    event.preventDefault();
    var task_id = $(event.target).attr('data-id');
    var task = this.collection.get(task_id);
    task.save(
      { today: true },
      { success: function() { 
        if (appRouter.tasksView) {appRouter.tasksView.trigger('updateTasks'); }
        appRouter.todayView.trigger('updateTasks');
      }
    });
  },

  editTaskTitle: function() {
    event.preventDefault();
    var that = this;
    
    var task_id = $(event.target).attr('data-id');
    var task = this.collection.get(task_id);
    var newTaskTitle = $(event.target).serializeJSON().task.title;
    
    task.save(
      { title: newTaskTitle },
      { success: function() { 
        that.removeEditForm(event);
        if (appRouter.tasksView) {appRouter.tasksView.trigger('updateTasks'); }
        appRouter.todayView.trigger('updateTasks');
      }
    });
  },
  
  removeEditForm: function(event) {
    $(event.target).parents('.task-item').find('.task-options')
    .toggleClass('hidden');
    $(event.target).parents('.task-item').find('.task-title')
    .toggleClass('hidden');
    $(event.target).parents('.task-item').find('.task-edit-form')
    .toggleClass('hidden');
  },
  
  removeTask: function() {
    event.preventDefault();
    var task_id = $(event.target).attr('data-id');
    var task = this.collection.get(task_id);
    task.destroy(
      { success: function() { 
        if (appRouter.tasksView) {appRouter.tasksView.trigger('updateTasks'); }
        appRouter.todayView.trigger('updateTasks');
        appRouter.listsView.trigger('updateTasks');
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
        if (appRouter.tasksView) {appRouter.tasksView.trigger('updateTasks'); }
        appRouter.todayView.trigger('updateTasks');
        appRouter.listsView.trigger('updateTasks');
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
        if (appRouter.tasksView) {appRouter.tasksView.trigger('updateTasks'); }
        appRouter.todayView.trigger('updateTasks');
        appRouter.listsView.trigger('updateTasks');
      }
    });
  },
  
  update: function() {
    console.log('Execute updateTasks for ' + this.viewType);
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
