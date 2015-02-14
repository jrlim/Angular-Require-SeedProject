/**
 * BASE 컨트롤러
 */
define([
	'app',
	'factories/CommData',
	'services/CommUtil'
], function (ngApp) {
	'use strict';

	ngApp.service('BaseService', function($log, CommData, CommUtil) {

		var BaseService = {};

		/**
		 * 오프라인 공통코드 조회 서비스
		 */
		BaseService.offLineGetCodeMngList = function() {
			CommUtil.setCodeLocalStorage();
			CommData.CodeList = CommUtil.getCodeLocalStorage();		// CommData.CodeList 초기화
			CommUtil.createFlattenCodeList();						// CommData.FlattenCodeList 초기화

			console.log('BaseService.offLineGetCodeMngList >>> ', CommData.CodeList, CommData.FlattenCodeList);
		};

		return BaseService;
	});

	ngApp.controller('BaseController', function ($rootScope, $scope, $log, $routeParams, CommUtil, CommData, BaseService) {
		$log.log('BaseController call, ');
		console.log($routeParams);

		$scope.$on("$routeChangeStart", function (event, current, previous, rejection) {
			$log.log('BaseController >>> $routeChangeStart', event, current, previous, rejection);
		});

		$scope.$on('$routeChangeSuccess', function() {
			$log.log('BaseController >>> $routeChangeSuccess');
		});

		/*	초기화	*/
		$scope.$on('$viewContentLoaded', function() {
			$log.log('BaseController $viewContentLoaded');

			/* 스타일 시트 배열 */
			$scope.stylesheets = [];

			/*	App정보 초기화	*/
			$scope.APP_INFO = {
				appName		: CommData.getAppInfo(),
				appVersion	: CommData.getVersion()
			};

			/*	사용자 메뉴 리스트 호출 초기화	*/
			//CommUtil.menuSelectList();

			/*	인증 체크 후, 각 회원사 별로 UI 변경 처리	*/
			$scope.authCheck();

			/*	공통 코드 조회 및 초기값 셋팅	*/
			if (CommData.isLoginPass == true) BaseService.offLineGetCodeMngList();
		});

		/**
		 * $rootScope 초기화
		 */
		$rootScope.isLoggedIn	= false;
		$rootScope.Authorities	= [];
		$rootScope.UserInfo		= {};
		$rootScope.roleList		= [];

		/*	임시 인증 체크	*/
		$scope.authCheck = function() {

			/*	최초 로그인 후, Client정보 있을 시, 인증 정보 셋팅	*/
			if (!isNull($routeParams.client)) {

				var clientObj = _.findWhere(CommData.ClientInfo, {name: $routeParams.client});
				CommData.AuthInfo.isLoggedIn = true;
				CommData.AuthInfo.userInfo = clientObj;

				$scope.checkClient();

			/*	이미 인증 정보가 있을 경우		*/
			} else if (!isNull(CommData.AuthInfo.userInfo) && CommData.AuthInfo.isLoggedIn == true) {

				$scope.checkClient();

			/*	임시 저장된 인증 정보가 없을 경우, 기본값 KT로 설정		*/
			} else if (isNull(CommData.AuthInfo.userInfo)) {

				CommData.AuthInfo.userInfo = CommData.ClientInfo[0];
				CommData.AuthInfo.isLoggedIn = true;

			}
		};

		/*	UI 변경처리	*/
		$scope.checkClient = function() {
			console.log($routeParams);
			if (CommData.AuthInfo.isLoggedIn == true) {
				$scope.APP_INFO.appName		= CommData.AuthInfo.userInfo.name;
				$scope.APP_INFO.appVersion	= CommData.getVersion();
				$scope.stylesheets.push(CommData.AuthInfo.userInfo.cssPath);

				console.log($scope.AppInfo);
			}
		};

		/*	스타일시트 업데이트	*/
		$scope.$on('updateCSS', function(event, args) {
			/*	파라메터로 받아온 스타일 시트 반영	*/
			$scope.stylesheets.push(args);
		});

		/*	angular-busy indicator 설정	*/
		$scope.delay = 0;
		$scope.minDuration = 0;
		$scope.message = '처리중...';
		$scope.backdrop = true;
		$scope.promise = null;

	});
});
