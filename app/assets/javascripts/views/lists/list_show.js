App.Views.ListShow = Backbone.View.extend({

  className: "list-tasks",
  template: JST['lists/show'],
  
  events: {
    "submit.add-new-task": "addTask",
    "click a.task-remove": "removeTask",
    "click a.do-today": "addToday",
    "click a.do-later": "removeToday"
  },
  
  initialize: function() {
    this.listenTo(this.collection, 'remove', this.render);
    this.listenTo(this.collection, 'add', this.render);
    this.listenTo(this.collection, 'change', this.render);
  },
    
  render: function() {
    var that = this;
    
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    
    // Create individual task views
    this.collection.each(function (task) {
      var taskView = new App.Views.TaskView({ model: task });
      that.$('table').append(taskView.render().$el);
    });
    
    return this;
  },
  
  addTask: function() {
    event.preventDefault();
    var formData = $(event.target).serializeJSON().task;
    formData.list_id = this.collection.list_id;

    this.collection.create(formData, {
      success: function() { appRouter.navigate("#") },
      error: function() { appRouter.navigate("#") },
      wait: true
    });
  },

  addToday: function() {
    event.preventDefault();
    var task_id = $(event.target).parent().attr('data-id')
    var task = this.collection.get(task_id);
    task.save({ today: true });

  },
  
  removeTask: function() {
    event.preventDefault();
    var task_id = $(event.target).parent().attr('data-id');
    var task = this.collection.get(task_id);
    task.destroy();
  },
  
  removeToday: function() {
    event.preventDefault();
    var task_id = $(event.target).parent().attr('data-id')
    var task = this.collection.get(task_id);
    task.save({ today: false });
  }
  
});
