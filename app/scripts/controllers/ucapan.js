'use strict';

/**
 * @ngdoc function
 * @name fasyaApp.controller:UcapanCtrl
 * @description
 * # UcapanCtrl
 * Controller of the fasyaApp
 */
angular.module('fasyaApp')
  .controller('UcapanCtrl', [ '$scope', '$firebase', function ($scope, $firebase) {
    var ucapanRef = new Firebase("https://fasya.firebaseio.com/ucapan");
    var ucapanInit = false;


    $scope.ucapans = $firebase(ucapanRef);

    $scope.newPerson = {};

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

    ucapanRef.on('value', function(snapshot){
        $scope.makeCollection();

        angular.element('#slide-ucapan').on('slid.bs.carousel', function () {
            if(ucapanInit) window.scrollTo(0,400);
        });

        ucapanInit = true;
    });

    ucapanRef.on('child_added', function(child){
        if(ucapanInit){
            angular.element('#slide-ucapan').carousel(0);
            window.scrollTo(0,400);
        }
    });

  }]);
