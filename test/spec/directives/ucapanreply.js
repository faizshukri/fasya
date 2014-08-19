'use strict';

describe('Directive: ucapanReply', function () {

  // load the directive's module
  beforeEach(module('fasyaApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ucapan-reply></ucapan-reply>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the ucapanReply directive');
  }));
});
