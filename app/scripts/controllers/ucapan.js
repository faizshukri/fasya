'use strict';

/**
 * @ngdoc function
 * @name fasyaApp.controller:UcapanCtrl
 * @description
 * # UcapanCtrl
 * Controller of the fasyaApp
 */
angular.module('fasyaApp')
  .controller('UcapanCtrl', [ '$scope', '$firebase', '$timeout', '$modal', function ($scope, $firebase, $timeout, $modal) {
    
    $scope.ucapanUrl = 'https://fasya.firebaseio.com/ucapan';
    
    $scope.addUcapan = function(){
        $scope.ucapans.$add($scope.newPerson);
        $scope.tmpPerson.init = true;
        $scope.newPerson = {};
    }

    $scope.$watch('tmpPerson.instance', function(newValue, oldValue) {
        if($scope.tmpPerson.instance && $scope.tmpPerson.init){
            $scope.sendMail();
            $scope.tmpPerson = {
                instance: false,
                init: false
            };
        }
    });

    $scope.sendMail = function(){
        //Send email 1
        $.ajax({
            url: 'http://mail.fasya.com',
            data: { 
                from: 'Reply To Add Comment <' + $scope.tmpPerson.instance.name().slice(1) + '@fasya.com>',
                to: $scope.tmpPerson.instance.val().name+' <'+$scope.tmpPerson.instance.val().email+'>',
                subject: "Terima kasih di atas ucapan anda di FaSya.com", 
                html: '<p>Terima kasih yang tidak terhingga diucapkan di atas ucapan anda di FaSya.com. </p>'+
                    '<p>Ucapan anda:</p>'+
                    '<blockquote style="margin:0px 0px 0px 0.8ex;border-left-width:1px;border-left-color:rgb(204,204,204);border-left-style:solid;padding-left:1ex" '+
                    'class="gmail_quote"><i>'+$scope.getFormattedMessage($scope.tmpPerson.instance.val().message)+'</i></blockquote>'+
                    '<p>Semoga dengan iringan do\'a daripada kalian membawa keberkatan dan keredhaan daripada Allah SWT. Semoga Allah mempermudah dan memperindahkan perjalanan kalian.</p>'+
                    '<p>Mohon do\'akan agar baitul muslim yang bakal dibina sentiasa di dalam redhaNya, dipenuhi mawaddah dan rahmat Allah hingga dapat bersama-sama di syurgaNya. Allahumma amin.</p>'+
                    '<p>&nbsp;</p>'+
                    '<div>Setulus Ikhlas & penuh rasa kasih kerana Allah,<br />'+
                    '<b>Ahmad Faiz Ahmad Shukri</b> & <b>Syafiyah Adzahar</b></div>'
            },
            type: 'POST',
            dataType: 'json'
        });

        //Send email 2
        var admin = {
            'Faiz Shukri': 'faizshukri90@gmail.com',
            'Syafiyah Adzahar': 'penawar.hati90@gmail.com'
        };

        _.each(admin, function(admin_email, admin_name){
            $.ajax({
                url: 'http://mail.fasya.com',
                data: {
                    from: 'Reply To Add Comment <' + $scope.tmpPerson.instance.name().slice(1) + '@fasya.com>',
                    to: admin_name+' <'+admin_email+'>',
                    subject: 'Ucapan oleh ' + $scope.tmpPerson.instance.val().name + ' di fasya.com', 
                    html: '<p>Sila reply email ini untuk membalas ucapan berikut:</p>'+
                        '<blockquote style="margin:0px 0px 0px 0.8ex;border-left-width:1px;border-left-color:rgb(204,204,204);border-left-style:solid;padding-left:1ex" '+
                        'class="gmail_quote"><i>'+$scope.tmpPerson.instance.val().created + ' <b>' + $scope.tmpPerson.instance.val().name+'</b> &lt;'+$scope.tmpPerson.instance.val().email+'&gt;:<br /><br />'+$scope.getFormattedMessage($scope.tmpPerson.instance.val().message)+'</i></blockquote>'+
                        '<p>&nbsp;</p>'+
                        '<p><small><i>Email ini dijana dengan automatik oleh sistem balas ucapan FaSya.com</i></small></p>'
                },
                type: 'POST',
                dataType: 'json'
            });
        });
    }

    $scope.submit = function(){
        $scope.newPerson.created = new Date().toISOString();
        $scope.addUcapan();
    }

    $scope.getFormattedDate = function(date){
        // return moment(date).format('MMMM D, YYYY h:mm A');
        return moment(date).fromNow();
    }

    $scope.getFormattedMessage = function(str){
        str = str.replace(/(?:\r\n|\r|\n)/g, '<br />');
        return str.replace(/(\<br \/\>){2}/g, '<br />');
    }

    $scope.getObjectLength = function(obj){
        return Object.keys(obj).length;
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

    $scope.openReply = function(ucapanID, jantina){
        $scope.currentReply = {
            replies: $scope.ucapans[ucapanID].replies,
            jantina: jantina,
            email: ucapanID.slice(1)+'@fasya.com'
        };
        
        var modal = $modal({
            show: true,
            template: "views/replies.html",
            scope: $scope
        });
    }


    $scope.init = function(){
        $scope.ucapanInit = false;
        $scope.ucapanRef = new Firebase($scope.ucapanUrl);
        $scope.ucapans = $firebase($scope.ucapanRef);
        $scope.newPerson = {
            jantina: 'lelaki'
        };

        $scope.tmpPerson = { 
            instance: false,
            init: false
        };

        $scope.ucapanRef.on('value', function(snapshot){
            $scope.makeCollection();

            angular.element('#slide-ucapan').on('slid.bs.carousel', function () {
                if($scope.ucapanInit) window.scrollTo(0,400);
            });

            $timeout(function(){
                $scope.ucapanInit = true;
                angular.element('.groupucapan > div > p').emoticonize();
            });
        });

        $scope.ucapanRef.on('child_added', function(child){
            if($scope.ucapanInit){
                angular.element('#slide-ucapan').carousel(0);
                window.scrollTo(0,400);

                if(!$scope.tmpPerson.instance) $scope.tmpPerson.instance = child;
            }
        });
    }

    $scope.init();

  }]);
