define([
    "app",
    "backbone"
],
function(app, Backbone) { 
    
    var TextField = {
        
        validateString: function( value, charLength ) {
            
            console.log("Validating:" + value + "; Max Length: " + charLength);
            
            //testing
            return true;
        }
    };
    
    return TextField;

});