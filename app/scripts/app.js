'use strict';

/**
 * @ngdoc overview
 * @name fasyaApp
 * @description
 * # fasyaApp
 *
 * Main module of the application.
 */
angular
  .module('fasyaApp', [
    'ngAnimate',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
