App.Collections.Lists = Backbone.Collection.extend({
  url: "/lists",
  model: App.Models.List,
  
  // Sort by created_time
  comparator: function(list) {
    var date = new Date(list.get('created_at'))
    return date.getTime();
  },

  numCompletedTasks: function() {
  	return this.numTasksbyListFunction("numCompletedTasks");
  },

  numPendingTasks: function() {
  	return this.numTasksbyListFunction("numPendingTasks");
  },

  numPomodorosAchieved: function() {
  	return this.numTasksbyListFunction("numPomodorosAchieved");
  },

  numTasksbyListFunction: function(listFunc) {
  	var sum = 0;
  	this.each(function(list) { sum += list[listFunc]() })
  	return sum;
  },


});
