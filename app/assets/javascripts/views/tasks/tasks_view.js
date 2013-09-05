App.Views.TasksView = Backbone.View.extend({

  template: JST['tasks/tasks_view'],
  
  events: {
    "submit.add-new-task": "addTask",
    "click a.remove-task": "removeTask",
    "click a.do-today": "addToday",
    "click a.do-later": "removeToday"
  },
  
  initialize: function() {
    vent.on('updateList', this.update, this);
    this.listenTo(this.collection, 'remove', this.render);
    this.listenTo(this.collection, 'add', this.render);
    this.listenTo(this.collection, 'change:today', this.render);
  },
    
  render: function() {
    var that = this;
    
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    
    // Create individual task views
    this.collection.each(function (task) {
      var tasksItemView = new App.Views.TasksItemView({ model: task });
      that.$('table').append(tasksItemView.render().$el);
    });
    
    return this;
  },
  
  addTask: function() {
    event.preventDefault();
    var formData = $(event.target).serializeJSON().task;
    formData.list_id = this.collection.list_id;

    this.collection.create(formData, {
      wait: true
    });
  },

  addToday: function() {
    event.preventDefault();
    var task_id = $(event.target).parent().attr('data-id')
    var task = this.collection.get(task_id);
    task.save(
      { today: true },
      { success: function() { vent.trigger('updateToday'); } }
    );
  },
  
  removeTask: function() {
    event.preventDefault();
    var task_id = $(event.target).parent().attr('data-id');
    var task = this.collection.get(task_id);
    task.destroy({
      success: function() { vent.trigger('updateToday'); }
    });

  },
  
  removeToday: function() {
    event.preventDefault();
    var task_id = $(event.target).parent().attr('data-id')
    var task = this.collection.get(task_id);
    task.save(
      { today: false },
      { success: function() { vent.trigger('updateToday'); } }
    );
  },
  
  update: function() {
    console.log('Execute updateList');
    var that = this;
    this.collection.fetch().done(function() {
      that.setElement(that.$el).render().$el;
    });
    // this.collection.fetch({
    //   success: function() {
    //     that.setElement(that.$el).render().$el;
    //   },
    //   wait: true
    // });
  },
  
  leave: function() {
    this.off();
    this.remove();
  }
  
});
