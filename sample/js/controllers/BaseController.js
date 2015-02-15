/**
 * BASE 컨트롤러
 */
define([
	'app'
], function (ngApp) {
	'use strict';

	ngApp.controller('BaseController', function ($rootScope, $scope, $timeout) {
		//$log.info('BaseController call, ');

		/**
		 * $rootScope 초기화
		 */
		$rootScope.isLoggedIn	= false;

		$rootScope.commObj = {
			value : 'common Value'
		};


		$scope.viewName = 'BaseController';

		$scope.baseObj = {
			greeting	: 'Hello World'
		};

		$scope.updateData = function(event, str) {
			$scope.$broadcast('updateBroadCast', function(viewName) {
				$timeout(function() {
					alert(viewName + '  ' +  str);
				}, 500)
			});
		};

		$scope.$on('updateEmit', function(event, value) {
			$timeout(function() {
				alert($scope.viewName + ' : ' + value);
			}, 500)
		});

	});
});
