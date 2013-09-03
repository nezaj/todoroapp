App.Views.ListsIndex = Backbone.View.extend({

  template: JST['lists/index'],

  render: function() {
    var renderedContent = this.template({ lists: this.collection });
    this.$el.html(renderedContent);
    return this;
  }

});
