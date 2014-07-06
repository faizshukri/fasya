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
    'ngRoute',
    'angular-loading-bar',
    'ngAnimate',
    'ui.gravatar',
    'firebase'
  ])
  .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/galeri', {
        templateUrl: 'views/galeri.html',
        controller: 'GaleriCtrl'
      })
      .when('/kisah', {
        templateUrl: 'views/kisah.html',
        controller: 'KisahCtrl'
      })
      .when('/lokasi', {
        templateUrl: 'views/lokasi.html',
        controller: 'LokasiCtrl'
      })
      .when('/ucapan', {
        templateUrl: 'views/ucapan.html',
        controller: 'UcapanCtrl'
      })
      .when('/hubungi', {
        templateUrl: 'views/hubungi.html',
        controller: 'HubungiCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

      $locationProvider.html5Mode(true);
  }])
  .run(['$rootScope','$window', '$location', function($rootScope, $window, $location){
    $rootScope.$on('$routeChangeSuccess', function(event, next, current){
      $window.scrollTo(0,0);
      $window.ga('send', 'pageview', $location.path());
    });
  }]);