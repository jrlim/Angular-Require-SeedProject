/**
 * Valid 컨트롤러, MDI 및 라우트 컨트롤러 비교
 */
define([
	'app',
	'services/CommUtil',
	'factories/CommData'
], function (ngApp) {
	'use strict';

	/**
	 * Valid 컨트롤러
	 */
	ngApp.controller('ValidController', function ($scope, $window, $log) {
		$log.info('ValidController call, ');

		document.title = 'Valid';

		$scope.welcome = {
			message: 'Validation View'
		};

		$scope.validation = {
			content : {
				'UserVO': {
					'userId': {
						'required': {
							'message': '사용자 아이디를 입력해 주세요.'
						},
						'size': {
							'min': 4,
							'max': 10,
							'message': '아이디를 4~15자 사이의 영문/숫자 조합으로 입력해주세요.'
						},
						'pattern': {
							'value': '/^[a-zA-Z]1?[a-zA-Z0-9]*$/',
							'message': '아이디는 첫글자는 반드시 영문자이며, 영문/숫자 조합으로 입력해 주세요.'
						}
					}
				}
			}
		};

		$scope.testPerson = {};

		$scope.btnSave = function(formObj) {
			alert(formObj.$valid);
			$window.FormObj = formObj;
			console.log(formObj);
		};

	});
});