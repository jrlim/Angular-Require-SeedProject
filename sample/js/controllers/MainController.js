/**
 * Main 컨트롤러
 */
define([
	'app'
], function (ngApp) {
	'use strict';

	/**
	 * Main 컨트롤러
	 */
	ngApp.controller('MainController', function ($rootScope, $scope, $location) {
		$scope.viewName = 'MainController';
		$scope.changeRoute = function(sharpUrl) {
			$location.path(sharpUrl);
			return false;
		};

	});

});
