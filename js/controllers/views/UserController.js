/**
 * User 사용자 컨트롤러
 */
define([
	'app',
	'underscore',
	'services/CommUtil',
	'services/views/UserService'
], function (ngApp, _) {
	'use strict';

	/*	사용자 공통 데이터	*/
	ngApp.factory('UserCommData', function() {

		/*	현재 조회된 사용자 정보	*/
		var UserCommonData = {
			currentUser : {},
			userListMock : [
				{userId:'sampleUser', userName: '샘플유저', address:'경기도 용인시', hpNumber:'010-1111-2222', company:'KT'},
				{userId:'baekdae', userName: '백대영', address:'경기도 부천시 원미구', hpNumber:'010-1111-1312', company:'알앤비'},
				{userId:'testUser', userName: '테스트유저', address:'서울시 마포구', hpNumber:'010-2222-4444', company:'KTDS'}
			]
		};

		return UserCommonData;
	});


	/*	사용자 서비스	*/
	ngApp.service('UserService', function($window, $location, $log, CommUtil, UserCommData){
		$log.info('UserService call');
		//$log.log($window, $location, UserCommData);

		/*	사용자 서비스 Return 객체	*/
		var UserService = {};

		/**
		 * 사용자 리스트 조회
		 * @param $scope
		 */
		UserService.userMngList = function($scope) {
			CommUtil.ngAjax({url:'userMng/list.json', method:'post', param:{}, successFun:function(data, status) {
				try {
					var jsonData = data;
					if(jsonData) {
						$scope.userList = jsonData.users;
					} else {
						alert('조회에 실패하였습니다.' + status);
						$log.warn(data, status);
					}
				} catch(ex) {
					$log.error({errorObj:ex});
				}
			}});
		};

		/**
		 * 사용자 정보 등록
		 * @param $scope
		 */
		UserService.userMngRegist = function($scope) {
			var params = {};

			if ($scope.regUserInfo) {
				params = $scope.regUserInfo;
			}

			CommUtil.ngAjax({url:'userMng/edit.do', method:'post', param:params, successFun:function(data, status) {
				try {
					if(data) {
						alert('등록에 성공하였습니다.');
						$scope.btnMoveUserList();
					} else {
						alert('조회에 실패하였습니다.' + status);
						$log.warn(data, status);
					}
				} catch(ex) {
					$log.error({errorObj:ex});
				}
			}});
		};

		/**
		 * 사용자 상세정보 조회
		 * @param $scope
		 */
		UserService.userMngView = function($scope) {
			var params = {userId : 'baekdae'};

			if (!_.isEmpty($scope.userDetail.userId)) {
				params.userId = $scope.userDetail.userId;
			}

			CommUtil.ngAjax({url:'userMng/view.json', method:'post', param:params, successFun:function(data, status) {
				$log.log(data, status);
				try {
					if(data.users) {
						$scope.userDetail = data.users;
						UserCommData.currentUser = data.users;
					} else {
						alert('조회에 실패하였습니다.' + status);
						$log.warn(data, status);
					}
				} catch(ex) {
					$log.error({errorObj:ex});
				}
			}});
		};

		/**
		 * 사용자 정보 수정
		 * @param $scope
		 */
		UserService.userMngEdit = function($scope) {
			var params = {};

			if ($scope.userDetail) {
				params.userId	= $scope.userDetail.userId;
				params.userName = $scope.userDetail.userName;
				params.address	= $scope.userDetail.address;
				params.hpNumber = $scope.userDetail.hpNumber;
				params.company	= $scope.userDetail.company;
				params.action	= 'edit';
			} else {
				alert('사용자 정보가 올바르지 않습니다.');
				return ;
			}

			CommUtil.ngAjax({url:'userMng/edit.do', method:'post', param:params, successFun:function(data, status) {
				try {
					if(data) {
						$scope.btnMoveUserList();
					} else {
						alert('조회에 실패하였습니다.' + status);
						$log.warn(data, status);
					}
				} catch(ex) {
					$log.error({errorObj:ex});
				}
			}});
		};

		return UserService;
	});


	/*	사용자 리스트 컨트롤러	*/
	ngApp.controller('UserListController', function ($scope, $log, UserService, UserCommData, CommUtil) {
		$log.info('UserListController call, ');

		$scope.gridOptions = {  };

		/*	ng-grid tempData	*/
		$scope.gridOptions.columnDefs = [
			{ name:'id', width:50 },
			{ name:'name', width:100 },
			{ name:'age', width:100, enableCellEdit: true, cellTemplate: '<div class="ui-grid-cell-contents"><span>Age:{{COL_FIELD}}</span></div>'   },
			{ name:'address.street', width:150, enableCellEdit: true, cellTemplate: '<div class="ui-grid-cell-contents"><span>Street:{{COL_FIELD}}</span></div>'   },
			{ name:'address.city', width:150, enableCellEdit: true, cellTemplate: '<div class="ui-grid-cell-contents"><span>City:{{COL_FIELD}}</span></div>'  },
			{ name:'address.state', width:50, enableCellEdit: true, cellTemplate: '<div class="ui-grid-cell-contents"><span>State:{{COL_FIELD}}</span></div>'  },
			{ name:'address.zip', width:50, enableCellEdit: true, cellTemplate: '<div class="ui-grid-cell-contents"><span>Zip:{{COL_FIELD}}</span></div>'  },
			{ name:'company', width:100, enableCellEdit: true, cellTemplate: '<div class="ui-grid-cell-contents"><span>Company:{{COL_FIELD}}</span></div>'  },
			{ name:'email', width:100, enableCellEdit: true, cellTemplate: '<div class="ui-grid-cell-contents"><span>Email:{{COL_FIELD}}</span></div>'  },
			{ name:'phone', width:200, enableCellEdit: true, cellTemplate: '<div class="ui-grid-cell-contents"><span>Phone:{{COL_FIELD}}</span></div>'  },
			{ name:'about', width:300, enableCellEdit: true, cellTemplate: '<div class="ui-grid-cell-contents"><span>AAbout:{{COL_FIELD}}</span></div>'  },
			{ name:'friends[0].name', displayName:'1st friend', width:150, enableCellEdit: true, cellTemplate: '<div class="ui-grid-cell-contents"><span>Friend0:{{COL_FIELD}}</span></div>'  },
			{ name:'friends[1].name', displayName:'2nd friend', width:150, enableCellEdit: true, cellTemplate: '<div class="ui-grid-cell-contents"><span>Friend1:{{COL_FIELD}}</span></div>'  },
			{ name:'friends[2].name', displayName:'3rd friend', width:150, enableCellEdit: true, cellTemplate: '<div class="ui-grid-cell-contents"><span>Friend2:{{COL_FIELD}}</span></div>'  },
			{ name:'agetemplate',field:'age', width:100, cellTemplate: '<div class="ui-grid-cell-contents"><span>Age 2:{{COL_FIELD}}</span></div>' }
		];

		$scope.gridOptions.onRegisterApi = function(gridApi){
			$scope.gridApi = gridApi;
		};


		/*	초기화	*/
		$scope.initialize = function() {
			/*	데이터 초기화	*/
			$scope.userList = [];
			$scope.user		= {message: 'welcome user list'};

			/*	사용자 리스트 조회	*/
			$scope.getUserList();
		};

		/*	초기화 수행	*/
		$scope.$$postDigest(function(){
			$log.log('UserListController $$postDigest');

			$scope.initialize();
		});

		/*	사용자 리스트 조회	*/
		$scope.getUserList = function() {
			UserService.userMngList($scope);
		};

		/*	사용자 상세조회	*/
		$scope.btnMoveUserDetail = function(userName) {
			UserCommData.currentUser = _.findWhere($scope.userList, {userName: userName});
			console.log(UserCommData.currentUser);

			CommUtil.locationHref('#/user/detail');
			return false;
		};

		/*	사용자 등록 이동	*/
		$scope.btnMoveUserRegist = function() {
			CommUtil.locationHref('#/user/regist');
			return false;
		};

		$scope.$$postDigest(function(){
			$log.log('UserListController $$postDigest');

			$scope.initialize();
		});
	});


	/*	사용자 등록 컨트롤러	*/
	ngApp.controller('UserRegistController', function ($scope, $log, UserService, CommUtil) {
		$log.info('UserRegistController call, ');

		/*	초기화	*/
//		$scope.$on('$viewContentLoaded', function() {
//			$log.log('UserRegistController $viewContentLoaded');
//
//			$scope.user	= {message: 'welcome user regist'};
//
//			/*	등록할 사용자 정보	*/
//			$scope.regUserInfo = {
//				action: 'create', userId : '', userName: '', address: '', hpNumber:'', company: ''
//			};
//		});

		$scope.initialize = function() {
			$scope.user	= {message: 'welcome user regist'};

			/*	등록할 사용자 정보	*/
			$scope.regUserInfo = {
				action: 'create', userId : '', userName: '', address: '', hpNumber:'', company: ''
			};
		};

		/*	사용자 신규 등록 수행		*/
		$scope.btnRegistUserInfo = function() {
			UserService.userMngRegist($scope);
		};

		/*	사용자 리스트 이동	*/
		$scope.btnMoveUserList = function() {
			CommUtil.locationHref('#/user/list');
			return false
		};

		$scope.$$postDigest(function(){
			$log.log('UserRegistController $$postDigest');

			$scope.initialize();
		});
	});


	/*	사용자 상세정보 컨트롤러	*/
	ngApp.controller('UserDetailController', function ($scope, $log, UserService, UserCommData, CommUtil) {
		$log.info('UserDetailController call, ');

		/*	초기화	*/
		$scope.$on('$viewContentLoaded', function() {
			$log.log('UserDetailController $viewContentLoaded');

			/* 데이터 초기화	*/
			$scope.userDetail	= {};
			$scope.user 		= {message: 'welcome user detail'};

			/*	기존 로그인 사용자 체크	*/
			if (!isNull(UserCommData.currentUser)) {
				$scope.userDetail = UserCommData.currentUser;
			} else {
				$scope.getUserDetail();
			}
		});

		/*	사용자 정보 상세조회	*/
		$scope.getUserDetail = function() {
			UserService.userMngView($scope);
		};

		/*	사용자 수정 이동	*/
		$scope.btnMoveUserEdit = function() {
			CommUtil.locationHref('#/user/edit');
			return false
		};

	});


	/*	사용자 수정 컨트롤러	*/
	ngApp.controller('UserEditController', function ($scope, $log, UserService, UserCommData, CommUtil) {
		$log.info('UserEditController call, ');

		/*	초기화	*/
		$scope.$on('$viewContentLoaded', function() {
			$log.log('UserEditController $viewContentLoaded');

			/*	기존 로그인 사용자 체크	*/
			if (!_.isEmpty(UserCommData.currentUser)) {
				$scope.userDetail = UserCommData.currentUser;
			} else {
				$scope.getUserDetail();
			}

			/* 데이터 초기화	*/
			$scope.userDetail	= {};
			$scope.user 		= {message: 'welcome user edit'};

			/*	기존 로그인 사용자 체크	*/
			if (!isNull(UserCommData.currentUser)) {
				$scope.userDetail = UserCommData.currentUser;
			} else {
				$scope.getUserDetail();
			}
		});

		/*	사용자 정보 상세조회	*/
		$scope.getUserDetail = function() {
			UserService.userMngView($scope);
		};

		/*	사용자 정보 수정 실행		*/
		$scope.btnUserMngEdit = function() {
			if (confirm('수정하시겠습니까?')){
				UserService.userMngEdit($scope);
			}
		};

		/*	사용자 리스트 이동	*/
		$scope.btnMoveUserList = function() {
			CommUtil.locationHref('#/user/list');
			return false;
		};
	});

});