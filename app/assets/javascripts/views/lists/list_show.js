App.Views.ListShow = Backbone.View.extend({

  className: "list-tasks",
  template: JST['lists/show'],
  
  events: {
    "submit.add-new-task": "addTask",
    "click a.task-remove": "removeTask"
  },
  
  initialize: function() {
    this.listenTo(this.collection, 'remove', this.render)
    this.listenTo(this.collection, 'add', this.render)
  },
    
  render: function() {
    var self = this;
    
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    
    // Create individual task views
    this.collection.each(function (task) {
      var taskView = new App.Views.TaskView({ model: task });
      self.$('table').append(taskView.render().el);
    });
    
    return this;
  },
  
  addTask: function() {
    event.preventDefault();
    var formData = $(event.target).serializeJSON().task;
    formData.list_id = this.collection.list_id;

    this.collection.create(formData, {
      success: function() { Backbone.history.navigate("#") },
      error: function() { Backbone.history.navigate("#") },
      wait: true
    });
  },
  
  removeTask: function() {
    event.preventDefault();
    
    var task_id = $(event.target).parent().attr('data-id');
    var taskToDelete = this.collection.get(task_id);
    taskToDelete.destroy();
  }

});
