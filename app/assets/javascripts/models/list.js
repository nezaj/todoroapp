App.Models.List = Backbone.Model.extend({
  parse: function(list) {
    list.tasks = new App.Collections.Tasks(list.tasks, {list_id: list.id});
    return list;
  },
  
  toJSON: function() {
    var json = Backbone.Model.prototype.toJSON.call(this);
    if (this.get('tasks')) {
      json.tasks = this.get('tasks').toJSON();
    }
    return json;
  }
});
