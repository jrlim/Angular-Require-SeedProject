/**
 * Modal Instance 컨트롤러
 */
define([
	'app',
	'services/views/CustService'
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

	/*	PersonModalInstanceCtrl Modal Instance	*/
	ngApp.controller('PersonModalInstanceCtrl', function($scope, $http, $modalInstance, $log, person) {
		if (person === null) {
			$scope.title = 'New Person';
			$scope.person = {};
		} else {
			$scope.title = 'Edit Person';
			$log.log('Edit: ', person);
			$scope.person = person;
		}

		$scope.submit = function() {
			$log.log('Edit: submit person: ' + JSON.stringify($scope.person));
			$modalInstance.close($scope.person);
		};

		$scope.cancel = function() {
			$modalInstance.dismiss();
		};
	});

	/*	CustEditModalInstanceCtrl Modal Instance	*/
	ngApp.controller('CustEditModalInstanceCtrl', function($scope, $http, $modalInstance, $log, CustService, person) {
		$log.log('CustEditModalInstanceCtrl Call, ', CustService);

		$scope.isNew = false;

		if (!isNull(person.isNew) && person.isNew === true) {
			$scope.title = '사용자 등록';
			$scope.person = {};
			$scope.isNew = true;
		} else {
			$scope.title = '사용자 수정';
			$log.log('사용자 수정 : ', person);
			$scope.person = person;
		}

		$scope.submit = function() {
			$log.log('Edit: submit person: ' + JSON.stringify($scope.person));

			if ($scope.isNew == true) {
				CustService.userMngCreateAction($scope.person);
			} else {
				CustService.userMngEditAction($scope.person);
			}

			$modalInstance.close($scope.person);
		};

		$scope.cancel = function() {
			$modalInstance.dismiss();
		};
	});

});