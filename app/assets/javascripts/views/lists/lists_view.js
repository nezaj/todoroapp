App.Views.ListsView = Backbone.View.extend({
  events: {
    "submit #list-form": "addList",
    "click a#submit-list-form": "addList",
    "click a.remove-list": "removeList",
    "click a.list-title": "openList",
    "click #show-list-form": "showListForm",
    "click #remove-list-form": "removeListForm"
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
    
    this.addCustomEffects();
    
    return this;
  },

  activateHover: function() {
    $("ul").on('mouseenter', '.list-item', 
      function() {
        $(this).find(".remove-list").removeClass("hidden"); }
      );
    $("ul").on('mouseleave', '.list-item', 
      function() {
        $(this).find(".remove-list").addClass("hidden"); 
      }
    );
  },

  addCustomEffects: function() {
    this.activateHover();
    this.highlightActiveList();
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

    if (formData.title.length > 0) {
      this.collection.create(formData, { wait: true });
    } else {
      $('#add-list-alert').fadeIn('2000').delay('5000').fadeOut('5000');
    }
  },

  highlightActiveList: function() {
    $('.active-list').removeClass('active-list');
    $('#list-items').find('a[data-id='+appRouter.currentList.id+']').parent().addClass('active-list');
  },
  
  openList: function(event) {
    event.preventDefault();
    // $('.active-list').removeClass('active-list');
    // $(event.target).parent().addClass('active-list');
    var id = $(event.target).attr('data-id');
    appRouter.navigate('lists/' + id, {trigger: true});
  },
  
  removeList: function(event) {
    event.preventDefault();
    var id = $(event.target).attr('data-id');
    var listToDelete = this.collection.get(id);
    // Only delete if at least one list remaining
    if (_.size(this.collection) !== 1) { 
      listToDelete.destroy();
      appRouter.todayView.trigger('updateTasks');
      // display first list if deleted displaying list
      if (appRouter.currentList.id == parseInt(id)) {
        var listId = appRouter.lists.first().id
        appRouter.navigate("lists/" + listId, {trigger: true});
      }
    } else {
      $('#remove-list-alert').fadeIn('2000').delay('5000').fadeOut('5000');
    }
  },

  removeListForm: function() {
    $('#list-form').addClass('hidden');
    $('#show-list-form').removeClass('hidden');
  },

  showListForm: function() {
    $('#list-form').removeClass('hidden');
    $('#list-input-field').focus();
    $('#show-list-form').addClass('hidden');
  },
  
  update: function() {
    console.log('Execute updateTasks for sidebar');
    var that = this;
    this.collection.fetch().done(function() {
      that.setElement(that.$el).render().$el;
    });
  },
  
  leave: function() {
    this.unbind();
    this.remove();
  }
  
});
