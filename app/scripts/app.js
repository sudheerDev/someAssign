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
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'templetes/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
