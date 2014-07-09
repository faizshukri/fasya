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

    $scope.music = {
        played: false,
        started: false,
        lyc_init: false,
        button: angular.element('.player_control').find('a')
    };

    $scope.music.play = function(){
        $scope.music.loadLyric(function(){
            $timeout(function(){
                angular.element('#music')[0].play();
                if(!$scope.music.started){
                    $scope.music.started = true;
                    $scope.music.toggle();
                }
            }, 1000);
            angular.element('.sub_text').fadeIn();
        });
    }

    $scope.music.toggle = function(){

        // Not started yet
        if(!$scope.music.started){
            $scope.music.play();

        // Played, wanna pause
        } else if( $scope.music.played ){
            angular.element('#music')[0].pause();
            $scope.music.lyric.pauseToggle();
            $scope.music.played = false;
            angular.element('.sub_text').fadeOut();
            $scope.music.button.html('<i class="glyphicon glyphicon-play"></i>');

        // Paused, wanna play
        } else {
            angular.element('#music')[0].play();
            if( $scope.music.lyc_init ) $scope.music.lyric.pauseToggle();
            else $scope.music.lyc_init = true;
            $scope.music.played = true;
            angular.element('.sub_text').fadeIn();
            $scope.music.button.html('<i class="glyphicon glyphicon-pause"></i>');
        }
    }

    $scope.music.loadLyric = function(callback){
        jQuery.ajax('music/lrc/yaro.lrc').done(function(value){
            $scope.music.lyric = new Lrc(value, $scope.music.outputHandler);
            $scope.music.lyric.play();
            if(callback) callback();
        });
    }

    $scope.music.outputHandler = function(line, extra){
        angular.element('.sub_text span').text(line);
    }

    $scope.init = function(){
        $scope.music.button.click(function(e){
            e.preventDefault();
            $scope.music.toggle();
        });
    };

    $scope.init();

    

  });
