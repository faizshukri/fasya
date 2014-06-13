'use strict';

describe('Controller: UcapanCtrl', function () {

  // load the controller's module
  beforeEach(module('fasyaApp'));

  var UcapanCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UcapanCtrl = $controller('UcapanCtrl', {
      $scope: scope
    });
  }));

});
