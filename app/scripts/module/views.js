define([
    "app",
    "backbone"
],
function(app, Backbone) { 
    
    var Views = {};

    Views.taskName = Backbone.View.extend({
        
        template: "text",

        // The DOM events specific to an item.
        events: {
            "click .taskName": "edit",
            "keypress .TaskName": "updateOnEnter",
            "blur .taskName": "close"
        },
        
        serialize: function() {
            
            return {
                completed: this.model.get("completed"),
                title: this.model.get("title")
            };
        },
        
        initialize: function() {
            this.model.on("change", function() {
                this.render();
            }, this);

            this.model.on("destroy", function() {
                this.remove();
            }, this);
        },
        
        // Toggle the `"done"` state of the model.
        toggleCompleted: function() {
            this.model.toggle();
        },

        // Switch this view into `"editing"` mode, displaying the input field.
        edit: function() {
            this.$el.addClass("editing");
        },

        // Close the `"editing"` mode, saving changes to the todo.
        close: function() {
            this.model.save({
                title: this.$("input.taskName").val()
            });

            this.$el.removeClass("editing");
        },

        // If you hit `enter`, we're through editing the item.
        updateOnEnter: function(e) {
            if (e.keyCode == 13) {
                this.close();
            }
        },

        // Remove the item, destroy the model.
        clear: function() {
            this.model.clear();
        }
    });
    
    Views.Task = Backbone.View.extend({
        render: function(manage) {
            this.collection.each(function(item) {
                this.insertView(new Views.taskName({
                    model: item
                }));
            }, this);

            return manage(this).render();
        },

        initialize: function() {
            this.collection.on("reset", function() {
                this.render();
            }, this);

            this.collection.on("add", function(item) {
                this.insertView(new Views.taskName({
                    model: item
                })).render();
            }, this);
        }
    });


    return Views;

});