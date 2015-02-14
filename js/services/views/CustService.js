/**
 * 사용자 서비스 모듈
 */
define([
	'jquery',
	'underscore',
	'app'
], function ($, _, ngApp) {

	/*	Cust 서비스	*/
	ngApp.service('CustService', function($window, $location, $log, CommUtil, CustData){
		$log.info('CustService call');
		//$log.log($window, $location, UserCommData);

		/*	Cust 서비스 Return 객체	*/
		var CustService = {};

		/**
		 * 사용자 리스트 조회
		 * @param $scope
		 */
		CustService.userMngList = function($scope) {
			CommUtil.ngAjax({url:'userMng/list.json', method:'post', param:{}, successFun:function(data, status) {
				try {
					var jsonData = data;
					if(jsonData) {
						$scope.userList = jsonData.users;
						$scope.gridOptions.data = jsonData.users;
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
		CustService.userMngCreateAction = function(person) {
			var params = {};

			if (person) {
				params.userId	= person.userId;
				params.userName = person.userName;
				params.address	= person.address;
				params.hpNumber = person.hpNumber;
				params.company	= person.company;
			} else {
				alert('사용자 정보가 올바르지 않습니다.');
				return ;
			}

			CommUtil.ngAjax({url:'userMng/createAction.json', method:'post', param:params, successFun:function(data, status) {
				try {
					if(data) {
						alert('등록에 성공하였습니다.');
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
		 * @param person : 사용자정보 object
		 */
		CustService.userMngEditAction = function(person) {
			var params = {};

			if (person) {
				params.userId	= person.userId;
				params.userName = person.userName;
				params.address	= person.address;
				params.hpNumber = person.hpNumber;
				params.company	= person.company;
			} else {
				alert('사용자 정보가 올바르지 않습니다.');
				return ;
			}

			CommUtil.ngAjax({url:'userMng/editAction.json', method:'post', param:params, successFun:function(data, status) {
				try {
					if(data) {
						alert('수정하였습니다.');
					} else {
						alert('조회에 실패하였습니다.' + status);
						$log.warn(data, status);
					}
				} catch(ex) {
					$log.error({errorObj:ex});
				}
			}});
		};

		return CustService;
	});

});