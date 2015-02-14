/**
 * Login 로그인 컨트롤러
 */
define([
	'jquery',
	'underscore',
	'app',
	'services/CommUtil',
	'factories/CommData',
	'controllers/GnbController'
], function ($, _, ngApp) {
	'use strict';

	ngApp.service('LoginService', function($rootScope, $log, $window, CommUtil, CommData, dialogs, GnbService) {

		var LoginService = {};

		LoginService.jSpringSecurityCheck = function($scope) {

			var params = {};
			params.loginid = $scope.loginid;
			params.loginpwd = $scope.loginpwd;

			if (CommData.AppInfo.isLoginPass == true) {
				$rootScope.isLoggedIn	= true;
				$rootScope.Authorities	= CommData.mockUserData.authorities;
				$rootScope.UserInfo		= CommData.mockUserData.UserInfo;

				CommUtil.createTreeMenu();
				dialogs.notify('Dev Login', '임시 로그인 처리');

				if (CommData.AppInfo.isForceLogout) {
					$rootScope.installSessionTimer(angular.element("body"), 300 * 1000, function() {
						GnbService.forceLogOut($scope);
					});
				}

				$window.location.href = '#/mdi';
			} else {
				CommUtil.ngAjax({url:'j_spring_security_check', method:'post', param:params, successFun:function(data, status) {
					try {
						var jsonData = data;
						if(jsonData) {
							$rootScope.isLoggedIn	= true;
							$rootScope.Authorities	= jsonData.authorities;
							$rootScope.UserInfo		= jsonData.UserInfo;
							CommData.menuList.rows 	= jsonData.menu;

							CommUtil.createTreeMenu();

							CommUtil.codeMngList(function(){});

							if (CommData.AppInfo.isForceLogout) {
								$rootScope.installSessionTimer(angular.element("body"), 300 * 1000, function() {
									GnbService.forceLogOut($scope);
								});
							}

							$window.location.href = '#/mdi';
						} else {
							dialogs.error('Error : Login Failed', '사용자 정보가 올바르지 않습니다.');
							$log.warn(data, status);
						}
					} catch(ex) {
						$log.error({errorObj:ex});
					}
				}});
			}
		};

		return LoginService;
	});

	/*	Login 컨트롤러	*/
	ngApp.controller('LoginController', function ($rootScope, $scope, $log, LoginService) {
		$log.info('LoginController call, ');

		$rootScope.isLoggedIn	= false;
		$rootScope.Authorities	= null;
		$rootScope.UserInfo		= null;

		document.title = 'Login';

		$scope.welcome = {
			message: 'Login View'
		};

		$scope.loginid = 'hong';
		$scope.loginpwd = 'hong1234';

		$scope.userData = '';

		$scope.procLogin = function () {
			LoginService.jSpringSecurityCheck($scope);
		};

	});

});