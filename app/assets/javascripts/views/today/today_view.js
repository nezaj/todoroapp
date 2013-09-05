App.Views.TodayView = Backbone.View.extend({
  
  template: JST['today/today_view'],
  
  render: function() {
    var that = this;
    
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    
    this.collection.each(function(todayItem) {
      var todayItemView = new App.Views.TodayItemView({ model: todayItem });
      that.$('table').append(todayItemView.render().$el);
    });
    
    return this;
  },
  
  leave: function() {
    this.off();
    this.remove();
  }
});