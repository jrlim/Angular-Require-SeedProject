/**
 * 공통 서비스 모듈
 */
define([
	'jquery',
	'angular',
	'underscore',
	'app',
	'factories/CommData'
], function ($, angular, _, ngApp) {
	/**
	 * Application CommUtil 설정
	 */
	ngApp.service('CommUtil', function($rootScope, $http, $window, $log, CommData, dialogs) {

		/*	CommUtil service의 Return Object	*/
		var CommUtil = {};

		/*	Crypto Variables	*/
		var FLAG_CRYPTO		= false;
		var TEA_KEY			= null;
		var CRYPTED_TEA_KEY	= null;

		/*	Http 상태값에 따른 메세지		*/
		var HttpStatusMsg = {
			'200' : '정상적으로 응답되었습니다.',
			'206' : '일부 요청만 처리되었습니다.',
			'301' : '요청페이지를 새로운 페이지로 이동시켰습니다.',
			'302' : '다른 페이지로 응답중입니다.',
			'304' : '마지막 요청 이후, 페에지가 수정되지 않았습니다.',
			'307' : '임시적으로 서버가 다른 페이지로 응답중입니다.',
			'308' : '영구적으로 서버가 다른 페이지로 응답중입니다.',
			'400' : '잘못된 요청입니다.',
			'401' : '요청에 대한 권한이 없습니다.',
			'403' : '서버가 요청에 대한 응답을 거부하고 있습니다.',
			'404' : '요청한 페이지를 찾을 수가 없습니다.',
			'405' : '요청에 지정된 방법을 사용 할 수 없습니다.',
			'406' : '요청한 페이지가 요청한 컨텐츠 특성으로 응답 할 수 없습니다.',
			'408' : '요청에 대한 서버 응답 시간이 초과되었습니다.',
			'413' : '요청이 너무 커서 서버가 응답 할 수 없습니다.',
			'414' : '요청 URL 너무 길어 서버가 응답 할 수 없습니다.',
			'415' : '요청이 지원하지 않는 미디어 유형입니다.',
			'416' : '요청이 처리할 수 없는 범위입니다.',
			'500' : '서버 내부 오류가 발생하였습니다.',
			'501' : '서버가 지원하지 않는 메서드 입니다.',
			'503' : '일시적으로 서비스를 사용할 수 없습니다.',
			'505' : '서버가 요청에 사용된 HTTP 프로토콜 버전을 지원하지 않습니다.',
			'509' : '사용한 가능한 대역폭이 초과되었습니다.',
			'598' : '네트워크 읽기 시간이 초과되었습니다.',
			'599' : '네트워크 연결 시간이 초과되었습니다.'
		};

		CommUtil.switchErrorMsg = function(textStatus) {
			var errorMsg = '알 수 없는 오류가 발생하였습니다.';
			if (!isNull(HttpStatusMsg[textStatus])) {
				errorMsg = HttpStatusMsg[textStatus];
			}
			return errorMsg;
		};

		/**
		 * 데이타 통신을 도와주는 util
		 * @param httpObj
		 * errorFun : 실패 함수(기본:commProto.commonError)
		 * successFun : 성공 함수
		 * method : 통신 메소드(기본:post)
		 * queryString : 쿼리 스트링
		 * param : 쿼리스트링으로 변환되는 파라미터 object
		 * url : 호출 url
		 */
		CommUtil.ngAjax = function(httpObj) {

			var ngLoader = angular.element('.loader');
			ngLoader.show();

			if( !httpObj.errorFun ) {
				httpObj.errorFun =  function(xhr, textStatus, errorThrown, errorCallback) {
					dialogs.error('Error Code : ' + textStatus, CommUtil.switchErrorMsg(textStatus));
					$log.error(xhr, textStatus);
					ngLoader.hide();
				};
			}

			if( !httpObj.successFun ) {
				httpObj.successFun =  function() {};
			}

			if( !httpObj.method ) {
				httpObj.method = 'post';
			}

			if( !httpObj.queryString && httpObj.param ) {
				httpObj.queryString = $.param(httpObj.param, true);
			}

			/*	JSON Type Check	*/
			function maybeJSONType(str) {
				return str.indexOf('{') == 0 || str.indexOf('[') == 0;
			}

			/*	ngAjax 기본 request 처리 기능	*/
			function doRequest(httpObj) {
				$http({
					withCredentials: false,
					method: httpObj.method,
					url: httpObj.url,
					headers: {'Content-Type': 'application/x-www-form-urlencoded'},
					data: httpObj.queryString
				}).success(function(data, status) {
					ngLoader.hide();
					httpObj.successFun(data, status);
				}).error(httpObj.errorFun);
			}

			function doCryptedRequest(httpObj) {
				if(TEA_KEY == null) { doRequest(httpObj); return; }
				var cipher = Tea.encrypt(httpObj.queryString, TEA_KEY);
				httpObj.queryString = "q="+encodeURIComponent(cipher);
				(function(originSuccessFun, originErrorFn) {
					httpObj.successFun = function(data, status) {
						if (isNull(data.r)) {
							dialogs.error('Server Error : Not Supported Data', data);
						}
						var decrypted = '';
						try {
							decrypted = Tea.decrypt(data.r, TEA_KEY);
							if (!maybeJSONType(decrypted)) {
								dialogs.error('Server Error : Response data does not have JSON notation', decrypted);
								return ;
							}
							decrypted = JSON.parse(decrypted);
						} catch(e) {
							dialogs.error('Error : Failed to Decrypt', data.r);
							$log.error(e);
							return ;
						}
						originSuccessFun(decrypted, status);
					};
					doRequest(httpObj);
				})(httpObj.successFun, httpObj.errorFun);
			}

			function handshakeTeaKey(callback) {
				$http({
					url : 'rsa-pub',
					method : "GET"
				}).then(function(res){
					var rsa = new RSAKey();
					rsa.setPublic(res.data.key, '10001');
					var k = rsa.encrypt(TEA_KEY);
					CRYPTED_TEA_KEY = k;
					$http({
						url : 'key?k='+k,
						method : "GET"
					}).then(function(result){
						/*TODO : check result.result == "0000" */
						callback();
					});
				});
			}

			if(FLAG_CRYPTO) {
				if(TEA_KEY == null) {
					TEA_KEY = generateUID();
					handshakeTeaKey(function() {
						doCryptedRequest(httpObj);
					});
				} else {
					doCryptedRequest(httpObj);
				}
			} else {
				doRequest(httpObj);
			}
		};

		/**
		 * 로그인 인증 체크
		 */
		CommUtil.authFilter = function(callback) {
			CommUtil.ngAjax({url:'main.json', method:'post', param:{}, successFun:function(data, status) {
				try {
					var jsonData = data;
					if(jsonData) {
						$rootScope.Authorities	= jsonData.authorities;
						$rootScope.UserInfo		= jsonData.UserInfo;
						$rootScope.isLoggedIn	= true;
						CommData.menuList.rows 	= jsonData.menu;
						callback();
					} else {
						dialogs.error('Error : authentication Failed', '로그인 사용자가 아닙니다.');
						$log.warn(data, status);
						$window.location.href = '#/login';
					}
				} catch(ex) {
					$log.error({errorObj:ex});
				}
			}, errorFun:function(xhr, textStatus, errorThrown, errorCallback) {
				$log.error(xhr, textStatus);
				var ngLoader = angular.element('.loader');
				dialogs.error('Error : authentication Failed', '로그인 사용자가 아닙니다.');
				ngLoader.hide();
				$window.location.href = '#/login';
			}});
		};


		/**
		 * 공통 코드 생성일 비교 기능. 서버 최근 생성일 == 클라이언트 과거 설정된 생성일
		 * @param updateDate
		 * @returns {boolean}
		 */
		CommUtil.checkUpdateCommCode = function(updateDate) {
			var serverDate = parseInt(moment(updateDate).format('YYYYMMDD'));
			var clientDate = parseInt(moment(CommData.CommCode.CreateDate).format('YYYYMMDD'));
			return serverDate == clientDate;
		};

		/**
		 * Url 이동시 HashTag에 object를 pramater로 처리
		 * ex) {content_no:1, page_no:1} -> '#/contentPage?content_no=1&page_no=1'
		 * @param href
		 * @param params
		 */
		CommUtil.locationHref = function (href, params) {
			//console.log(params);
			var resParams = {};

			if (_.isUndefined(params)) {
				resParams = _.map(params || {}, function (value, key) {
					return  key + '=' + (_.isUndefined(value) ? '' : value);
				}).join('&');
			}

			$window.location.href = href + '?' + resParams;
		};

		/**
		 * 페이지 강제 리로드 유틸
		 */
		CommUtil.reloadRoute = function() {
			$window.location.reload();
		};

		/*
		 * 신규 컨텐츠 체크 key:value 생성 : 컨텐츠 생성일 기준 7일전과 현재일 기준 7일전을 비교하여 boolean 리턴
		 * @param objArray
		 * @returns {void|*|Object|Array}
		 */
		CommUtil.createNewContent = function (objArray) {
			return objArray = angular.forEach(objArray, function(item) {
				if (!_.isUndefined(item.reg_date) && item.reg_date) {
					var regDate 	= parseInt(moment(item.reg_date).format('YYYYMMDD'));
					var compareDate = parseInt(moment().weekday(1).format('YYYYMMDD'));

					if (compareDate <= regDate) {
						return item.new_content = true;
					} else {
						return item.new_content = false;
					}
				}
			});
		};

		/*
		 *  새글 여부 : 게시글의 등록일이 7일을 넘기지 않았으면 새글임
		 *  @param regDate
		 *  @return boolean
		 */
		CommUtil.isNewItem = function(regDate) {
			regDate = parseInt(moment(regDate).add(1,'week').format('YYYYMMDD'));
			var compareDate = parseInt(moment().format('YYYYMMDD'));
			return compareDate <= regDate;
		};

		/*
		 * 특정 컨테이너(엘리먼트)로부터 하위에 있는 폼 요소들의 입력 값을 json object형태로 반한함
		 * @param $container
		 * @return {Object}
		 */
		CommUtil.getFormValues = function($container, scope) {
			var data = _.object(_.map($container.find('input,select'), function(element) {
				var key = element.name;
				var value = (scope[key] || element.value || '').trim();
				if (!key || (element.type === 'radio' && element.checked === false)) {
					key = 'nil';
					value = '';
				}
				return [key, value];
			}));
			delete data.nil;
			return data;
		};

		/*
		 * 페이지네이션 정보 계산
		 * @param totalCount, scale, pageScale, curPage
		 * @return {Object}
		 */
		CommUtil.getPagenationInfo = function(totalCount, scale, pageScale, curPage) {
			if (totalCount === 0) {
				return null;
			}
			totalCount = _.max([totalCount, 1]);
			var totalPage = parseInt((totalCount-1)/scale)+1;
			$log.info('totalCount',totalCount, scale);
			$log.info('totalPage',totalPage);
			var groups = _.groupBy(_.range(1, totalPage+1), function(page) {
				return parseInt((page-1)/pageScale);
			});
			var pages = groups[parseInt((curPage-1)/pageScale)];
			var firstPage = pages[0];
			var lastPage = pages[pages.length-1];
			var result = {pages: pages, curPage: curPage, firstPage:firstPage, lastPage:lastPage, totalPage: totalPage};
			if (firstPage > 1) {
				result.prevPage = firstPage - 1;
			}
			if (lastPage < totalPage) {
				result.nextPage = lastPage + 1;
			}
			return result
		};

		/*	기존 트리 메뉴 생성 체크 처리	*/
		CommUtil.checkTreeMenu = function() {
			if (!isNull(CommData.menuList) && CommData.menuList.rows.length > 0) {
				CommUtil.createTreeMenu();
			} else {
				/*	기존 메뉴 정보가 없을 경우, 새로 조회 및 Tree 재성성	*/
				CommUtil.authFilter(function() {
					CommUtil.createTreeMenu();
				});
			}
		};

		/*	트리 메뉴 생성 기능	*/
		CommUtil.createTreeMenu = function(type) {
			var pLevel		= 'ROOT_MENU',
				resultList	= [],
				menuList	= _.clone(CommData.menuList.rows);

				/*	개발계 및 테스트시 MDI 임시 메뉴들을 합쳐서 생성함. 개발 후, 삭제 처리 해주세요.	*/
				menuList = _.union(menuList, _.clone(CommData.mdiTestMenus));

			/**
			 * Tree 생성 후, 공통영역 CommData.currentTreeList에 저장.
			 * 하위 메뉴가 없는 최상위 메뉴는 제거.
			 */
			CommData.currentTreeList = _.reject(CommUtil.buildTreeMenu(pLevel, resultList, menuList), function(item) {
				return isNull(item.children);
			});

			$rootScope.roleList = CommData.currentTreeList;
		};

		/**
		 * CommData.MenuList를 TreeMenu로 변경
		 * 시작조건 : buildOrganTree(level : 0, resultList : [], CommData.menuList : object Array);
		 *
		 * @param upMenuId		: 부모코드
		 * @param resultList	: children 결과 리스트
		 * @param menuList		: 현재 사용자 메뉴 리스트
		 * @returns {*}
		 */
		CommUtil.buildTreeMenu = function (upMenuId, resultList, menuList) {

			_.each(menuList, function(map){
				/*	upMenuId이 0 (level)과 같거나 or 현재 기준 부모코드와 자신의 부모 코드값이 같으면, children Object Array 생성	*/

				//console.log(upMenuId === map.level, upMenuId === map.upMenuId);
				if (upMenuId === map.level || upMenuId === map.upMenuId) {
					map.children = [];
					resultList.push(map);	// 두번째 params, children에 현재 조직정보 push
				}
			});

			/*	1. 종료조건 : data 안에 pc 를 pcode 값으로 하는 자료가 하나도 없을 때	*/
			if (resultList.length == 0) return resultList;

			/*	2. 처리 : children 에 들어간 전체 항목에 대해 각 항목의 code 값을 부모 값으로 하는 data 를 찾아 넣도록 재귀 처리	*/
			for (var i=0; i<resultList.length; i++) {
				var tempObj = resultList[i];
				CommUtil.buildTreeMenu(tempObj.id, tempObj.children, menuList);
				if (tempObj.children.length == 0){
					delete tempObj.children;
				}
			}

			return resultList;
		};

		/**
		 * 개발계 로그인 사용자 메뉴 리스트 조회
		 */
		CommUtil.menuSelectList = function(callback) {
			CommUtil.ngAjax({url: CommData.ContextPath + 'menu/selectList.json', method: 'post', param: {}, successFun: function (data, status) {
				$log.log(data, status);
				try {
					var jsonData = data;
					if (jsonData) {
						CommData.menuList = jsonData;
						callback();
					} else {
						dialogs.error('Server Error : ' +  status, '데이터 조회를 실패하였습니다.');
						$log.warn(data, status);
					}
				} catch (ex) {
					$log.error({errorObj: ex});
				}
			}});
		};

		/**
		 * 로컬 저장소에 공통 코드 저장
		 * @param CommCode
		 */
		CommUtil.setCodeLocalStorage = function(CommCode) {
			var CodeList = CommCode;
			if (isNull(CommCode)) {
				if (CommData.CodeList.length > 0) {
					CodeList = CommData.CodeList;
				} else if (CommData.isLoginPass == true) {
					// CommCode 및 CommData.CodeList가 없을 경우, 임시 데이터 셋팅
					CodeList = CommData.MockCodeList;
				}
			}
			$log.log(CodeList);
			localStorage.setItem('CommCode', JSON.stringify(CodeList));

			CommUtil.createFlattenCodeList();
		};

		/**
		 * 로컬 저장소의 공통 코드 호출
		 * @returns {*}
		 */
		CommUtil.getCodeLocalStorage = function() {
			var codeList = JSON.parse(localStorage.getItem('CommCode'));
			return !isNull(codeList) && codeList.length > 0 ? codeList : [];
		};

		/**
		 * 공통코드 flatten 처리하여, CommData.FlattenCodeList에 입력
		 */
		CommUtil.createFlattenCodeList = function() {
			var localCodeList = CommUtil.getCodeLocalStorage();
			if (!isNull(localCodeList) && localCodeList.length > 0) {
				CommData.FlattenCodeList = _.flatten(_.pluck(localCodeList, 'groupList'));
			} else {
				dialogs.error('Client Error', 'Not exist CommCodeList in Local Storage');
				return false;
			}
		};

		/**
		 * 디테일 코드로 FlattenCodeList에서 해당 코드 Object를 리턴
		 * @param dtlCd
		 */
		CommUtil.getCommCodeObj = function(dtlCd) {
			if (CommData.FlattenCodeList.length <= 0) {
				CommUtil.createFlattenCodeList();
			}

			var resultObj = {};
			if (!isNull(dtlCd)) {
				if (CommData.FlattenCodeList.length <= 0) {
					dialogs.error('System Error', '공통코드 리스트 오류 입니다.');
					return resultObj;
				}
				resultObj = _.findWhere(CommData.FlattenCodeList, {dtlCd: dtlCd});
			}
			return resultObj
		};

		/**
		 * 디테일 코드로 FlattenCodeList에서 코드이름을 조회하여 리턴
		 * @param dtlCd
		 */
		CommUtil.getCommCodeName = function(dtlCd) {
			if (CommData.FlattenCodeList.length <= 0) {
				CommUtil.createFlattenCodeList();
			}

			var resultObj = {dtlCdNm : ''};
			if (!isNull(dtlCd)) {
				resultObj = _.findWhere(CommData.FlattenCodeList, {dtlCd: dtlCd});
			}
			return resultObj.dtlCdNm
		};

		/**
		 * 공통코드 리스트 조회
		 */
		CommUtil.codeMngList = function(callback) {
			if (CommUtil.getCodeLocalStorage().length <= 0) {
				CommUtil.ngAjax({url: CommData.ContextPath +  'codeMng/list.json', method: 'post', param: {}, successFun: function (data, status) {
					$log.log(data, status);
					try {
						var jsonData = data;
						if (jsonData.codeListVOList) {
							CommData.CodeList = jsonData.codeListVOList;
							CommUtil.setCodeLocalStorage(jsonData.codeListVOList);		// 공통 코드 로컬저장소에 등록
							CommUtil.createFlattenCodeList();
							callback();
						} else {
							dialogs.error('Server Error : ' +  status, '데이터 조회를 실패하였습니다.');
							$log.warn(data, status);
						}
					} catch (ex) {
						$log.error({errorObj: ex});
					}
				}});
			}
		};

		return CommUtil
	});

});