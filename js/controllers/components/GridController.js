/**
 * GRID 컨트롤러
 */
define([
	'app',
	'services/CommUtil',
	'factories/CommData'
], function (ngApp) {
	'use strict';

	/* 그리드 서비스 */
	ngApp.service('GridService', function($window, $location, $log, CommUtil){
		$log.info('GridService call');

		var GridService = {};

		return GridService;
	});

	/*	그리드 컨트롤러	*/
	ngApp.controller('GridController', function ($scope, $log, $modal, GridService, CommData, CommUtil) {
		$log.info('GridController call, ');

		document.title = 'Grid';

		$scope.welcome = {
			message: 'Grid View'
		};

		$scope.selectedItem = {};

		/*	그리드 1번 설정		*/
		$scope.gridOptions1 = {
			enableRowSelection: true,
			enableRowHeaderSelection: false,
			keepLastSelected: true,
			multiSelect: false,
			enableFiltering: false,
			useExternalFiltering: false,
			enablePaging: true,
			enablePinning: true,
			paginationPageSizes: [10, 20, 50],
			paginationPageSize: 10,
			filterOptions: $scope.filterOptions,
			showColumnMenu: true,
			showFilter: true,
			showGroupPanel: false,
			showFooter: false,
			i18n: "en"
		};

		$scope.gridOptions1.onRegisterApi = function(gridApi){
			//set gridApi on scope
			$scope.gridApi = gridApi;
			gridApi.selection.on.rowSelectionChanged($scope,function(row){
				var msg = 'row selected ' + row.isSelected;
				$log.log(msg, row);
				$scope.selectedItem = row.entity;


				/*	ngAjax 단일 데이터 조회	*/

			});
		};

		$scope.gridOptions1.columnDefs = [];

		$scope.gridOptions1.data = CommData.categories;


		/*	그리드 2번 설정		*/
		$scope.$scope = $scope;		// todo : 매우 중요! external-scopes="$scope"을 위한 초기화

		$scope.persons = [
			{data: {"id":6456332278300672, "firstname": "Peter", "name": "Mueller", "code" : "2542"}},
			{data: {"id":5356820650524672, "firstname": "Hans", "name": "Meier", "code": "3609"}}
		];

		var editButtonTpl = [
			'<div class="container">'
			, '<button class="btn btn-default btn-xs" data-toggle="tooltip" title="Edit" ng-click="getExternalScopes().edit(row);">'
			, '<span class="glyphicon glyphicon-pencil"></span>'
			, '</button></div>'
		].join('');

		$scope.gridOptions = {
			data: 'persons',
			showFilter: true,
			multiSelect: false,
			columnDefs: [
				{field: 'data.name', displayName: 'Name'},
				{field: 'data.firstname', displayName: 'Firstame'},
				{field: 'data.code', displayName: 'Code'},
				{field: 'Actions', cellTemplate: editButtonTpl}
			]
		};

		$scope.edit = function(row) {
			$modal.open({
				templateUrl: './partials/components/gridEdit.html',
				backdrop: true,
				windowClass: 'modaless',
				controller: 'PersonModalInstanceCtrl',
				resolve: {
					person: function() {
						return angular.copy(row.entity);
					}
				}
			}).result.then(function(person) {
					$log.log('Edited person: ' + JSON.stringify(person));
					angular.forEach($scope.persons, function(p, index) {
						$log.log('p: ' + JSON.stringify(p) + ' index: ' + index);
						if (p.data.id == row.entity.data.id) {
							$log.log('scope: ' + JSON.stringify($scope.persons));
							$scope.persons[index].data = person.data;
						}
					});
					$log.log('scope: ' + JSON.stringify($scope.persons));
					row.entity = person;
				}, function() {});
		};

	});

});