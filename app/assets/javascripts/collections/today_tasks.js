App.Collections.TodayTasks = Backbone.Collection.extend({
  model: App.Models.TodayTask,
  url: "/today_tasks"
})