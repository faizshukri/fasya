'use strict';

/**
 * @ngdoc filter
 * @name fasyaApp.filter:reverse
 * @function
 * @description
 * # reverse
 * Filter in the fasyaApp.
 */
angular.module('fasyaApp')
  .filter('reverse', function() {
      function toArray(list) {
         var k, out = [];
         if( list ) {
            if( angular.isArray(list) ) {
               out = list;
            }
            else if( typeof(list) === 'object' ) {
               for (k in list) {
                  if (list.hasOwnProperty(k)) { out.push(list[k]); }
               }
            }
         }
         return out;
      }
      return function(items) {
         return toArray(items).slice().reverse();
      };
   });
