/**
 * CONTACTUS 컨트롤러
 */
define([
	'app'
], function (ngApp) {
	'use strict';

	ngApp.controller('ContactUsController', function ($scope, $log) {
		$log.info('ContactUsController call, ');

		document.title = 'Contact us';

		$scope.welcome = {
			message: 'Contact us View'
		}
	});
});