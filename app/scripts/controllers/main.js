'use strict';

/**
 * @ngdoc function
 * @name fasyaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fasyaApp
 */
angular.module('fasyaApp')
  .controller('MainCtrl', function ($scope, $timeout, $modal) {

    $scope.music = {
        played: false,
        started: false,
        lyc_init: false,
        button: angular.element('.player_control').find('a'),
        mp3_element: angular.element('#music'),
        tracks: [
            'youaretheone',
            'thisring'
        ],
        nowplaying: 0
    };

    $scope.music.play = function(){
        $scope.music.loadLyric(function(){
            $timeout(function(){
                $scope.music.mp3_element[0].play();
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
            $scope.music.mp3_element[0].pause();
            $scope.music.lyric.pauseToggle();
            $scope.music.played = false;
            angular.element('.sub_text').fadeOut();
            $scope.music.button.html('<i class="glyphicon glyphicon-play"></i>');

        // Paused, wanna play
        } else {
            $scope.music.mp3_element[0].play();
            if( $scope.music.lyc_init ) $scope.music.lyric.pauseToggle();
            else $scope.music.lyc_init = true;
            $scope.music.played = true;
            angular.element('.sub_text').fadeIn();
            $scope.music.button.html('<i class="glyphicon glyphicon-pause"></i>');
        }
    }

    $scope.music.loadLyric = function(callback){
        jQuery.ajax('music/lrc/'+$scope.music.tracks[ $scope.music.nowplaying ]+'.lrc').done(function(value){
            $scope.music.lyric = new Lrc(value, $scope.music.outputHandler);
            $scope.music.lyric.play();
            if(callback) callback();
        });
    }

    $scope.music.outputHandler = function(line, extra){
        angular.element('.sub_text span').text(line);
    }

    $scope.music.preload = function(){
        $scope.music.mp3_element.find('source').attr('src', 'music/mp3/'+$scope.music.tracks[ $scope.music.nowplaying ]+'.mp3');
        $scope.music.mp3_element[0].pause();
        $scope.music.mp3_element[0].load();
    }

    $scope.init = function(){

        $scope.music.preload();

        // Make audio buffer as fast as it can 
        $scope.music.mp3_element[0].play();
        $scope.music.mp3_element[0].pause();

        $scope.music.button.click(function(e){
            e.preventDefault();
            $scope.music.toggle();
        });

        var modal = $modal({
            show: true,
            title: 'Pemberitahuan',
            content: "Website ini akan memainkan lagu/nasyid secara automatik beserta dengan lirik. "+
                     "Anda boleh pause pada bila-bila masa dengan mengklik pada butang \"Pause\" di sebelah kiri anda",
            backdrop: "static",
            keyboard: false,
            placement: 'center',
            prefixEvent: 'modal'
        });
        
        modal.$promise.then(function(){
            modal.$scope.$on('modal.hide', function(){
                $scope.music.toggle();
            });
        });

        $scope.music.mp3_element.on('ended', function(){
            $scope.music.button.html('<i class="glyphicon glyphicon-play"></i>');
            $scope.music.played = false;
            $scope.music.started = false;
            $scope.music.lyc_init = false;
            $scope.music.lyric.stop();
            $scope.music.nowplaying = ($scope.music.nowplaying + 1) % $scope.music.tracks.length;
            $scope.music.preload();
            $scope.music.toggle();
            console.log('finish play');
        });
    };

    $scope.init();

    

  });
