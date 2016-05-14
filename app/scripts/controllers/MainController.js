'use strict';

/**
 * @ngdoc function
 * @name codeAssignApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the codeAssignApp
 */
angular.module('codeAssignApp')
  .controller('MainCtrl', ['$scope', 'UserInfoFactory', '$timeout', function ($scope, UserInfoFactory, $timeout) {

    $scope.pageIndex = 0;
    $scope.init = function () {
      $scope.user = {
        'name': ''
      };

      $scope.pageResults = [];
      UserInfoFactory.getJson().then(function (response) {
        $scope.sortedUserInfo = _.sortBy(response, 'created_at');
        $scope.noOfPages = Math.ceil($scope.sortedUserInfo[0].length / 50);
        $scope.computeResults({add: true});
      });
    };

    $scope.computeResults = function (params) {
      var startIndex;

      if ($scope.user.name === '' && !($scope.pageIndex === 1 && params.sub)) {
        if (params.add) {
          $scope.pageIndex = $scope.pageIndex + 1;
        } else {
          $scope.pageIndex = $scope.pageIndex - 1;
        }

        startIndex = ($scope.pageIndex - 1) * 50;
        $scope.loadingResults = true;

        $timeout(function () {
          $scope.pageResults = $scope.sortedUserInfo[0].slice(startIndex, startIndex + 50);
          $scope.loadingResults = false;
        }, 1000);

      }
    };


    $scope.searchChange = function () {
      var searchString = $scope.user.name;
      if ($scope.user.name === '') {
        $scope.pageResults = [];
        $scope.pageIndex = $scope.pageIndex - 1;
        $scope.computeResults({add: true});
      } else {
        $scope.pageResults = _.filter($scope.sortedUserInfo[0], function(user){
          if ( !_.isUndefined(user.name) && user.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1) {
            return user;
          }
        });
      }
    };

    $scope.init();
  }]);
