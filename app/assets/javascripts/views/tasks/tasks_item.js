App.Views.TasksItemView = Backbone.View.extend({
  
  className: "task-item",
  template: JST['tasks/tasks_item'],
  
  render: function() {
    var renderedContent = this.template({ task: this.model });
    this.$el.html(renderedContent);
    return this;
  }
});