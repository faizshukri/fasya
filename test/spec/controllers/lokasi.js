'use strict';

describe('Controller: LokasiCtrl', function () {

  // load the controller's module
  beforeEach(module('fasyaApp'));

  var LokasiCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LokasiCtrl = $controller('LokasiCtrl', {
      $scope: scope
    });
  }));

});
