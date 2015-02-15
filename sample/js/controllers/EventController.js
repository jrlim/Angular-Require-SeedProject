/**
 * Event 컨트롤러
 */
define([
	'app'
], function (ngApp) {
	'use strict';

	/**
	 * Event 컨트롤러
	 */
	ngApp.controller('EventController', function ($rootScope, $scope, $timeout) {
		$scope.viewName = 'EventController';

		$scope.count = 0;
		$scope.$on('MyEvent', function() {
			$scope.count++;
		});
	});

});
