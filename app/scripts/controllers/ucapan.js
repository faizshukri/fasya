'use strict';

/**
 * @ngdoc function
 * @name fasyaApp.controller:UcapanCtrl
 * @description
 * # UcapanCtrl
 * Controller of the fasyaApp
 */
angular.module('fasyaApp')
  .controller('UcapanCtrl', [ '$scope', '$firebase', '$timeout', function ($scope, $firebase, $timeout) {
    
    $scope.addUcapan = function(){
        $scope.ucapans.$add($scope.newPerson);
        $scope.newPerson = {};
    }

    $scope.submit = function(){
        $scope.newPerson.created = new Date().toISOString();
        $scope.addUcapan();
    }

    $scope.getFormattedDate = function(date){
        // return moment(date).format('MMMM D, YYYY h:mm A');
        return moment(date).fromNow();
    }

    $scope.makeCollection = function(){
        var limitPerPage = 6;
        var ids = $scope.ucapans.$getIndex().reverse();
        $scope.ucapanCollection = {};
        _.each(ids, function(val, i){
            if( typeof( $scope.ucapanCollection[ Math.floor ( i / limitPerPage ) ]) == 'undefined') 
                $scope.ucapanCollection[ Math.floor ( i / limitPerPage ) ] = [];

            $scope.ucapanCollection[ Math.floor ( i / limitPerPage ) ].push( $scope.ucapans.$child(val) );
        });
    }


    $scope.init = function(){
        console.log('init');
        $scope.ucapanInit = false;
        $scope.ucapanRef = new Firebase("https://fasya.firebaseio.com/ucapan");
        $scope.ucapans = $firebase($scope.ucapanRef);
        $scope.newPerson = {};

        $scope.ucapanRef.on('value', function(snapshot){
            $scope.makeCollection();

            angular.element('#slide-ucapan').on('slid.bs.carousel', function () {
                console.log('1');
                if($scope.ucapanInit) window.scrollTo(0,400);
            });

            $timeout(function(){
                $scope.ucapanInit = true;
            });
        });

        $scope.ucapanRef.on('child_added', function(child){
            if($scope.ucapanInit){
                angular.element('#slide-ucapan').carousel(0);
                window.scrollTo(0,400);
            }
        });
    }

    $scope.init();

  }]);
