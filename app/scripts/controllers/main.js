'use strict';

/**
 * @ngdoc function
 * @name fasyaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fasyaApp
 */
angular.module('fasyaApp')
  .controller('MainCtrl', function ($scope, $timeout) {

    $scope.music = {};

    $scope.music.play = function(){
        $scope.music.loadMusic(function(){
            $timeout(function(){
                angular.element('#music')[0].play();
            }, 1000);
        });
    }

    $scope.music.pause = function(){

    }

    $scope.music.loadMusic = function(callback){
        jQuery.ajax('music/lrc/yaro.lrc').done(function(value){
            var lrc = new Lrc(value, $scope.music.outputHandler);
            lrc.play();
            if(callback) callback();
        });
    }

    $scope.music.outputHandler = function(line, extra){
        jQuery('.sub_text span').text(line);
        console.log(line);
        console.log(extra);
    }

    $scope.init = function(){
        $scope.music.play();
    };

    $scope.init();

    

  });
