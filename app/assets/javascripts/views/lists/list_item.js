App.Views.ListsItem = Backbone.View.extend({

  tagName: "tr",
  template: JST['lists/item'],
  
  render: function() {
    var renderedContent = this.template({ list: this.model });
    this.$el.html(renderedContent);
    return this;
  }

});
