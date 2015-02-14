/**
 * Busy 컨트롤러. Angular Indicator 예제
 */
define([
	'app',
	'services/CommUtil',
	'factories/CommData'
], function (ngApp) {
	'use strict';

	/**
	 * Busy 컨트롤러
	 */
	ngApp.controller('BusyController', function ($scope, $window, $log, $http) {
		$log.info('BusyController call, ');

		document.title = 'Busy';

		$scope.welcome = {
			message: 'Busy View'
		};

		$scope.delay = 0;
		$scope.minDuration = 0;
		$scope.message = '처리중...';
		$scope.backdrop = true;
		$scope.promise = null;

		$scope.demo = function(){

			$scope.promise = $http.get('http://httpbin.org/delay/3');

		};

	});
});
