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
        elem_button: angular.element('.player_control').find('a'),
        elem_mp3: angular.element('#music'),
        elem_sub: angular.element('.sub_text span'),
        tracks: [
            'youaretheone',
            'thisring'
        ],
        track_no: 0,
        lyric_line: 0,
        isPlay: false
    };

    $scope.music.loadLyric = function(callback){
        jQuery.ajax('music/lrc/'+$scope.music.tracks[ $scope.music.track_no ]+'.lrc').done(function(value){
            $scope.music.lyric = new Lrc(value);
            $scope.music.elem_sub.text($scope.music.lyric.tags.artist +' - '+ $scope.music.lyric.tags.title);
            // $scope.music.lyric.play();
            if(callback) callback();
        });
    }

    $scope.music.loadMusic = function(){
        $scope.music.elem_mp3.find('source').attr('src', 'music/mp3/'+$scope.music.tracks[ $scope.music.track_no ]+'.mp3');
        $scope.music.elem_mp3[0].pause();
        $scope.music.elem_mp3[0].load();
    }

    $scope.music.togglePlay = function(){
        if($scope.music.isPlay) $scope.music.elem_mp3[0].pause();
        else $scope.music.elem_mp3[0].play();
    }

    $scope.init = function(){
        $scope.music.loadLyric();
        $scope.music.loadMusic();

        $scope.music.elem_button.click(function(e){
            e.preventDefault();
            $scope.music.togglePlay();
        });

        $scope.music.elem_mp3.on('play', function(e){
            angular.element('.sub_text').fadeIn();
            $scope.music.elem_button.html('<i class="glyphicon glyphicon-pause"></i>');
            $scope.music.isPlay = true;
        });
        $scope.music.elem_mp3.on('pause', function(e){
            angular.element('.sub_text').fadeOut();
            $scope.music.elem_button.html('<i class="glyphicon glyphicon-play"></i>');
            $scope.music.isPlay = false;
        });
        $scope.music.elem_mp3.on('timeupdate', function(e){
            var musictime = parseInt(this.currentTime.toFixed(3).split('.').join(''));
            var subtime = $scope.music.lyric.lines[ $scope.music.lyric_line ];

            if(subtime && musictime >= subtime.time - 1000){
                $scope.music.elem_sub.text(subtime.txt);
                $scope.music.lyric_line++;
                while( $scope.music.lyric_line < ( $scope.music.lyric.lines.length - 1) && $scope.music.lyric.lines[$scope.music.lyric_line + 1].time < musictime){
                    $scope.music.lyric_line++;
                }
            }
        });

        $scope.music.elem_mp3.on('ended', function(){
            $scope.music.isPlay = false;
            $scope.music.lyric_line = 0;
            $scope.music.track_no = ( $scope.music.track_no + 1 ) % $scope.music.tracks.length;
            $scope.music.loadLyric();
            $scope.music.loadMusic();
            $scope.music.togglePlay();
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
                $scope.music.togglePlay();
            });
        });
    }

    $scope.init();

  });
