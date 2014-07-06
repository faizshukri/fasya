'use strict';

describe('Filter: reverse', function () {

  // load the filter's module
  beforeEach(module('fasyaApp'));

  // initialize a new instance of the filter before each test
  var reverse;
  beforeEach(inject(function ($filter) {
    reverse = $filter('reverse');
  }));


});
