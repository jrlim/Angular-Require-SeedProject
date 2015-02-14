define([
	/*	Angular Module	*/
	'app',

	/*	import HTML to String	*/
	'text!../partials/views/mdi.html',
	'text!../partials/views/home.html',
	'text!../partials/views/aboutUs.html',
	'text!../partials/views/contactUs.html',

	/*	import Controller Module	*/
	'controllers/index',
	'filters/CommFilter'
], function (ngApp, MdiView, HomeView, AboutusView, ContactusView) {
	"use strict";

	/*  route config  */
	ngApp.config(function ($routeProvider) {
		$routeProvider
			.when('/mdi',
			{
				controller: 'MdiController',
				template: MdiView
			})
			.when('/home',
			{
				controller: 'HomeController',
				template: HomeView
			})
			.when('/aboutus',
			{
				controller: 'AboutUsController',
				template: AboutusView
			})
			.when('/contactus',
			{
				controller: 'ContactUsController',
				template: ContactusView
			})
			.when('/nested',
			{
				controller: 'NestedController',
				templateUrl: './partials/views/temp/nested.html'
			})
			.when('/user/list',
			{
				controller: 'UserListController',
				templateUrl: './partials/views/user/userList.html'
			})
			.when('/user/regist',
			{
				controller: 'UserRegistController',
				templateUrl: './partials/views/user/userRegist.html'
			})
			.when('/user/detail',
			{
				controller: 'UserDetailController',
				templateUrl: './partials/views/user/userDetail.html'
			})
			.when('/user/edit',
			{
				controller: 'UserEditController',
				templateUrl: './partials/views/user/userEdit.html'
			})
			.when('/grid',
			{
				controller: 'GridController',
				templateUrl: './partials/components/grid.html'
			})
			.when('/valid',
			{
				controller: 'ValidController',
				templateUrl: './partials/components/valid.html'
			})
			.when('/datepicker',
			{
				controller: 'DatePickerController',
				templateUrl: './partials/components/datepicker.html'
			})
			.when('/compare',
			{
				controller: 'CompareController',
				templateUrl: './partials/components/compare.html'
			})
			.when('/modal',
			{
				controller: 'ModalController',
				templateUrl: './partials/components/modal.html'
			})
			.when('/busy',
			{
				controller: 'BusyController',
				templateUrl: './partials/components/busy.html'
			})
			.when('/dialog',
			{
				controller: 'DialogController',
				templateUrl: './partials/components/dialog.html'
			})
			.when('/login',
			{
				controller: 'LoginController',
				templateUrl: './partials/views/login.html'
			})
			.otherwise({
				redirectTo: '/login'
			});

	}); // END, ngApp.config

	/**
	 * $rootScope.isLoogedIn의 값이 false 일때, 로그인 페이지로 redirecting 처리
	 */
	ngApp.run( function($rootScope, $location, $log) {
		// url route 변경시, 이벤트 리스너 등록
		$rootScope.$on("$routeChangeStart", function (event, next, current) {
			$log.warn('$rootScope.$on >>> $routeChangeStart >>> Done');
			if ($rootScope.isLoggedIn == false) {
				// 현재 페이지가 이미 로그인 페이지일 경우 pass
				if (next.templateUrl == "./partials/views/login.html") {

				// 그외 페이지일 경우, 리다이렉트
				} else {
					$location.path("/login");
				}
			}
		});

		$rootScope.$on('$routeChangeSuccess', function() {
			$log.warn('$rootScope.$on >>> $routeChangeSuccess >>> Done');
		});

		$rootScope.$on('$viewContentLoaded', function() {
			$log.warn('$rootScope.$on >>> $viewContentLoaded >>> Done');
		});

	});

}); // END, define