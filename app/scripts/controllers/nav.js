'use strict';

/**
 * @ngdoc function
 * @name fasyaApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the fasyaApp
 */
angular.module('fasyaApp')
  .controller('NavCtrl', ['$scope','$location','$timeout',function ($scope, $location, $timeout) {

    $scope.isActive = function(path){
        return $location.path() === path;
    }

    $timeout(function(){
        var menu = angular.element('.navbar');
        menu.find('a').on('click', function(){
            if(menu.find('nav').hasClass('in')) menu.find('nav').collapse('hide');
        });
    });
  }]);
