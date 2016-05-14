'use strict';

angular.module('codeAssignApp').directive('lazyLoadDiv', function () {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var raw = element[0];
      element.bind('scroll', function () {
        if (raw.scrollTop + raw.offsetHeight === raw.scrollHeight) {
          scope.$apply(attrs.scrollDown);
        } else if (raw.scrollTop === 0) {
          scope.$apply(attrs.scrollTop);
        }
      });
    }
  };
});
