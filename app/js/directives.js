'use strict';

/* Directives */
var directives = angular.module('taskDirectives', []);

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
