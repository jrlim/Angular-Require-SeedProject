/**
 * BASE 컨트롤러
 */
define([
	'app'
], function (ngApp) {
	'use strict';

	ngApp.controller('BaseController', function ($rootScope, $scope, $timeout) {
		//$log.info('BaseController call, ');

		$scope.$on("$routeChangeStart", function (event, current, previous, rejection) {
			//$log.log('BaseController >>> $routeChangeStart', event, current, previous, rejection);
		});

		$scope.$on('$routeChangeSuccess', function() {
			//$log.log('BaseController >>> $routeChangeSuccess');
		});

		/*	초기화	*/
		$scope.$on('$viewContentLoaded', function() {
			//$log.log('BaseController $viewContentLoaded');
		});

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

		$scope.updateData = function(str) {
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
