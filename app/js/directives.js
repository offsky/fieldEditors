'use strict';

var directives = angular.module('appDirectives', []);

var PERCENT_REGEXP = /^100$|^[0-9]{1,2}$|^[0-9]{1,2}\.$|^[0-9]{1,2}\.[0-9]{1,2}$/,
    PHONE_REGEXP = /^[(]{0,1}[0-9]{3}[)\.\- ]{0,1}[0-9]{3}[\.\- ]{0,1}[0-9]{4}$/;

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

      element.bind('keypress', function(e) {
        var value = this.value || "0";
        if (e.charCode === 13) {
          if (value.indexOf("%") == -1) {
            this.value = applyFilter(value);
          }
        }
      });

      element.bind('blur', function(){
        var value = this.value || "0";
        if (value.indexOf("%") == -1) {
          this.value = applyFilter(value);
        }
      })
    }
  }
});

directives.directive('currency', function($filter) {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ctrl) {

      function applyFilter(value) {
        return $filter('currency')(value);
      }

      ctrl.$parsers.unshift(function(viewValue) {

        if (PERCENT_REGEXP.test(viewValue)) {
          // Valid input
          ctrl.$setValidity('currencyField', true);
          return viewValue;
        } else {
          // Invalid input
          ctrl.$setValidity('currencyField', false);
          return undefined;
        }

      });

      element.bind('keypress', function(e) {
        var value = this.value;
        if (e.charCode === 13) {
          if (value.indexOf("$") == -1) {
            this.value = applyFilter(value);
          }
        }
      });

      element.bind('blur', function(){
        var value = this.value;
        if (value.indexOf("$") == -1) {
          this.value = applyFilter(value);
        }
      })
    }
  }
});

directives.directive('phone', function($filter) {
  return {
    require: 'ngModel',
    restrict: 'A',
    link: function(scope, element, attrs, ctrl) {
      function applyFilter(value) {
        return $filter('phone')(value);
      }

      scope.showEdit = false;
      scope.showInput = true;

      scope.editField = function() {
        scope.showEdit = false;
        scope.showInput = true;
        angular.element('.phonenumber').remove();
      }

      element.bind('blur', function() {
        var html='';

        scope.$apply(function() {
          var value = ctrl.$viewValue,
              valid = PHONE_REGEXP.test(value);

          if (valid) {
            ctrl.$setValidity('phoneField', true);
            scope.showEdit = true;
            scope.showInput = false;
          } else {
            ctrl.$setValidity('phoneField', false);
          }
        });

        html = '<span class="phonenumber">' + applyFilter(this.value) + '</span>';
        $(this).after(html);

      });
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

    /*function connectLengthField() {
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

    }    */

    scope.$watch('field.type', function(value) {
      switch (value) {
        case 'datetime':
          connectDateTimeField();
          break;
        case 'integer':
          connectIntegerField();
          break;
        case 'length':
          //connectLengthField();
          break;
        default:
          $(element).find('input').blur(function() {
            scope.updateField();
          });
      }
    });

  }
});
