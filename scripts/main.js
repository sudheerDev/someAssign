"use strict";angular.module("codeAssignApp",["ngRoute","vs-repeat"]).config(["$routeProvider",function(e){e.when("/",{templateUrl:"templetes/main.html",controller:"MainCtrl"})}]),angular.module("codeAssignApp").controller("MainCtrl",["$scope","UserInfoFactory","$timeout",function(e,n,t){e.pageIndex=0,e.init=function(){e.user={name:""},e.pageResults=[],n.getJson().then(function(n){e.sortedUserInfo=_.sortBy(n,"created_at"),e.noOfPages=Math.ceil(e.sortedUserInfo[0].length/50),e.computeResults({add:!0})})},e.computeResults=function(n){var o;""!==e.user.name||1===e.pageIndex&&n.sub||(n.add?e.pageIndex=e.pageIndex+1:e.pageIndex=e.pageIndex-1,o=50*(e.pageIndex-1),e.loadingResults=!0,t(function(){e.pageResults=e.sortedUserInfo[0].slice(o,o+50),e.loadingResults=!1},1e3))},e.searchChange=function(){var n=e.user.name;""===e.user.name?(e.pageResults=[],e.pageIndex=e.pageIndex-1,e.computeResults({add:!0})):e.pageResults=_.filter(e.sortedUserInfo[0],function(e){return _.isUndefined(e.name)||-1===e.name.toLowerCase().indexOf(n.toLowerCase())?void 0:e})},e.init()}]),angular.module("codeAssignApp").factory("UserInfoFactory",["$http","$q",function(e,n){var t={},o="json";return t.getJson=function(){return e({method:"GET",url:o+"/userInfo.json"}).then(function(e){return n.when(e.data)},function(e){return console.log("error"),n.reject(e)})},t}]),angular.module("codeAssignApp").directive("lazyLoadDiv",function(){return{restrict:"A",link:function(e,n,t){var o=n[0];n.bind("scroll",function(){o.scrollTop+o.offsetHeight===o.scrollHeight?e.$apply(t.scrollDown):0===o.scrollTop&&e.$apply(t.scrollTop)})}}});