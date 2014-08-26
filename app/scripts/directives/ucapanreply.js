'use strict';

/**
 * @ngdoc directive
 * @name fasyaApp.directive:ucapanReply
 * @description
 * # ucapanReply
 */
angular.module('fasyaApp')
  .directive('ucapanReply', function () {
    return {
      scope: {
        replies: '=',
        jantina: '=',
        email: '='
      },
      transclude: true,
      templateUrl: 'views/reply.html',
      restrict: 'E',
      link: function(scope, element, attrs){
          scope.getFormattedMessage = function(str){
              str = str.replace(/(?:\r\n|\r|\n)/g, '<br />');
              return str.replace(/(\<br \/\>){2}/g, '<br />');
          }
      }
    };
  });
