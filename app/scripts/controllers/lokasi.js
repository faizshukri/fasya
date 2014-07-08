'use strict';

/**
 * @ngdoc function
 * @name fasyaApp.controller:LokasiCtrl
 * @description
 * # LokasiCtrl
 * Controller of the fasyaApp
 */
angular.module('fasyaApp')
  .controller('LokasiCtrl', function ($scope) {

    $scope.init = function(){
        angular.element('#lokasi').delegate('.nav-tabs', 'click', function(e){
            e.preventDefault();
        });

        angular.element('.origin a[data-toggle="tab"]').on('shown.bs.tab', function(e){
            var iframe = $( $(e.target).attr('href') ).find('iframe');
            var src = iframe.attr('src');
            var style = iframe.attr('style');
            iframe.parent().html('<iframe src="'+src+'" style="'+style+'" frameborder="0"></iframe>');
        });
    }

    $scope.init();
  });
