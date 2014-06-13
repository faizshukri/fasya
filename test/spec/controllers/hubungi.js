'use strict';

describe('Controller: HubungiCtrl', function () {

  // load the controller's module
  beforeEach(module('fasyaApp'));

  var HubungiCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HubungiCtrl = $controller('HubungiCtrl', {
      $scope: scope
    });
  }));
  
});
