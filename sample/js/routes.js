define([
	/*	Angular Module	*/
	'app',

	/*	import HTML to String	*/
	'text!../partials/itemList.html',
	'text!../partials/nested.html',
	'text!../partials/event.html',

	/*	import Controller Module	*/
	'controllers/index_controllers'
], function (ngApp, ItemListView, NestedView, EventView) {
	"use strict";

	/*  route config  */
	ngApp.config(function ($routeProvider) {
		$routeProvider
			.when('/itemList',
			{
				controller: 'ItemListController',
				template: ItemListView
			})
			.when('/nested',
			{
				controller: 'NestedController',
				template: NestedView
			})
			.when('/event',
			{
				controller: 'EventController',
				template: EventView
			})
			.otherwise({
				redirectTo: '/itemList'
			});

	}); // END, ngApp.config

	/**
	 * $rootScope.isLoogedIn의 값이 false 일때, 로그인 페이지로 redirecting 처리
	 */
	ngApp.run( function($rootScope, $location, $log) {
		// url route 변경시, 이벤트 리스너 등록
		$rootScope.$on("$routeChangeStart", function (event, next, current) {
			$log.warn('$rootScope.$on >>> $routeChangeStart >>> Done  ' , next, current);
		});

		$rootScope.$on('$routeChangeSuccess', function() {
			$log.warn('$rootScope.$on >>> $routeChangeSuccess >>> Done');
		});

		$rootScope.$on('$viewContentLoaded', function() {
			$log.warn('$rootScope.$on >>> $viewContentLoaded >>> Done');
		});

	});

}); // END, define