/**
 * DatePicker 컨트롤러, MDI 및 라우트 컨트롤러 비교
 */
define([
	'app',
	'moment',						// date Formatting 및 date 비교시 사용하는 lib
	'services/CommUtil',
	'factories/CommData'
], function (ngApp, moment) {
	'use strict';

	/**
	 * DatePicker 컨트롤러
	 */
	ngApp.controller('DatePickerController', function ($scope, $rootScope, $window, $log, $timeout, CommData) {
		$log.info('DatePickerController call, ');

		document.title = 'DatePicker';

		$scope.welcome = {
			message: 'DatePicker View'
		};

		$scope.today = function() {
			$scope.dt = new Date();
		};
		$scope.today();

		$scope.clear = function () {
			$scope.dt = null;
		};

		// Disable weekend selection
		$scope.disabled = function(date, mode) {
			return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
		};

		$scope.toggleMin = function() {
			$scope.minDate = $scope.minDate ? null : new Date();
		};
		$scope.toggleMin();

		/*	시작일, 종료일 데이터 및 팝업 설정	*/
		$scope.startDate = moment().add(-7, 'days').format('YYYY-MM-DD');		// moment.js로 현재부터 7일 이전으로 시작일 셋팅
		$scope.endDate = moment().format('YYYY-MM-DD');							// moment.js로 현재일로 종료일 셋팅

		/**
		 * 시작일 팝업 설정
		 * @param $event
		 */
		$scope.popupStartDate = function($event) {
			$event.preventDefault();
			$event.stopPropagation();

			$scope.endDateOpened = false;
			$scope.startDateOpened = true;
		};

		/**
		 * 종료일 팝업 설정
		 * @param $event
		 */
		$scope.popupEndDate = function($event) {
			console.log($event);
			$event.preventDefault();
			$event.stopPropagation();

			$scope.startDateOpened = false;
			$scope.endDateOpened = true;
		};

		// 주말 선택 Disable 처리
		$scope.disabledPopup = function(date, mode) {
			//return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
		};

		$scope.dateOptions = {
			formatYear: 'yy',
			startingDay: 1
		};

		$scope.formats = ['yyyy-MM-dd', 'dd-MMMM-yyyy', 'dd.MM.yyyy', 'shortDate'];
		$scope.format = $scope.formats[0];
	});
});