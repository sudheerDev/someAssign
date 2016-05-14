'use strict';

/**
 * @ngdoc overview
 * @name codeAssignApp
 * @description
 * # codeAssignApp
 *
 * Main module of the application.
 */
angular
  .module('codeAssignApp', [
    'ngRoute',
    'vs-repeat'
  ])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'templetes/main.html',
        controller: 'MainCtrl'
      });
  }]);
