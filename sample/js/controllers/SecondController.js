/**
 * Second 컨트롤러
 */
define([
	'app'
], function (ngApp) {
	'use strict';

	/**
	 * Second 컨트롤러
	 */
	ngApp.controller('SecondController', function ($rootScope, $scope, $timeout) {
		$scope.viewName = 'SecondController';

		$scope.secondObj = {
			value		: 'second Value'
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
