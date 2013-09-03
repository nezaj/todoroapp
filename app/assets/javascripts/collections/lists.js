App.Collections.Lists = Backbone.Collection.extend({
  url: "/lists.json",
  model: App.Models.List,
  
  // Sort by created_time
  comparator: function(list) {
    var date = new Date(list.get('created_at'))
    return date.getTime();
  }
});
