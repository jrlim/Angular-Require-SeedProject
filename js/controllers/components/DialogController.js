/**
 * Dialog 컨트롤러. System Message 처리
 */
define([
	'app',
	'services/CommUtil',
	'factories/CommData'
], function (ngApp) {
	'use strict';

	/*	Dialog 서비스	*/
	ngApp.service('DialogService', function($window, $location, $log, CommUtil, dialogs) {
		$log.info('DialogService call');
		//$log.log($window, $location, $log, CommUtil);

		/*	Cust 서비스 Return 객체	*/
		var DialogService = {};

		/**
		 * 사용자 리스트 조회
		 * @param $scope
		 */
		DialogService.userMngException = function ($scope) {
			CommUtil.ngAjax({url: 'userMng/exception.json', method: 'post', param: {}, successFun: function (data, status) {
				try {
					var jsonData = data;
					if (jsonData.resultCode == '0') {
						dialogs.notify('성공', '등록완료');
					} else {
						dialogs.error('Error : ' + jsonData.resultCode, jsonData.resultMsg);
						//alert('조회에 실패하였습니다.' + status);
						$log.warn(data, status);
					}
				} catch (ex) {
					$log.error({errorObj: ex});
				}
			}});
		};

		return DialogService;
	});


	/**
	 * Dialog 컨트롤러
	 */
	ngApp.controller('DialogController', function ($scope, $window, $log, $rootScope, $timeout, $translate, dialogs, DialogService, CommUtil) {
		$log.info('DialogController call, ');

		document.title = 'Dialog';

		$scope.welcome = {
			message: 'Dialog View'
		};

		$scope.dialogExample = {
			language			: '기본 언어 = 한국어 ko-KR, 설정파일 = /js/libs/angular-1.3.8/angular-dialog-default-translations.js 파일 참조',
			dialogError			: "dialogs.error('Error : 1001', '데이터베이스 오류입니다. 잠시 후, 다시 시도해 주시기 바랍니다.', 2000) params 순서 'header', 'msg', 'timer'",
			dialogNotice		: "dialogs.notify('사용자 정보', '사용자 등록을 성공하였습니다.')",
			dialogCustomWait	: "dialogs.wait('커스텀 대기 타이틀','커스텀 대기 메세지입니다.',_progress)"
		};

		//-- Variables --//

		$scope.lang = 'ko-KR';
		$scope.language = '한국어';

		var _progress = 33;

		$scope.name = '';
		$scope.confirmed = '승인 결과 값 : 미승인 대기중!';

		$scope.custom = {
			val: 'Initial Value'
		};

		//-- Listeners & Watchers --//

		$scope.$watch('lang',function(val,old){
			switch(val){
				case 'en-US':
					$scope.language = 'English';
					break;
				case 'ko-KR':
					$scope.language = '한국어';
					break;
			}
		});

		//-- Methods --//

		$scope.setLanguage = function(lang){
			$scope.lang = lang;
			$translate.use(lang);
		};

		$scope.launch = function(which){
			switch(which){
				case 'error':
					dialogs.error();
					break;
				case 'customError':
					dialogs.error('Error : 1001', '데이터베이스 오류입니다. 잠시 후, 다시 시도해 주시기 바랍니다.', 2000);		// todo : 에러 헤더 및 메세지 커스텀 처리 예시 header, msg, time
					break;
				case 'wait':
					var dlg = dialogs.wait(undefined,undefined,_progress);
					_fakeWaitProgress();
					break;
				case 'customwait':
					var dlg = dialogs.wait('커스텀 대기 타이틀','커스텀 대기 메세지입니다.',_progress);
					_fakeWaitProgress();
					break;
				case 'notify':
					dialogs.notify();
					break;
				case 'customNotify':
					dialogs.notify('사용자 정보', '사용자 등록을 성공하였습니다.');									// todo : 알림(info) 헤더 및 메세지 커스텀 처리 예시
					break;
				case 'confirm':
					var dlg = dialogs.confirm('사용자 삭제', '사용자 정보가 영구히 삭제됩니다. 정말 진행하시겠습니까?');
					dlg.result.then(function(btn){
						$scope.confirmed = '승인 결과 : "Yes."';
					},function(btn){
						$scope.confirmed = '승인 결과 : "No."';
					});
					break;
				case 'custom':
					var dlg = dialogs.create('/dialogs/custom.html','customDialogCtrl',{},{size:'sm',keyboard: true,backdrop: false,windowClass: 'my-class'});
					dlg.result.then(function(name){
						$scope.name = name;
					},function(){
						if(angular.equals($scope.name,''))
							$scope.name = 'You did not enter in your name!';
					});
					break;
				case 'custom2':
					var dlg = dialogs.create('/dialogs/custom2.html','customDialogCtrl2',$scope.custom,{size:'lg'});
					break;
			}
		}; // end launch

		var _fakeWaitProgress = function(){
			$timeout(function(){
				if(_progress < 100){
					_progress += 33;
					$rootScope.$broadcast('dialogs.wait.progress',{'progress' : _progress});
					_fakeWaitProgress();
				}else{
					$rootScope.$broadcast('dialogs.wait.complete');
					_progress = 0;
				}
			},1000);
		};

		/*	사용자 리스트 조회	*/
		$scope.procException = function() {
			DialogService.userMngException($scope);
		};

	}); // end controller(DialogController)


	ngApp.controller('customDialogCtrl',function($scope,$modalInstance,data){
		//-- Variables --//

		$scope.user = {name : ''};

		//-- Methods --//

		$scope.cancel = function(){
			$modalInstance.dismiss('Canceled');
		}; // end cancel

		$scope.save = function(){
			$modalInstance.close($scope.user.name);
		}; // end save

		$scope.hitEnter = function(evt){
			if(angular.equals(evt.keyCode,13) && !(angular.equals($scope.user.name,null) || angular.equals($scope.user.name,'')))
				$scope.save();
		};
	}); // end controller(customDialogCtrl)


	ngApp.controller('customDialogCtrl2',function($scope,$modalInstance,data){

		$scope.data = data;

		//-- Methods --//

		$scope.done = function(){
			$modalInstance.close($scope.data);
		}; // end done

		$scope.hitEnter = function(evt){
			if(angular.equals(evt.keyCode,13) && !(angular.equals($scope.user.name,null) || angular.equals($scope.user.name,'')))
				$scope.done();
		};
	}); // end controller(customDialogCtrl2)


	ngApp.run(['$templateCache',function($templateCache){
		$templateCache.put('/dialogs/custom.html','<div class="modal-header"><h4 class="modal-title"><span class="glyphicon glyphicon-star"></span> User\'s Name</h4></div><div class="modal-body"><ng-form name="nameDialog" novalidate role="form"><div class="form-group input-group-lg" ng-class="{true: \'has-error\'}[nameDialog.username.$dirty && nameDialog.username.$invalid]"><label class="control-label" for="course">Name:</label><input type="text" class="form-control" name="username" id="username" ng-model="user.name" ng-keyup="hitEnter($event)" required><span class="help-block">Enter your full name, first &amp; last.</span></div></ng-form></div><div class="modal-footer"><button type="button" class="btn btn-default" ng-click="cancel()">Cancel</button><button type="button" class="btn btn-primary" ng-click="save()" ng-disabled="(nameDialog.$dirty && nameDialog.$invalid) || nameDialog.$pristine">Save</button></div>');
		$templateCache.put('/dialogs/custom2.html','<div class="modal-header"><h4 class="modal-title"><span class="glyphicon glyphicon-star"></span> Custom Dialog 2</h4></div><div class="modal-body"><label class="control-label" for="customValue">Custom Value:</label><input type="text" class="form-control" id="customValue" ng-model="data.val" ng-keyup="hitEnter($event)"><span class="help-block">Using "dialogsProvider.useCopy(false)" in your applications config function will allow data passed to a custom dialog to retain its two-way binding with the scope of the calling controller.</span></div><div class="modal-footer"><button type="button" class="btn btn-default" ng-click="done()">Done</button></div>')
	}]);

});
