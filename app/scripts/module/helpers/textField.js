define([
    "app",
    "backbone"
],
function(app, Backbone) { 
    
    var TextField = {
        
        validateString: function( value ) {
            
            console.log("Validating:" + value);
            
            //testing
            return true;
        }
    };
    
    return TextField;

});