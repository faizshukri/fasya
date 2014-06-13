'use strict';

describe('Controller: KisahCtrl', function () {

  // load the controller's module
  beforeEach(module('fasyaApp'));

  var KisahCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    KisahCtrl = $controller('KisahCtrl', {
      $scope: scope
    });
  }));

});
