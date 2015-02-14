/**
 * Compare 컨트롤러, MDI 및 라우트 컨트롤러 비교
 */
define([
	'app',
	'services/CommUtil',
	'factories/CommData'
], function (ngApp) {
	'use strict';

	/**
	 * 컴페어 컨트롤러
	 */
	ngApp.controller('CompareController', function ($scope, $routeParams, $log) {
		$log.info('CompareController call, ');

		//alert(JSON.stringify($routeParams));

		document.title = 'Compare';

		$scope.welcome = {
			message: 'Compare View'
		};

		$scope.isSelectedTab = 1;

		$scope.selectTab = function(tabNo) {
			$scope.isSelectedTab = tabNo;
		};

		/**
		 * MDI Nav bar에 동적으로 현재 view를 추가
		 * @param viewNo
		 */
		$scope.setMdiValue = function($event, id) {
			console.log($event, id);
			//$scope.broadcast('setMdiNavBar', id); //angular.js
			$('.contents-area').trigger('setMdiNavBar', id); //jquery
		};

	});
});