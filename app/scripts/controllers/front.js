'use strict';

/**
 * @ngdoc function
 * @name fasyaApp.controller:FrontCtrl
 * @description
 * # FrontCtrl
 * Controller of the fasyaApp
 */
angular.module('fasyaApp')
  .controller('FrontCtrl', function ($scope) {
    $scope.init = function(){
        // waypoint to the slider names
        $('.navbar').waypoint(function(){
            $('.names').removeClass('hide');
            $('.names').addClass('animated fadeInUp');
        }, { offset: 60 });
    }

    $scope.init();
  });
