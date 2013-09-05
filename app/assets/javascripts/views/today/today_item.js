App.Views.TodayItemView = Backbone.View.extend({
  
  tagname: "tr",
  template: JST['today/today_item'],
  
  render: function() {
    var renderedContent = this.template({ task: this.model });
    this.$el.html(renderedContent);
    return this;
  }
});