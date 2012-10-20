'use strict';

describe('Controller: appCtrl', function() {

  // load the controller's module
  beforeEach(module('fieldEditorsApp'));

  var appCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller) {
    scope = {};
    appCtrl = $controller('appCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of tasks to the scope', function() {
    expect(scope.tasks.length).toBe(1);
  });
});
