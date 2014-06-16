'use strict';

/**
 * @ngdoc function
 * @name fasyaApp.controller:GaleriCtrl
 * @description
 * # GaleriCtrl
 * Controller of the fasyaApp
 */
angular.module('fasyaApp')
  .controller('GaleriCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
    $timeout(function(){
        var api = jQuery('.megafolio-container').megafoliopro({
            filterChangeAnimation:"rotatescale",
            filterChangeSpeed:600,
            filterChangeRotate:99,
            filterChangeScale:0.6,          
            delay:20,
            paddingHorizontal:10,
            paddingVertical:10,
            layoutarray:[0]
        });

        jQuery(".fancybox").fancybox({
            openEffect  : 'none',
            closeEffect : 'none',
            helpers : {
                media : {}
            }
        });

        jQuery('#galeri .filter').click(function() {            
            api.megafilter(jQuery(this).data('category'));  
            $.waypoints('refresh');
        });

        jQuery('.filter-list li').click(function(){
            $('.filter-list li').each(function() { 
                $(this).removeClass("selected")
            });
            $(this).addClass("selected");
        });
    });
  }]);
