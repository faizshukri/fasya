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
                $scope.music.played = true;

                angular.element('.player_control').find('a').click(function(e){
                    e.preventDefault();
                    $scope.music.togglePause( $(this) );
                }).html('<i class="glyphicon glyphicon-pause"></i>');

            }, 1000);
        });
    }

    $scope.music.togglePause = function(button){
        if($scope.music.played){
            angular.element('#music')[0].pause();
            $scope.music.lyric.pauseToggle();
            button.html('<i class="glyphicon glyphicon-play"></i>');
        } else {
            angular.element('#music')[0].play();
            $scope.music.lyric.pauseToggle();
            button.html('<i class="glyphicon glyphicon-pause"></i>');
        }
        $scope.music.played = !$scope.music.played;
    }

    $scope.music.loadMusic = function(callback){
        jQuery.ajax('music/lrc/yaro.lrc').done(function(value){
            $scope.music.lyric = new Lrc(value, $scope.music.outputHandler);
            $scope.music.lyric.play();
            if(callback) callback();
        });
    }

    $scope.music.outputHandler = function(line, extra){
        jQuery('.sub_text span').text(line);
    }

    $scope.init = function(){
        $scope.music.play();
    };

    $scope.init();

    

  });
