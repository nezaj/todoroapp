App.Views.ListsItemView = Backbone.View.extend({

  tagName: "li",
  className: "list-group-item list-item",
  template: JST['lists/lists_item'],
  
  render: function() {
    var renderedContent = this.template({ list: this.model });
    this.$el.html(renderedContent);

    return this;
  }

});
