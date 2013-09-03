App.Collections.Lists = Backbone.Collection.extend({
  url: "/lists",
  model: App.Models.List,
  
  comparator: function(list) {
    return list.created_at
  }
});
