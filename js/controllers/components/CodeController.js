/**
 * 공통 코드 컨트롤러
 */
define([
	'app',
	'controllers/views/ModalInstanceController',
	'services/CommUtil',
	'factories/CommData',
	'filters/CommFilter'
], function (ngApp) {
	'use strict';

	/**
	 * 코드 서비스
	 */
	ngApp.service('CodeService', function($log, CommUtil) {
		/**
		 * 리턴 객체
		 * @type {{}}
		 */
		var CodeService = {};

		CodeService.getCodeMngList = function($scope) {
			CommUtil.codeMngList(function() {
				$scope.upperCodeList = CommUtil.getCodeLocalStorage();
			});
		};

		return CodeService;
	});

	/**
	 * 코드 컨트롤러
	 */
	ngApp.controller('CodeController', function ($scope, $log, $timeout, $routeParams, CommUtil, CommData, CodeService) {
		$log.info('CodeController call, ');

		$scope.$$postDigest(function() {
			//alert(JSON.stringify($routeParams));
		});

		document.title = 'Code';

		$scope.welcome = {
			message: 'Code View'
		};

		/*	데이터 초기화	*/
		$scope.upperCodeList	= CommData.CodeList;
		$scope.lowerCodeList	= [];
		$scope.upperCode		= '';
		$scope.lowerCode		= '';
		$scope.searchCodeName	= '';

		/*	코드 자동 검색 함수 Binding 	*/
		$scope.fnSearchCode = CommUtil.getCommCodeName;

		/*	코드 검색	*/
		$scope.btnSearchCode = function() {
			var resultObj = _.findWhere(CommData.FlattenCodeList, {dtlCd: $scope.searchCodeName});
			$scope.searchResultCode = resultObj;
			console.log(resultObj);
		};

		/*	상위코드 변경 이벤트	*/
		$scope.changeUpperCode = function () {
			console.log($scope.upperCode);
			if (!isNull($scope.upperCode)) {
				$scope.lowerCodeList = $scope.upperCode.groupList;
			}
		};

		/*	코드 조회 버튼	*/
		$scope.btnCodeMngList = function() {
			CodeService.getCodeMngList($scope);
		};

		/* Grid 내에서 공통코드 조회	*/
		$scope.persons = [
			{data: {"id":6456332278300672, "firstname": "Peter", "name": "Mueller", "code" : "2542"}},
			{data: {"id":5356820650524672, "firstname": "Hans", "name": "Meier", "code": "3609"}}
		];

		$scope.gridOptions = {
			data: 'persons',
			showFilter: true,
			multiSelect: false,
			columnDefs: [
				{field: 'data.name', displayName: 'Name'},
				{field: 'data.firstname', displayName: 'Firstame'},
				{field: 'data.code', displayName: '공통코드', cellFilter: 'GetCodeName'}	// cellFilter에 CommFilter에 등록된 코드이름 검색 필터를 바인딩
			]
		};

		$scope.$$postDigest(function() {
			if ($scope.upperCodeList.length <= 0) {
				$scope.upperCodeList = CommUtil.getCodeLocalStorage();
			}
		});

	});
});