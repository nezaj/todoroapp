App.Views.TodayView = Backbone.View.extend({
  
  template: JST['today/today_view'],
  
  events: {
    "click a.remove-today": "removeToday"
  },
  
  initialize: function() {
    pubSub.on('updateToday', this.update, this);
    this.listenTo(this.collection, "remove", this.render);
  },
   
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
  
  removeToday: function() {
    event.preventDefault();
    var task_id = $(event.target).attr('data-id');
    var task = this.collection.get(task_id);
    task.destroy({
      success: function() { pubSub.trigger('updateList'); }
    });
  },
  
  update: function() {
    console.log('Execute updateToday');
    var that = this;
    this.collection.fetch().done(function() {
      that.setElement(that.$el).render().$el;
    });
  },
  
  leave: function() {
    this.unbind();
    this.off();
    this.remove();
  }
});