define([
    "app",
    "backbone",
    "module/views",
    "plugins/backbone.localstorage"
],
function(app, Backbone, Views) { 
    var Toodledo = app.module();
    
    Toodledo.Model = Backbone.Model.extend({
        defaults: {
            name: '',
            duration: '',
            completed: false
        },
        
        // Toggle the `done` state of this todo item.
        toggle: function() {
            this.save({                
                completed: !this.get("done")
            });
        },
        
        // Remove this Todo from *localStorage* and delete its view.
        clear: function() {
            this.destroy();
        }
    });
    
    
    // The collection of todos is backed by *localStorage* instead of a remote
    // server.
    Toodledo.Task = Backbone.Collection.extend({
        // Reference to this collection's model.
        model: Toodledo.Model,

        // Save all of the todo items under the `"todos"` namespace.
        localStorage: new Store("tdl"),

        initialize: function() {
            //remove items from localStorage and re-populate        
            if (localStorage.getItem("tdl")) {
                console.log("removing tdl");
                localStorage.removeItem("tdl");
            }
            
            var sampleTask = {"613ecd3f-c2d9-46eb-739d-1b6de9661325":{"name":"Sample Task 2","duration":"1 hour","completed":false,"order":1,"id":"613ecd3f-c2d9-46eb-739d-1b6de9661325"},"7c5b28c0-685b-39a0-b221-5f6e9c581c43":{"name":"Sample Task 1","duration":"30 mins","completed":false,"order":2,"id":"7c5b28c0-685b-39a0-b221-5f6e9c581c43"}}
            localStorage.setItem("tdl", JSON.stringify(sampleTask));
        },
        
        // Filter down the list of all todo items that are finished.
        completed: function() {
            return this.filter(function(toodledo) {
                return toodledo.get("completed");
            });
        },

        // Filter down the list to only todo items that are still not finished.
        remaining: function() {
            return this.without.apply(this, this.completed());
        },

        // We keep the Todos in sequential order, despite being saved by unordered
        // GUID in the database. This generates the next order number for new items.
        nextOrder: function() {
            if (!this.length) {
                return 1;
            }

            return this.last().get("order") + 1;
        },

        // Todos are sorted by their original insertion order.
        comparator: function(toodledo) {
            
            return toodledo.get("order");
        }
    });

    Toodledo.Views = Views;

    return Toodledo;
    
});