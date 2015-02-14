/**
 * 시스템 다이얼로그 Modal Instance 컨트롤러
 */
define([
	'app'
], function (ngApp) {
	'use strict';

	/*	ModalInstanceController Modal Instance	*/
	ngApp.controller('ModalInstanceController', function ($scope, $modalInstance, items) {

		$scope.items = items;
		$scope.selected = {
			item: $scope.items[0]
		};

		$scope.ok = function () {
			$modalInstance.close($scope.selected.item);
		};

		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};

	});

	/*	Alert System Message Modal Instance	*/
	ngApp.controller('AlertModalController', function ($scope, $modalInstance, items) {

		$scope.items = items;
		$scope.selected = {
			item: $scope.items[0]
		};

		$scope.ok = function () {
			$modalInstance.close($scope.selected.item);
		};

		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};

	});

});