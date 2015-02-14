/**
 * First 컨트롤러
 */
define([
	'app'
], function (ngApp) {
	'use strict';

	/**
	 * First 컨트롤러
	 */
	ngApp.controller('FirstController', function ($rootScope, $scope, $timeout) {
		$scope.viewName = 'FirstController';

		$scope.firstObj = {
			value		: 'first Value'
		};

		$scope.$on('updateBroadCast', function(event, callback) {
			callback($scope.viewName);
		});

		$scope.testEmit = function() {
			$scope.$emit('updateEmit', $scope.viewName);
		};

		$scope.$on('updateEmit', function(event, value) {
			$timeout(function() {
				alert($scope.viewName + ' : ' + value);
			}, 500)
		});

	});

});
