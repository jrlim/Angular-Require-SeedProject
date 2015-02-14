/**
 * 중첩 컨트롤러
 */
define([
	'app'
], function (ngApp) {
	'use strict';

	/**
	 * Nested 컨트롤러
	 */
	ngApp.controller('NestedController', function ($rootScope, $scope, $location) {
		$scope.viewName = 'NestedController';

		$scope.viewList = [
			{id: 'view01', name: 'FirstView',	path: './partials/first.html'},
			{id: 'view02', name: 'SecondView',	path: './partials/second.html'}
		];

	});

});
