'use strict';

/* Directives */
angular.module('taskDirectives', []).directive("uiJq", function() {
  return function(scope, elm, attrs) {
    if (attrs.uiOptions) {
      elm[attrs.uiJq](scope.$eval(attrs.uiOptions));
    } else {
      elm[attrs.uiJq]();
    }
    if (attrs.ngModel) {
      scope.$watch(attrs.ngModel, function(newVal, oldVal){
        elm.datetimepicker("setDate", newVal);
      });
    }
  }
});
