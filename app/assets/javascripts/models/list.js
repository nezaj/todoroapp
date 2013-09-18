App.Models.List = Backbone.Model.extend({
  parse: function(list) {
    if (list) { 
      list.tasks = new App.Collections.Tasks(list.tasks, {list_id: list.id});
    }
    return list;
  },
  
  toJSON: function() {
    var json = Backbone.Model.prototype.toJSON.call(this);
    if (this.get('tasks')) {
      json.tasks = this.get('tasks').toJSON();
    }
    return json;
  },

  numCompletedTasks: function() {
    return this.numTasksbyCompleteStatus(true);
  },

  numPendingTasks: function() {
    return this.numTasksbyCompleteStatus(false);
  },

  numPomodoros: function(pomodoroType) {
    var sum = 0;
    _.each(this.toJSON().tasks, function(task) { sum += task[pomodoroType] });
    return sum
  },

  numPomodorosAchieved: function() {
    return this.numPomodoros("pomodoro_actual");
  },

  numPomodorosExpected: function() {
    return this.numPomodoros("pomodoro_expected");
  },

  numTasksbyCompleteStatus: function(status) {
    return _.where(this.toJSON().tasks, {complete: status}).length;
  }

});
