/**
 * Cust 사용자 컨트롤러
 */
define([
	'jquery',
	'underscore',
	'app',
	'services/CommUtil',
	'services/views/CustService'
], function ($, _, ngApp) {
	'use strict';

	/*	Cust 공통 데이터	*/
	ngApp.factory('CustData', function() {
		/*	현재 조회된 사용자 정보	*/
		var CustData = {};

		CustData.currentUser = {};

		return CustData;
	});


	/*	Cust 리스트 컨트롤러	*/
	ngApp.controller('CustListController', function ($scope, $log, $http, $modal, $timeout, CustService, CommUtil, CommData) {
		$log.info('CustListController call, ');

		document.title = 'Customer';

		/*	Grid External $scope Binding	*/
		$scope.$scope = $scope;

		$scope.items = [];

		/*	filter	*/
		$scope.filterOptions = {
			filterText: "",
			useExternalFilter: true
		};

		var editButtonTpl = [
			'<div class="container">'
			, '<button class="btn btn-default btn-xs" data-toggle="tooltip" title="Edit" ng-click="getExternalScopes().edit(row); getExternalScopes().tempEdit()">'
			, '<span class="glyphicon glyphicon-pencil"></span>'
			, '</button></div>'
		].join('');

		/*	grid exp1	*/
		$scope.gridOptions = {
			enableRowSelection: true,
			enableFiltering: true,
			useExternalFiltering: true,
			enablePaging: true,
			//enablePinning: true,
			paginationPageSizes: [10, 20, 50],
			paginationPageSize: 10,
			filterOptions: $scope.filterOptions,
			keepLastSelected: true,
			multiSelect: false,
			showColumnMenu: true,
			showFilter: true,
			showGroupPanel: false,
			showFooter: false,
//			totalServerItems: "totalServerItems",
			i18n: "en",
			columnDefs: [
//				{ field: 'rNum',		displayName: '번호',		enableFiltering: false, enableColumnResizing: true },
				{ field: 'userId',		displayName: '아이디',	enableFiltering: false },
				{ field: 'userName',	displayName: '이름',		enableFiltering: false },
				{ field: 'hpNumber',	displayName: '연락처',	enableFiltering: false, enableColumnResizing: true },
				{ field: 'address',		displayName: '주소',		enableFiltering: false, enableColumnResizing: true },
				{ field: 'company',		displayName: '회사',		enableFiltering: false, enableColumnResizing: true },
				{ field: 'edit',		displayName: '수정',		enableFiltering: false, cellTemplate: editButtonTpl }
			],
			onRegisterApi: function( gridApi ) {
				$scope.gridApi = gridApi;
				$scope.gridApi.core.on.filterChanged( $scope, function() {
//					var grid = this.grid;
//					$http.get('http://ui-grid.info/data/100_male.json')
//						.success(function(data) {
//							$scope.gridOptions.data = data;
//						});
				});
			}
		};

		//$scope.gridOptions.data = CommData.GridTemp.UserList;
		//$scope.gridOptions.data = CommData.userListMock;

		/*	사용자 수정 Modal	*/
		$scope.edit = function(row) {
			var editModalInstance = $modal.open({
				templateUrl: './partials/views/cust/custEdit.html',
				backdrop: true,
				windowClass: 'modal',
				controller: 'CustEditModalInstanceCtrl',
				resolve: {
					person: function() {
						return angular.copy(row.entity);
					}
				}
			});
			editModalInstance.result.then(function(person) {
					/*	submit() 완료 후, row.entity를 저장한 값으로 변경	*/
					$log.log('Edited person: ' + JSON.stringify(person));
					row.entity = person;
				}, function() {});
		};

		/*	사용자 등록 Modal Open	*/
		$scope.openModal = function (size) {
			var createModalInstance = $modal.open({
				templateUrl: './partials/views/cust/custEdit.html',
				backdrop: true,
				windowClass: 'modal',
				controller: 'CustEditModalInstanceCtrl',
				size: size,
				resolve: {
					person: function () {
						var person = {userId:'', userName: '', address:'', hpNumber:'', company:'', isNew: true};
						return person;
					}
				}
			});
			createModalInstance.result.then(function (person) {
				$log.log('Create person: ' + JSON.stringify(person));

				CustService.userMngList($scope);

			}, function () {
				$log.info('Modal dismissed at: ' + new Date());
			});
		};

		/*	데이터 초기화	*/
		$scope.userList = [];
		$scope.cust		= {message: 'welcome cust list'};

		/*	사용자 리스트 조회	*/
		$scope.getUserList = function() {
			CustService.userMngList($scope);
		};

		$scope.getUserList();

	});

});