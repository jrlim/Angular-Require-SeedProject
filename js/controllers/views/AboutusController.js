/**
 *	ABOUTUS 컨트롤러
 */
define([
	'app'
], function (ngApp) {
	'use strict';

	ngApp.controller('AboutUsController', function ($scope, $log, $http) {
		$log.info('AboutUsController call, ');

		document.title = 'About us';

		$scope.welcome = {
			message: 'About us View'
		};

		$scope.jsonData = {};

		$scope.btnGetJsonData = function() {
			$http({
				url : 'http://www.corsproxy.com/muslimsalat.com/dhaka/monthly.json',
				//url : 'http://gzon.org/api/getOrganInfo',
				method : "GET"
			}).then(function(response){
				$scope.jsonData=response.data;
			});
		};

	});

});