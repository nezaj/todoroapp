App.Collections.Tasks = Backbone.Collection.extend({
  model: App.Models.Task,
  
  initialize: function(data, options) {
    this.list_id = options.list_id;
  },
  
  url: function() {
    var list_id = this.list_id || this.models[0].get('list_id');
    return '/lists/' + list_id + '/tasks';
  },
  
  // Sort by created_time
  // comparator: function(task) {
  //   var date = new Date(task.get('created_at'))
  //   return date.getTime();
  // },
  
  // See:
  // http://stackoverflow.com/questions/11762105/filter-backbone-collection-by-attribute-value
  byTodayStatus: function(status) {
    filtered = this.filter(function(task) {
      return task.get("today") === status;
    });
    return new App.Collections.Tasks(filtered);
  }
});
