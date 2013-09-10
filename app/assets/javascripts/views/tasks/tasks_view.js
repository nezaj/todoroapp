App.Views.TasksView = Backbone.View.extend({

  template: JST['tasks/tasks_view'],
  
  events: {
    "submit #task-form": "addTask",
    "click a.list-remove-task": "removeTask",
    "click a.list-do-today": "doToday",
    "click a.list-do-later": "doLater",
    "click .task-unchecked": "taskComplete",
    "click .task-checked": "taskIncomplete"
  },
  
  initialize: function(options) {
    this.listTitle = options.listTitle;
    pubSub.on('updateList', this.update, this);
    this.listenTo(this.collection, 'remove', this.render);
    this.listenTo(this.collection, 'add', this.render);
    this.listenTo(this.collection, 'change:today', this.render);
  },
    
  render: function() {
    var that = this;
    
    var renderedContent = this.template({
      listTitle: that.listTitle
    });
    this.$el.html(renderedContent);
    
    // Create individual task views
    this.collection.each(function (task) {
      var tasksItemView = new App.Views.TasksItemView({ model: task });
      that.$('table').append(tasksItemView.render().$el);
    });
    
    return this;
  },
  
  taskComplete: function() {
    console.log("Task complete!");
    var task_id = $(event.target).attr('data-id');
    var task = this.collection.get(task_id);
    task.save(
      { complete: true },
      { success: function() { 
        pubSub.trigger('updateList');
        pubSub.trigger('updateToday'); } }
    );
  },
  
  taskIncomplete: function() {
    console.log("Task incomplete!");
    var task_id = $(event.target).attr('data-id');
    var task = this.collection.get(task_id);
    task.save(
      { complete: false },
      { success: function() { 
        pubSub.trigger('updateList');
        pubSub.trigger('updateToday'); } }
    );
  },

  addTask: function() {
    event.preventDefault();
    var formData = $(event.target).serializeJSON().task;
    formData.list_id = this.collection.list_id;
    this.collection.create(formData, { wait: true });
  },

  doToday: function() {
    event.preventDefault();
    var task_id = $(event.target).attr('data-id');
    var task = this.collection.get(task_id);
    task.save(
      { today: true },
      { success: function() { pubSub.trigger('updateToday'); } }
    );
  },
  
  removeTask: function() {
    event.preventDefault();
    var task_id = $(event.target).attr('data-id');
    var task = this.collection.get(task_id);
    task.destroy({ success: function() { pubSub.trigger('updateToday'); } });
  },
  
  doLater: function() {
    event.preventDefault();
    var task_id = $(event.target).attr('data-id')
    var task = this.collection.get(task_id);
    task.save(
      { today: false },
      { success: function() { pubSub.trigger('updateToday'); } }
    );
  },
  
  update: function() {
    console.log('Execute updateList');
    var that = this;
    this.collection.fetch().done(function() {
      that.setElement(that.$el).render().$el;
    });
  },
  
  leave: function() {
    this.unbind();
    this.off();
    this.remove();
  }
  
});
