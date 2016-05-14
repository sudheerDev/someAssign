'use strict';

/**
 * @ngdoc function
 * @name codeAssignApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the codeAssignApp
 */
angular.module('codeAssignApp')
  .controller('MainCtrl', ['$scope', 'UserInfoFactory', function ($scope, UserInfoFactory) {

    var index = 0;
    $scope.init = function () {
      $scope.user = {
        'name': ''
      };

      $scope.pageResults = [];
      UserInfoFactory.getJson().then(function (response) {
        $scope.sortedUserInfo = _.sortBy(response, 'created_at');
        $scope.appendResults();
      });
    };

    $scope.appendResults = function () {
      if ($scope.user.name === '') {
        $scope.pageResults = $scope.pageResults.concat($scope.sortedUserInfo[0].slice(index, index + 50));
        console.log($scope.pageResults, $scope.sortedUserInfo);
        index = index + 50;
      }
    };

    $scope.searchChange = function () {
      var searchString = $scope.user.name;
      console.log($scope.user.name === '');
      if ($scope.user.name === '') {
        $scope.pageResults = [];
        index = 0;
        $scope.appendResults();
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
