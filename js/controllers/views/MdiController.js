/**
 * MDI First 컨트롤러
 */
define([
	'app',
	'services/CommUtil',
	'factories/CommData'
], function (ngApp) {
	'use strict';

	ngApp.factory('MdiData', function($log) {

		var CurrentIndex = 5;
		var MdiData = {};
		MdiData.getCurrentIdx = function() {
			$log.warn(CurrentIndex);
			return CurrentIndex = parseInt(CurrentIndex) + 1;
		};

		/**
		 * SNB 영역 임시 메뉴 데이터
		 * @type {{viewNo: number, viewName: string, viewTemplate: string, viewContent: string, viewStatus: string, viewCount: string}[]}
		 */
		MdiData.Menus = [
			{endRowNum: 0, id: 'mdi00001', indcOdrg: 1, level: 0, menuDesc: 'MDI목록',			menuLvl: 1, menuNm: 'MDI',	 		nd: 0,	page: 0, pgmId: 'MDI-00001', rNum: 0, rowCnt: 0, rows: 0, search: false, startRowNum: 0, upMenuId: 'ROOT_MENU', urlAdr: '#/mdi', userYn: 'Y'},
			{endRowNum: 0, id: 'mdi00002', indcOdrg: 1, level: 1, menuDesc: 'Compare View',		menuLvl: 2, menuNm: 'Compare',		nd: 0,	page: 0, pgmId: 'MDI-00002', rNum: 0, rowCnt: 0, rows: 0, search: false, startRowNum: 0, upMenuId: 'mdi00001', urlAdr: './partials/components/compare.html', userYn: 'Y'},
			{endRowNum: 0, id: 'mdi00003', indcOdrg: 1, level: 1, menuDesc: 'Grid View',		menuLvl: 2, menuNm: 'Grid',			nd: 0,	page: 0, pgmId: 'MDI-00003', rNum: 0, rowCnt: 0, rows: 0, search: false, startRowNum: 0, upMenuId: 'mdi00001', urlAdr: './partials/components/grid.html', userYn: 'Y'},
			{endRowNum: 0, id: 'mdi00004', indcOdrg: 1, level: 1, menuDesc: 'Nested View',		menuLvl: 2, menuNm: 'Nested',		nd: 0,	page: 0, pgmId: 'MDI-00004', rNum: 0, rowCnt: 0, rows: 0, search: false, startRowNum: 0, upMenuId: 'mdi00001', urlAdr: './partials/views/temp/nested.html',	userYn: 'Y'},
			{endRowNum: 0, id: 'mdi00005', indcOdrg: 1, level: 1, menuDesc: 'Test View',		menuLvl: 2, menuNm: 'Test',	 		nd: 0,	page: 0, pgmId: 'MDI-00005', rNum: 0, rowCnt: 0, rows: 0, search: false, startRowNum: 0, upMenuId: 'mdi00001', urlAdr: './partials/views/temp/testView.html', userYn: 'Y'},
			{endRowNum: 0, id: 'mdi00006', indcOdrg: 1, level: 1, menuDesc: 'Cust View',		menuLvl: 2, menuNm: 'Cust',	 		nd: 0,	page: 0, pgmId: 'MDI-00006', rNum: 0, rowCnt: 0, rows: 0, search: false, startRowNum: 0, upMenuId: 'mdi00001', urlAdr: './partials/views/cust/custList.html', userYn: 'Y'},
			{endRowNum: 0, id: 'mdi00007', indcOdrg: 1, level: 1, menuDesc: 'UserList View',	menuLvl: 2, menuNm: 'UserList',		nd: 0,	page: 0, pgmId: 'MDI-00007', rNum: 0, rowCnt: 0, rows: 0, search: false, startRowNum: 0, upMenuId: 'mdi00001', urlAdr: './partials/views/user/userList.html', userYn: 'Y'},
			{endRowNum: 0, id: 'mdi00008', indcOdrg: 1, level: 1, menuDesc: 'UserRegist View',	menuLvl: 2, menuNm: 'UserRegist',	nd: 0,	page: 0, pgmId: 'MDI-00008', rNum: 0, rowCnt: 0, rows: 0, search: false, startRowNum: 0, upMenuId: 'mdi00001', urlAdr: './partials/views/user/userRegist.html', userYn: 'Y'},
			{endRowNum: 0, id: 'mdi00009', indcOdrg: 1, level: 1, menuDesc: 'UserDetail View',	menuLvl: 2, menuNm: 'UserDetail',	nd: 0,	page: 0, pgmId: 'MDI-00009', rNum: 0, rowCnt: 0, rows: 0, search: false, startRowNum: 0, upMenuId: 'mdi00001', urlAdr: './partials/views/user/userDetail.html', userYn: 'Y'},
			{endRowNum: 0, id: 'mdi00010', indcOdrg: 1, level: 1, menuDesc: 'UserEdit View',	menuLvl: 2, menuNm: 'UserEdit',		nd: 0,	page: 0, pgmId: 'MDI-00010', rNum: 0, rowCnt: 0, rows: 0, search: false, startRowNum: 0, upMenuId: 'mdi00001', urlAdr: './partials/views/user/userEdit.html', userYn: 'Y'}
		];

		MdiData.mdiTestValue = '';

		return MdiData;
	});

	ngApp.controller('MdiController', function ($rootScope, $scope, $log, MdiData) {
		$log.info('MdiController call, ');

		$scope.welcome = {
			message: 'MDI View'
		};

		/**
		 * MDI View's object array
		 * @type {Array}
		 */
		$scope.mdiList = [];

		/**
		 * 현재 mdiList의 마지막 object 추출
		 * @returns {number|$scope.mdiList.viewNo}
		 */
		$scope.getLastViewNo = function() {
			var lastObj = _.last($scope.mdiList);
			return isNull(lastObj) ? '' : lastObj.id;
		};

		$scope.resetMdiList = function(newObj) {
			//console.log($scope.mdiList);
			$scope.mdiList.push(newObj);
			//console.log($scope.mdiList);
		};

		/**
		 * Mdi 메뉴를 외부 컨트롤러에서 동적으로 추가하는 기능
		 * @param event
		 * @param newObj
		 */
		var setMdiNavBar = function(event, newObj) {
			var lastViewNo = $scope.getLastViewNo();
			$scope.resetMdiList(newObj);
			$scope.changeMdiView(_.size($scope.mdiList) -1);
		};

		$rootScope.$on('setMdiNavBar', setMdiNavBar); // angular.js
		//$('.contents-area').on('setMdiNavBar', setMdiNavBar); //jquery

		/**
		 * 현재 선택된 뷰
		 * @type {number}
		 */
		$scope.isCurrentView = '';

		/**
		 * 선택된 뷰 변경
		 * @param $index
		 */
		$scope.changeMdiView = function($index) {
			$scope.isCurrentView = $index;
		};

		/**
		 * MDI Nav Bar에서 선택된 뷰 제거
		 * @param e
		 * @param index
		 * @param view
		 */
		$scope.removeMdi = function(e, index, view) {
			//alert(index, view);
			e.preventDefault();
			$scope.mdiList.splice(index,1);

			$scope.isCurrentView = _.size($scope.mdiList) -1;
		};

	});
});