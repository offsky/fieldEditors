'use strict';

/* Directives */
var directives = angular.module('appDirectives', []);

var PERCENT_REGEXP = /^100$|^[0-9]{1,2}$|^[0-9]{1,2}\.$|^[0-9]{1,2}\.[0-9]{1,2}$/;

directives.directive('year', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ctrl) {

      ctrl.$parsers.unshift(function(viewValue) {

        if (!isNaN(viewValue) && (viewValue.length <= 4)) {          
          // Valid input    
          ctrl.$setValidity('yearField', true);
          return viewValue;
        } else {
          // Invalid input
          ctrl.$setValidity('yearField', false);
          return undefined;
        }

      });
    }
  }
});

directives.directive('percent', function($filter) {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ctrl) {

      function applyFilter(value) {
        return $filter('percent')(value);
      }

      ctrl.$parsers.unshift(function(viewValue) {

        if (PERCENT_REGEXP.test(viewValue)) {          
          // Valid input 
          ctrl.$setValidity('percentField', true);
          return viewValue;
        } else {
          // Invalid input
          ctrl.$setValidity('percentField', false);
          return undefined;
        }

      });

      angular.element(element).bind('keypress', function(e) {
        if (e.charCode === 13) {
          // Detecting enter key
          this.value = applyFilter(this.value);
        }
      });

      angular.element(element).bind('blur', function(){
        this.value = applyFilter(this.value);
      })
    }
  }
});




directives.directive('fieldItem', function($filter) {
  return function(scope, element, attrs) {
    function putObject(path, object, value) {
        var modelPath = path.split(".");

        function fill(object, elements, depth, value) {
            var hasNext = ((depth + 1) < elements.length);
            if(depth < elements.length && hasNext) {
                if(!object.hasOwnProperty(modelPath[depth])) {
                  object[modelPath[depth]] = {};
                }
                fill(object[modelPath[depth]], elements, ++depth, value);
            } else {
                object[modelPath[depth]] = value;
            }
        }
        fill(object, modelPath, 0, value);
    }

    function connectDateTimeField() {
        $(element).find('input').datetimepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: 'mm/dd/yy',
            controlType: 'select',
            ampm: true,
            onClose: function(dateText) {
                var modelPath = $(this).attr('ng-model');
                putObject(modelPath, scope, dateText);
                scope.$apply();
                scope.updateField();
            }
        });
    }

    function connectIntegerField() {
        var inputEl = $(element).find('input');
        inputEl.blur(function() {
            var numberValue = $filter('number')(parseInt(this.value), 0);
            var modelPath = $(this).attr('ng-model');
            $(this).val(numberValue);
            putObject(modelPath, scope, numberValue)
            scope.$apply();
            scope.updateField();
        });
    }

    function connectLengthField() {
        var inputEl = $(element).find('input'),
            originalValue = inputEl.val();

        inputEl.on('click', function() {
           this.select();
        });
        inputEl.val($filter('length')(originalValue));

        inputEl.blur(function(){
            inputEl.val($filter('length')(inputEl.val()));
            scope.updateField();
        });

    }

    scope.$watch('field.type', function(value) {
        switch (value) {
            case 'datetime':
                connectDateTimeField();
                break;
            case 'integer':
                connectIntegerField();
                break;
            case 'length':
                connectLengthField();
                break;
            default:
                $(element).find('input').blur(function() {
                    scope.updateField();
                });
        }
    });

  }
});
