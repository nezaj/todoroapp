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
  comparator: function(task) {
    var date = new Date(task.get('created_at'))
    return date.getTime();
  }
});
