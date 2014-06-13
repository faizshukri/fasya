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
    'ngAnimate'
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
  .run(['$rootScope', function($rootScope){
    $rootScope.$on('$locationChangeStart', function(event, next, current){
      window.scrollTo(0,0);
    });
  }]);