App.Views.TaskView = Backbone.View.extend({

  tagName: "tr",
  template: JST['tasks/item'],
  
  render: function() {
    var renderedContent = this.template({ task: this.model })  
    this.$el.html(renderedContent);
    return this;
  },
  
});