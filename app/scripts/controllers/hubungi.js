'use strict';

/**
 * @ngdoc function
 * @name fasyaApp.controller:HubungiCtrl
 * @description
 * # HubungiCtrl
 * Controller of the fasyaApp
 */
angular.module('fasyaApp')
  .controller('HubungiCtrl', function ($scope, $timeout) {

    $scope.contact = {};

    $scope.send = false;

    angular.element('#sendMessage').on('click', function(e){

        e.preventDefault();

        $scope.send = true;

        if($scope.hubungiForm.$invalid){
            angular.element('input.ng-invalid, textarea.ng-invalid').first().focus();
            $scope.$apply();
            return;
        }

        var subject = '[Fasya] ';

        if($scope.contact.kad_kenduri){
            subject += 'Kad Kenduri, ';
        }

        if($scope.contact.soalan){
            subject += 'Soalan, ';
        }

        subject += 'mesej daripada '+$scope.contact.name;
        $.ajax({
            url: 'http://mail.fasya.com',
            data: { 
                from: $scope.contact.name + ' <' + $scope.contact.email + '>',
                to: 'Faiz Shukri <ukhwahfillah90@gmail.com>, Syafiyah Adzahar <penawar.hati90@gmail.com>', 
                subject: subject, 
                text: $scope.contact.message 
            },
            type: 'POST',
            dataType: 'json',
            beforeSend: function(){
                $('#sendStatus').text('sending..').fadeIn();
            }
        }).done(function(data){
            $('#sendStatus').text('your message is successfully sent ');
            $timeout(function(){
                $('#sendStatus').fadeOut();
            }, 2000);
            $('input,textarea').val('');
            $('input[type=checkbox]').attr('checked', false)
            $scope.send = true;
        });
    });

  });
