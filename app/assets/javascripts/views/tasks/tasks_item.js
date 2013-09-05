App.Views.TasksItemView = Backbone.View.extend({
  
  tagname: "tr",
  template: JST['tasks/tasks_item'],
  
  render: function() {
    var renderedContent = this.template({ task: this.model });
    this.$el.html(renderedContent);
    return this;
  }
});