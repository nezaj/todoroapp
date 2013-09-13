App.Views.ListsView = Backbone.View.extend({
  events: {
    "submit #list-form": "addList",
    "click a#submit-list-form": "addList",
    "click a.remove-list": "removeList",
    "click a.open-list": "openList"
  },

  template: JST['lists/lists_view'],
  
  initialize: function() {
    this.listenTo(this, 'updateTasks', this.update);
    this.listenTo(this.collection, 'remove', this.render);
    this.listenTo(this.collection, 'add', this.render);
  },
  
  render: function() {
    var self = this;
    
    var renderedContent = this.template({ lists: this.collection });
    this.$el.html(renderedContent);
    
    // Create individual list views
    this.collection.each(function (list) {
      var listsItemView = new App.Views.ListsItemView({ model: list });
      self.$('ul').append(listsItemView.render().$el);
    });
    
    // activateButtons();
    // makeSortable();
    //    $(#some-elemnt) => this.$el.find(#some-element)
    
    return this;
  },
  
  addList: function(event) {
    event.preventDefault();
    var $target = $(event.target);
    var formData;
    // Check whether submit or click link
    if ($target.get(0).tagName !== 'A') {
      formData = $target.serializeJSON().list;
    } else {
      formData = $target.parent().serializeJSON().list;
    }
    
    this.collection.create(formData, { wait: true });
  },
  
  openList: function(event) {
    event.preventDefault();
    var id = $(event.target).attr('data-id');
    appRouter.navigate('lists/' + id, {trigger: true});
  },
  
  removeList: function(event) {
    event.preventDefault();
    var id = $(event.target).attr('data-id');
    var listToDelete = this.collection.get(id);
    listToDelete.destroy();
  },
  
  update: function() {
    console.log('Execute updateTasks for sidebar');
    var that = this;
    this.collection.fetch().done(function() {
      that.setElement(that.$el).render().$el;
    });
  },
  
  leave: function() {
    this.off();
    this.remove();
  }
  
});
