App.Views.ListsItemView = Backbone.View.extend({

  tagName: "tr",
  template: JST['lists/lists_item'],
  
  render: function() {
    var renderedContent = this.template({ list: this.model });
    this.$el.html(renderedContent);
    return this;
  }

});
