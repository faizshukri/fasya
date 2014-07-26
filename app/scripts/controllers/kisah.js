'use strict';

/**
 * @ngdoc function
 * @name fasyaApp.controller:KisahCtrl
 * @description
 * # KisahCtrl
 * Controller of the fasyaApp
 */
angular.module('fasyaApp')
  .controller('KisahCtrl', function ($scope, $timeout) {
    $timeout(function(){
        angular.element('.fancybox').fancybox();

        angular.element('a.fancybox').on('click', function(e){
            e.preventDefault();
        });
    });
  });
