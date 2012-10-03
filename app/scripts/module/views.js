define([
    "app",
    "backbone",
    "module/helpers/textField"
],
function(app, Backbone, TextField) { 
    
    var Views = {};

    Views.taskName = Backbone.View.extend({
        
        template: "text",
        
        stringLength: "30",
        
        // The DOM events specific to an item.
        events: {
            "click .taskName": "edit",
            "keypress .taskName": "updateOnEnter",
            "blur .taskName": "close"
        },
        
        serialize: function() {
            
            return {
                className: "taskName",
                content: this.model.get("title")
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
            var textValue = this.$("input.taskName").val();
            if (TextField.validateString(textValue, this.stringLength)) {
                this.model.save({
                    title: textValue
                });

                this.$el.removeClass("editing");
            }
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
    
    Views.taskDuration = Backbone.View.extend({
        template: "text",

        // The DOM events specific to an item.
        events: {
            "click .taskDuration": "edit",
            "keypress .taskDuration": "updateOnEnter",
            "blur .taskDuration": "close"
        },
        
        serialize: function() {
            
            return {
                className: "taskDuration",
                content: this.model.get("duration")
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
                duration: this.$("input.taskDuration").val()
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
                this.insertView(new Views.taskDuration({
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