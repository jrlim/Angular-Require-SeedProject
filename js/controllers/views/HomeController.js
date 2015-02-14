/**
 * HOME 컨트롤러
 */
define([
	'angular',
	'app',
	'services/CommUtil',
	'factories/CommData',
	'async',
	'moment'
], function (angular, ngApp) {
	'use strict';

	/*	Home 서비스	*/
	ngApp.service('HomeService', function($window, $location, $log, CommUtil){
		$log.info('HomeService call');

		document.title = 'Home';

		var HomeService = {};

		return HomeService;
	});

	/*	Home 컨트롤러	*/
	ngApp.controller('HomeController', function ($scope, $log, $routeParams, $modal, HomeService, CommData) {
		$log.info('HomController call, ');

		document.title = 'Home View';

		$scope.gridOptions1 = {
			paginationPageSizes: [10, 20, 50],
			paginationPageSize: 10,
			columnDefs: [
				{ name: 'name' },
				{ name: 'gender' },
				{ name: 'company' }
			]
		};

		$scope.gridOptions1.data = CommData.GridTemp.UserList;

		$scope.$scope = $scope;

		$scope.welcome = {
			message: 'Home View'
		};

		$scope.persons = [
			{data: {"id":6456332278300672, "firstname": "Peter", "name": "Mueller"}},
			{data: {"id":5356820650524672, "firstname": "Hans", "name": "Meier"}}
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
			columnDefs: [{field: 'data.name', displayName: 'Name'},
				{field: 'data.firstname', displayName: 'Firstame'},
				{field: 'Actions', cellTemplate: editButtonTpl}]
		};

		$scope.edit = function(row) {
			$modal.open({
				templateUrl: './partials/components/gridEdit.html',
				backdrop: true,
				windowClass: 'modal',
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