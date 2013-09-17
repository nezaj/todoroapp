App.Views.TasksView = Backbone.View.extend({

  template: JST['tasks/tasks_view'],
  
  events: {
    "submit #task-form": "addTask",
    "click a#submit-task-form": "addTask",
    "click a.remove-task": "removeTask",
    "click a.do-today": "doToday",
    "click a.do-later": "doLater",
    "click .task-unchecked": "taskComplete",
    "click .task-checked": "taskIncomplete",
    "click .task-title": "displayEditForm",
    "submit #task-edit": "editTaskTitle",
    "blur .task-edit-form": "editTaskTitle",
    "click .task-open-timer": "openTimer",
    "click .task-first-timer": "openTimerFirst",
    "click .task-close-timer": "closeTimer",
    "click .task-begin-pomodoro": "beginPomodoro",
    "click .task-begin-sbreak": "beginShortBreak",
    "click .task-begin-lbreak": "beginLongBreak",
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
    var $target = $(event.target);
    var formData;
    // Check whether submit or click link
    if ($target.get(0).tagName !== 'A') {
      formData = $target.serializeJSON().task;
    } else {
      formData = $target.parent().serializeJSON().task;
    }
    
    formData.list_id = this.collection.list_id;
    this.collection.create(formData, { 
      success: function() { appRouter.listsView.trigger('updateTasks'); },
      wait: true 
    });
  },
  
  beginLongBreak: function() {
    event.preventDefault();
    this.tickTock('Todoro', 15 * 60, false);
  },

  // Will increment pomodoro count
  beginPomodoro: function() {
    event.preventDefault();
    this.tickTock('Todoro', 5, true);
  },
  
  beginShortBreak: function() {
    event.preventDefault();
    this.tickTock('Todoro', 5 * 60, false);
  },
  
  closeTimer: function() {
    event.preventDefault();
    $('title').html('TodoroApp');
    // Hide Window and Update
    $('#timer-window').toggleClass('hidden');
    if (appRouter.tasksView) {appRouter.tasksView.trigger('updateTasks'); }
    appRouter.todayView.trigger('updateTasks');
    appRouter.listsView.trigger('updateTasks');
  },
  
  completePomodoro: function() {
    task = appRouter.todayView.timerTask
    task.save({ pomodoro_actual: task.get("pomodoro_actual") + 1 });
    
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
  
  openTimer: function(event, task_id) {
    event.preventDefault();
    if (!task_id) {
      var task_id = $(event.target).attr('data-id');
    }
    
    this.timerTask = this.collection.get(task_id);
    $('#timer-window').toggleClass('hidden');
    $('.timer-title').html("Task: " + this.timerTask.get("title"));
  },
  
  openTimerFirst: function() {
    var task = this.collection.first();
    if (task) {
      this.openTimer(event, task.id);
    } else {
      $('#task-alert').fadeIn('2000').delay('5000').fadeOut('5000');
    }
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
    event.preventDefault();
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
    event.preventDefault();
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
  
  tickTock: function(name, time_in_seconds, isPomodoro){
    var that = this;
    $(".timer-time").createTimer({
      time_in_seconds: time_in_seconds,
      tick: function(timer, time_in_seconds, formatted_time) {
        document.title = name + ' (' + formatted_time + ')';
      },
      buzzer: function(){
        document.title = 'DING!';
        if (isPomodoro) { that.completePomodoro(); }
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
  },
  
});
