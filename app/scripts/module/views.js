define([
    "app",
    "backbone",
    "module/helpers/textField"
],
function(app, Backbone, TextField) { 
    
    var Views = {};

    Views.taskItem = Backbone.View.extend({
        
        template: "task",
        
        tagName: "li",
        
        stringLength: "30",
        
        // The DOM events specific to an item.
        events: {
            "click .textField": "editTextField",
            "keypress .textField": "updateOnEnter",
            "blur .textField": "closeTextField"
        },
        
        serialize: function() {
            
            return {
                taskName: this.model.get("name"),
                taskDuration: this.model.get("duration")
            };
        },
        
        initialize: function() {            
            this.$el.addClass("task").attr("id", this.model.get("id"));
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
        editTextField: function( e ) {
            this.$el.find(e.target).addClass("editing");
        },

        // Close the `"editing"` mode, saving changes to the todo.
        closeTextField: function( event ) {
            var $element = $(event.target),
                value = $element.val(),
                elementType = $element.data("field");
            
            console.log(this);
            
            if (TextField.validateString( value )) { 
                if (elementType == 'name') {
                    this.model.save({ name : value });
                } else if (elementType == 'duration') {
                    this.model.save({ duration : value });
                }

                $element.removeClass("editing");
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
    
    Views.Task = Backbone.View.extend({
        tagName: "ul",
        
        render: function(manage) {
            this.collection.each(function(item) {
                this.insertView(new Views.taskItem({
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