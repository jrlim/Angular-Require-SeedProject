/**
 * ItemList 컨트롤러
 */
define([
	'app',
	'underscore'
], function (ngApp, _) {
	'use strict';

	/**
	 * ApiService
	 */
	ngApp.service('ApiService', function($http, $log) {

		var ApiService = {};

		ApiService.loadItems = function() {};

		ApiService.deleteItem = function($scope, item) {
			$scope.items = _.reject($scope.items, item);
		};

		return ApiService;
	});


	/**
	 * ItemList 컨트롤러
	 */
	ngApp.controller('ItemListController', function($scope, $location, ApiService) {

		$scope.viewName = 'ItemListController';

		$scope.items = [
			{title : 'Sample1', created: '2015-01-31', code: 'a0001'},
			{title : 'Sample2', created: '2015-02-01', code: 'a0002'}
		];
		ApiService.loadItems(function (items) {
			$scope.items = items;
		});
		$scope.deleteItem = function (item) {
			ApiService.deleteItem($scope, item);
		};
	});

});



