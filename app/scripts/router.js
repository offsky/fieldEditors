define([
  // Application.
  "app",
  "module/toodledo"
],

function(app, Toodledo) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
      "": "index"
    },

    index: function() {        
        var task = new Toodledo.Task();
        
        app.useLayout("main").setViews({
            ".tasks": new Toodledo.Views.Task({
              collection: task
            })
        }).render();        
        
        task.fetch();    
        
    }
    
    
  });

  return Router;

});
