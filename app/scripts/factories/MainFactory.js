'use strict';

angular.module('codeAssignApp')
  .factory('UserInfoFactory', ['$http', '$q', function ($http, $q) {
    var userInfo = {};
    var baseURL = 'json';

  userInfo.getJson = function () {
    return $http({
       method: 'GET',
       url: baseURL + '/userInfo.json'
     }).then(function (response) {
       return $q.when(response.data);
     }, function (responseError) {
       console.log('error');
       return $q.reject(responseError);
     });
   };

    return userInfo;
 }]);
