App.Views.TasksItemView = Backbone.View.extend({
  
  className: "task-item",
  template: JST['tasks/tasks_item'],
  
  initialize: function(options) {
    this.viewType = options.viewType;
  },
  
  render: function() {
    var renderedContent = this.template({
      task: this.model,
      viewType: this.viewType 
    });
    this.$el.html(renderedContent);
    return this;
  }
});