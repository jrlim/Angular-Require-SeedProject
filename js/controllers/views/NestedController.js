/**
 * Nested 컨트롤러
 */
define([
	'app'
], function (ngApp) {
	'use strict';

	ngApp.controller('NestedController', function ($scope, $log) {
		$log.info('NestedController call, ');

		document.title = 'Nested View';

		$scope.hiMessage = 'hi';

		/** create $scope.template **/
		$scope.template = {
			home	: './partials/views/home.html',
			about	: './partials/views/aboutUs.html',
			contact	: './partials/views/contactUs.html'
		};
	});
});