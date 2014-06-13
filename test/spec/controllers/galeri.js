'use strict';

describe('Controller: GaleriCtrl', function () {

  // load the controller's module
  beforeEach(module('fasyaApp'));

  var GaleriCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GaleriCtrl = $controller('GaleriCtrl', {
      $scope: scope
    });
  }));
  
});
