/**
 * 사용자 서비스 모듈
 */
define([
	'jquery',
	'underscore',
	'app'
], function ($, _, ngApp) {

	/*	사용자 서비스	*/
	ngApp.service('UserService', function($window, $location, $log, CommUtil, UserCommData){
		$log.info('UserService call');
		//$log.log($window, $location, UserCommData);

		/*	UserService Return 객체	*/
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

});