/**
 * SNB 컨트롤러
 */
define([
	'app',
	'factories/CommData',
	'services/CommUtil'
], function (ngApp) {
	'use strict';

	ngApp.controller('SnbController', function ($rootScope, $scope, $log, CommData, CommUtil) {
		$log.info('SnbController call, ', $rootScope, $scope, $log, CommData, CommUtil);

		/*	초기화	*/
		$scope.initialize = function() {
			/*	CSS 설정	*/
			//$scope.$emit('updateCSS', './css/angular/angular.treeview.css');

			/*	데이터 초기화	*/
			$rootScope.roleList = $scope.roleList1;							//roleList1 to treeview
			$scope.currentRoleList = $rootScope.roleList;

			/* 개발계 메뉴 리스트	*/
			$scope.treeMenuList = [];

			/*	최종 결과값 트리 메뉴	리스트 */
			$scope.resultList = [];

			/*	트리 메뉴 체크	*/
			$scope.checkTreeMenu();
		};

		/*	기존 트리 메뉴 생성 체크 처리	*/
		$scope.checkTreeMenu = function() {
			if (!isNull(CommData.currentTreeList)) {
				$rootScope.roleList = CommData.currentTreeList;
				$scope.currentRoleList = $rootScope.roleList;
			} else if (!isNull(CommData.menuList)) {
				$scope.createTreeMenu();
				$scope.currentRoleList = $rootScope.roleList;
			} else {
				/*	기존 메뉴 정보가 없을 경우, 새로 조회 및 Tree 재성성	*/
				CommUtil.menuSelectList(function($scope) {
					$scope.createTreeMenu();
					$scope.currentRoleList = $rootScope.roleList;
				});
			}
		};

		/*	트리 메뉴 생성 기능	*/
		$scope.createTreeMenu = function() {
			var pLevel		= 'ROOT_MENU',
				resultList	= [],
				menuList	= _.clone(CommData.menuList.rows);

			/*	Tree 생성 후, 공통영역 CommData.currentTreeList에 저장	*/
			CommData.currentTreeList = CommUtil.buildTreeMenu(pLevel, resultList, menuList);
			$rootScope.roleList = CommData.currentTreeList;
			$scope.currentRoleList = $rootScope.roleList;
		};

		/**
		 * MDI Nav bar에 동적으로 현재 view를 추가
		 * @param viewNo
		 */
		$scope.setMdiValue = function(newObj) {
			$log.info(newObj);
			if (!isNull(newObj)) {
				if (newObj.upMenuId === 'ROOT_MENU') {
					return;
				}
			}
			$rootScope.$emit('setMdiNavBar', newObj); 			//angular.js
			//$('.contents-area').trigger('setMdiNavBar', id);	//jquery
		};

		/**
		 * New Tab 이동 기능
		 * @param url
		 * @constructor
		 */
		$scope.openInNewTab = function(url) {
			var win = window.open(url, '_blank');
			win.document.title = "your new title";
			win.focus();
		};

		$scope.currentNode = {};

		/**
		 * 트리메뉴에서 특정 노드 선택시, 이벤트 처리
		 */
//		$scope.$watch( 'menuTree.currentNode', function( newObj, oldObj ) {
//			if( $scope.currentNode && angular.isObject($scope.currentNode) ) {
//				console.log( 'Node Selected!!' );
//				console.log( newObj );
//				if (!isNull(newObj)) {
//					if (newObj.upMenuId === 'ROOT_MENU') {
//						return;
//					}
//				}
//				$scope.setMdiValue(newObj);
//				$scope.currentNode = {};
//			}
//		}, false);

//		CommUtil.authFilter(function() {
//			$scope.createTreeMenu();
//			$scope.currentRoleList = $rootScope.roleList;
//		});

			$scope.createTreeMenu();
			$scope.currentRoleList = $rootScope.roleList;

		/*	초기화	*/
		$scope.initialize();

	});
});