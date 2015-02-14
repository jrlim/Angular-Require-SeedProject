/**
 * Test View 컨트롤러
 */
define([
	'app',
	'controllers/views/ModalInstanceController'
], function (ngApp) {
	'use strict';

	ngApp.controller('ModalController', function ($scope, $log, $modal) {
		$log.info('ModalController call, ');

		$scope.welcome = {
			message: 'Modal View'
		};

		/*	angularStrap modal test*/
		$scope.modal = {title: 'Title', content: 'Hello Modal<br />This is a multiline message!'};

		/* Modal 테스트 코드	*/
		$scope.items = ['item1', 'item2', 'item3'];

		$scope.open = function (size) {
			var modalInstance = $modal.open({
				templateUrl: 'myModalContent.html',
				controller: 'ModalInstanceController',
				size: size,
				resolve: {
					items: function () {
						return $scope.items;
					}
				}
			});

			modalInstance.result.then(function (selectedItem) {
				$scope.selected = selectedItem;
			}, function () {
				$log.info('Modal dismissed at: ' + new Date());
			});
		};

	});
});