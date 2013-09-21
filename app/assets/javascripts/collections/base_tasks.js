App.Collections.BaseTasks = Backbone.Collection.extend({
  numCompletedTasks: function() {
    return this.numTasksbyCompleteStatus(true);
  },

  numPendingTasks: function() {
    return this.numTasksbyCompleteStatus(false);
  },

  numPomodoros: function(pomodoroType) {
    var sum = 0;
    this.each(function(task) { sum += task.get(pomodoroType) });
    return sum
  },

  numPomodorosAchieved: function() {
    return this.numPomodoros("pomodoro_actual");
  },

  numPomodorosExpected: function() {
    return this.numPomodoros("pomodoro_expected");
  },

  numTasksbyCompleteStatus: function(status) {
    return _.where(this.toJSON(), {complete: status}).length;
  }
})