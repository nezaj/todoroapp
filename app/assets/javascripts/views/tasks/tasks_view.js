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
    "click .task-open-timer": "openTimer",
    "click .task-first-timer": "openTimerFirst",
    "click .task-close-timer": "closeTimer",
    "click .task-begin-pomodoro": "beginPomodoro",
    "click .task-begin-sbreak": "beginShortBreak",
    "click .task-begin-lbreak": "beginLongBreak",
    "click .task-title": "displayEditForm",
    "blur .task-edit-form": "removeEditForm",
    "submit #task-edit": "editTaskTitle",
    "click #show-task-form": "showTaskForm",
    "click #remove-task-form": "removeTaskForm"
  },
  
  initialize: function(options) {
    this.currentList = options.currentList;
    this.viewType = options.viewType;
    this.listenTo(this, 'updateTasks', this.update);
    this.listenTo(this.collection, 'add', this.render);
  },
    
  render: function() {
    var that = this;
    
    var renderedContent = this.template({
      tasks: this.collection,
      currentList: this.currentList,
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

    this.addCustomEffects();
    
    return this;
  },

  activateHover: function() {
    $("ul").on('mouseenter', '.task-item', 
      function() {
        $(this).find(".remove-task").removeClass("hidden");
        $(this).find(".task-open-timer").removeClass("hidden");
        $(this).find(".do-control").removeClass("hidden"); }
      );
    $("ul").on('mouseleave', '.task-item', 
      function() {
        $(this).find(".remove-task").addClass("hidden");
        $(this).find(".task-open-timer").addClass("hidden");
        $(this).find(".do-control").addClass("hidden"); }
    );
  },

  addCustomEffects: function() {
    this.activateHover();
  },
  
  addTask: function() {
    event.preventDefault();
    var $target = $(event.target);
    var formData;

    // Handle user hitting enter or hitting the +
    if ($target.get(0).tagName !== 'A') {
      formData = $target.serializeJSON().task;
    } else {
      formData = $target.parent().serializeJSON().task;
    }

    if (formData.title.length > 0) {  
      formData.list_id = this.collection.list_id;
      this.collection.create(formData, { 
        success: function() { appRouter.listsView.trigger('updateTasks'); },
        wait: true 
      });
    } else {
      $('#add-task-alert').fadeIn('2000').delay('5000').fadeOut('5000');
    }
  },
  
  beginLongBreak: function() {
    event.preventDefault();
    this.tickTock('Todoro', 15 * 60, false);
  },

  // Will increment pomodoro count
  beginPomodoro: function() {
    event.preventDefault();
    this.tickTock('Todoro', 25 * 60, true);
  },
  
  beginShortBreak: function() {
    event.preventDefault();
    this.tickTock('Todoro', 5 * 60, false);
  },
  
  closeTimer: function() {
    event.preventDefault();
    $('title').html('TodoroApp');
    $('#timer-window').toggleClass('hidden');
    if (appRouter.tasksView) {
      appRouter.tasksView.trigger('updateTasks'); 
    }
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
    this.setTaskTodayStatus(event, false);
  },

  doToday: function() {
    this.setTaskTodayStatus(event, true);
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
      $('#timer-alert').fadeIn('2000').delay('5000').fadeOut('5000');
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

  removeTaskForm: function() {
    $('#task-form').addClass('hidden');
    $('#show-task-form').removeClass('hidden');
  },

  setTaskCompleteStatus: function(event, status) {
    event.preventDefault();
    var task_id = $(event.target).attr('data-id');
    var task = this.collection.get(task_id);
    
    task.save(
      { complete: status },
      { success: function() { 
        if (appRouter.tasksView) {appRouter.tasksView.trigger('updateTasks'); }
        appRouter.todayView.trigger('updateTasks');
        appRouter.listsView.trigger('updateTasks');
      }
    });
  },

  setTaskTodayStatus: function(event, status) {
    event.preventDefault();
    var task_id = $(event.target).attr('data-id');
    var task = this.collection.get(task_id);
    
    task.save(
      { today: status },
      { success: function() { 
        if (appRouter.tasksView) {appRouter.tasksView.trigger('updateTasks'); }
        appRouter.todayView.trigger('updateTasks');
      }
    });
  },

  showTaskForm: function() {
    $('#show-task-form').addClass('hidden');
    $('#task-form').removeClass('hidden');
    $('#task-input-field').focus();
  },
  
  taskComplete: function() {
    this.setTaskCompleteStatus(event, true);
  },
  
  taskIncomplete: function() {
    this.setTaskCompleteStatus(event, false);
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
