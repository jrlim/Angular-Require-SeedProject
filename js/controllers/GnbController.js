/**
 * GNB 컨트롤러
 */
define([
	'app',
	'services/CommUtil',
	'factories/CommData'
], function (ngApp) {
	'use strict';

	ngApp.service('GnbService', function($rootScope, $http, $window, dialogs) {

		var GnbService = {};

		GnbService.forceLogOut = function() {

			/**
			 * 로그아웃 API 처리. 현재는 안씀
			 */
			var fnLogOut = function() {
				$http({
					url : 'logout.do',
					method : "GET"
				}).then(function(res){
					$window.location.href = '#/login';
					return false;
				});
			};

			dialogs.notify('로그아웃', '자동 로그아웃 되었습니다.');

			$rootScope.isLoggedIn	= false;
			$rootScope.Authorities	= null;
			$rootScope.UserInfo		= null;

			$window.location.href = '#/login';
		};

		return GnbService;

	});

	ngApp.controller('GnbController', function($rootScope, $scope, $log, $window, $timeout, GnbService, CommData, dialogs) {
		$log.info('GnbController call, ');

		/*	로그아웃 버튼 처리	*/
		$scope.procLogout = function() {
			var dlg = dialogs.confirm('로그아웃', '로그아웃 하시겠습니까?');
			dlg.result.then(function(btn){
				$rootScope.isLoggedIn	= false;
				$rootScope.Authorities	= null;
				$rootScope.UserInfo		= null;

				$window.location.href = '#/login';
				return false;
			},function(btn){
				return false;
			});
		};

		$scope.session = {
			timeout : 0,
			time : 0,
			formatted : "",
			reset : function() {
				this.time = this.timeout;
				this.report();
			},
			report : function() {
				function z00(v) { return v < 10 ? "0"+v : v; }
				var sec = parseInt(this.time / 1000);
				//var mic = parseInt((this.time % 1000) / 10);
				//this.formatted = parseInt(sec / 60) + ":" + z00(sec % 60)+"."+z00(mic);
				this.formatted = parseInt(sec / 60) + ":" + z00(sec % 60);
			},
			loop : function(s, callback) {
				this.time -= s;
				if(this.time < 0) { callback(); return; }
				this.report();
				var that = this;
				$timeout(function() {
					that.loop(s, callback);
				}, s);
			}
		};

		$rootScope.installSessionTimer = function($el, timeout, callback){
			$scope.session.timeout = timeout;
			$scope.session.reset();
			var events = ["click", "keydown"]; //mousemove
			for(var i=0,e;e=events[i++];)
				$el.bind(e, function() {$scope.session.reset();});
			$scope.session.loop(10, callback);
		};

		if (CommData.AppInfo.isForceLogout) {
			$rootScope.installSessionTimer(angular.element("body"), 300 * 1000, function() {
				GnbService.forceLogOut($scope);
			});
		}
	});
});
