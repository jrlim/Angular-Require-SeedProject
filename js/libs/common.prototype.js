/**
 * KT Open BSS JavaScript Prototype
 */

/**
 * Trim 함수 구현
 * use
 * trim	: '   s      s e tststset       '.trim()
 * ltrim	: '   s      s e tststset       '.ltrim()
 * rtrim	: '   s      s e tststset       '.rtrim()
 */
String.prototype.ltrim = function() {
	var re = /\s*((\S+\s*)*)/;
	return this.replace(re, "$1");
};
String.prototype.rtrim = function() {
	var re = /((\s*\S+)*)\s*/;
	return this.replace(re, "$1");
};
String.prototype.trim = function() {
	return this.ltrim().rtrim();
};

/**
 * string String::cut(int len)
 * 글자를 앞에서부터 원하는 바이트만큼 잘라 리턴합니다.
 * 한글의 경우 2바이트로 계산하며, 글자 중간에서 잘리지 않습니다.
 */
String.prototype.cut = function(len) {
	var str = this;
	var l = 0;
	for (var i=0; i<str.length; i++) {
		l += (str.charCodeAt(i) > 128) ? 2 : 1;
		if (l > len) return str.substring(0,i) + "...";
	}
	return str;
};

/**
 * bool String::bytes(void)
 * 해당스트링의 바이트단위 길이를 리턴합니다. (기존의 length 속성은 2바이트 문자를 한글자로 간주합니다)
 */
String.prototype.bytes = function() {
	var str = this;
	var l = 0;
	for (var i=0; i<str.length; i++) l += (str.charCodeAt(i) > 128) ? 2 : 1;
	return l;
};

/**
 * 알파벳과 숫자만 포함인지 체크
 * 주로 아이디 검사시 사용
 */
String.prototype.isAlphaNumeric = function() {
	var sAlphabet	= "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

	for(var i=0; i<this.length; i++ ) {
		if ( sAlphabet.indexOf(this.substring(i, i+1)) < 0 ) {
			return false;
		}
	}
	return true;
};


/**
 * 특수 문자 체크
 * @returns {Boolean}
 */
String.prototype.specialCharCheck = function() {
	if( RegularExt.specialChar.test(this) == true ){
		return false;
	}
	return true;
};

/**********************************
 * 숫자인지 체크
 * 주로 아이디 검사시 사용
 **********************************/
String.prototype.isNumber = function() {
	return jQuery.isNumeric(this);
};

/**
 * URL이 맞는지 확인
 */
String.prototype.isValidURL = function() {
	return RegularExt.url.test(this);
};

/**
 * 이메일 주소가 맞는지 확인
 */
String.prototype.isValidEmail = function() {
	return RegularExt.email.test(this);
};



/**
 * date를 날짜 포멧으로 변환해 준다.
 * @returns {String}
 */
Date.prototype.yyyymmdd = function(dash) {
	var yyyy = this.getFullYear().toString();
	var mm = (this.getMonth()+1).toString();
	var dd  = this.getDate().toString();
	if( !dash ) dash = "-";
	return yyyy + dash + (mm[1]?mm:"0"+mm[0]) + dash + (dd[1]?dd:"0"+dd[0]);
};

/**********************************
 * 배열 remove 함수 구현
 * index 값으로 제거
 **********************************/
Array.prototype.remove = function(idx) {
	var temp = new Array();
	var i = this.length;

	while( i > idx ) {
		var kk = this.pop();
		temp.push(kk);

		i--;
	}

	for(var i=temp.length - 2; i>=0; i--) {
		this.push(temp[i]);
	}
};

/**********************************
 * 배열 remove 함수 구현
 * Value 값으로 제거
 **********************************/
Array.prototype.removeValue = function(val) {

	var chkIdx = -1;
	for(var i=0; i<this.length; i++) {
		var tempVal = this[i];
		if( tempVal == val ) {
			chkIdx = i;
			break;
		}
	}
	if( chkIdx != -1 ) {
		this.remove(chkIdx);
	}
};

Array.prototype.contains = function(obj) {
	var i = this.length;
	while (i--) {
		if (this[i] == obj) {
			return true;
		}
	}
	return false;
};

Array.prototype.containKeyIndex = function(obj) {
	var returnIndex = -1;
	for(var i=0; i<this.length; i++ ) {
		if (this[i] == obj) {
			returnIndex = i;
			break;
		}
	}

	return returnIndex;
};

Array.prototype.remove = function(from, to) {
	var rest = this.slice((to || from) + 1 || this.length);
	this.length = from < 0 ? this.length + from : from;
	return this.push.apply(this, rest);
};

/*	중복 제거	*/
Array.prototype.unique = function() {
	var a = {};
	for(var i=0; i <this.length; i++){
		if(typeof a[this[i]] == "undefined")
			a[this[i]] = 1;
	}
	this.length = 0;
	for(var i in a)
		this[this.length] = i;
	return this;
};

/**
 * 콜라비 공통 함수 모음
 */
var commProto = {
	/**
	 * url을 추출해서 링크로 만들어 준다.
	 * @param text
	 * @returns
	 *
	 * usage : commProto.fn.replaceURLWithHTMLLinks
	 */
	replaceURLWithHTMLLinks : function(text) {
		var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
		return text.replace(exp, '<a href="$1" target="_blank">$1</a>');
	}

	/**
	 * java.util.Date 포맷의 날짜 차이 레이블
	 * @param viewDateStr
	 * @return String
	 *
	 * usage : commProto.fn.getTimeDiffLabel
	 */
	, getTimeDiffLabel : function(viewDateStr) {
		var nowDate		= new Date();
		var viewDate	= new Date(viewDateStr.slice(0, 4), viewDateStr.slice(4, 6) - 1, viewDateStr.slice(6, 8), viewDateStr.slice(8, 10), viewDateStr.slice(10, 12), viewDateStr.slice(12, 14));

		var diff = nowDate.getTime() - viewDate.getTime();

		var sec = parseInt(diff/1000);
		if (sec < 5) return "지금막";
		if (sec < 60) return sec+" 초전";

		var min = parseInt(sec/60);
		if (min < 60) return min+" 분전";

		var hour = parseInt(min/60);
		if (hour < 24) return hour+" 시간전";


		var day = parseInt(diff/1000/60/60/24);
		if (day <= 0) {
			day = hour / 24;
		}

		if( hour/24 < 30 ) {
			if (day == 1) return "어제";
			if (day == 2) return "그저께";
			return (day+" 일전");
		}

		var month = parseInt(hour/24/30);
		if (month == 1) return "한달전";
		if (month == 2) return "두달전";
		if (month < 12) return (month+" 달전");

		var year = parseInt(month/12);
		if (year == 1) return "작년";
		return (year+" 년전");
	}
	/**
	 * 로깅한다.
	 * usage : commProto.logger
	 */
	, logger : function(paramObj) {
		try {
			var reqParam = {};
			/*	현재 시간	*/
			reqParam.currentTime = (new Date()).toString();
			reqParam.loggingData = paramObj;
			/**
			 * TODO 현재 사용자 정보나 기타 정보 셋팅
			 */
			reqParam.userAuth	= userAuth;
			reqParam.hakwonInfo	= hakwonInfo;

			console.log('reqParam', reqParam);
			$.ajax({
				url : contextPath+'/logging.log',
				contentType: 'application/json; charset=utf-8;',
				data: JSON.stringify(reqParam),
				type : 'post',
				dataType : 'text',
				crossDomain : true,
				cache : false,
				success : function() { console.warn('logger api call'); },
				error : function(request, status, error) {
					console.error('logger api call Exception', request, status, error);
				}
			});
		} catch(e) {
			console.error(e);
		}
	}
	/**
	 * 에러 객체 덤프(로깅도 한다.)
	 * commProto.errorDump(errorData);
	 * 	errorCode
	 * 	errorObj
	 * 	customData
	 */
	, errorDump : function(errorData) {
		try {
			var errorCode = errorData.errorCode;
			var errorObj = errorData.errorObj;
			var customData = errorData.customData;

			var errorMsgObj = {};
			errorMsgObj.errorCode = errorCode;
			errorMsgObj.errorObj = errorObj;
			errorMsgObj.customData = customData;
			var viewMsg = errorCode;
			if (typeof errorObj === 'object') {
				if (errorObj.message) {
					viewMsg += '\nMessage: ' + errorObj.message;
					errorMsgObj.message = errorObj.message;
				}
				if (errorObj.stack) {
					viewMsg += '\nStacktrace:';
					viewMsg += '\n====================\n';
					viewMsg += errorObj.stack;
					errorMsgObj.stack = errorObj.stack;
				}
			} else {
				viewMsg += ('\ndumpError :: argument is not an object['+errorObj+']');
				errorMsgObj.message = 'dumpError :: argument is not an object';
			}
			console.error(viewMsg);
			commProto.logger(errorMsgObj);
		} catch(e) {
			console.error(e);
		}
	}
	/**
	 * 공통 에러
	 * commProto.commonError
	 */
	, commonError : function(xhr, textStatus, errorThrown) {
		try {
			if( xhr.readyState == 4 ) {
				if( xhr.status == 0 ) {
					alert("네트워크 상태를 확인해 주세요.");
					return false;
				} else if( xhr.status == 403 ) {
					alert("접근 권한이 없습니다.");
					return false;
				} else if( xhr.status == 404 ) {
					alert("요청 URL을 확인할 수 없습니다.");
					return false;
				}
			}
			if((window['console'] !== undefined)) {
				console.log('[commonErrorFun] xhr['+JSON.stringify(xhr)+'] textStatus['+textStatus+'] errorThrown[\n'+errorThrown+']');
			}
			commProto.logger({xhr:xhr, textStatus:textStatus, errorThrown:errorThrown});
			var data = JSON.parse(xhr.responseText);
			alert(data.errorMessage?data.errorMessage:"시스템 에러가 발생 했습니다.");
		} catch (e) {
			/*	Unexpected end of input	*/
			commProto.errorDump({errorObj:e});
		}
	}

	/*	숫자만 입력 가능하게	*/
	/*	commProto.onlyNumber	*/
	, onlyNumber : function(e) {
		if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
			//	Allow: Ctrl+A
			(e.keyCode == 65 && e.ctrlKey === true) ||
			//	tab
			(e.keyCode == 9 ) ||
			//	Allow: home, end, left, right, down, up
			(e.keyCode >= 35 && e.keyCode <= 40)) {
			//	let it happen, don't do anything
			return;
		}
		// Ensure that it is a number and stop the keypress
		if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
			e.preventDefault();
		}
	}
	/*	숫자 콤바 추가	*/
	/*	commProto.numberWithCommas	*/
	, numberWithCommas : function(x) {
		if( !x ) return '0';
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	/**
	 * history.back 또는 url 이동
	 * commProto.hrefMove
	 */
	, hrefMove : function(moveUrl) {
		if (window.history.length > 1) {
			window.history.back();
		} else {
			window.location.href = moveUrl;
		}
	}
};

/**
 * 테이블 머지 한다.
 */
function groupTable($rows, startIndex, total) {
	if (total === 0) {
		return;
	}
	var i , currentIndex = startIndex, count=1, lst=[];
	var tds = $rows.find('td:eq('+ currentIndex +')');
	console.log('tds', tds);
	var ctrl = $(tds[0]);
	lst.push($rows[0]);
	for (i=1;i<=tds.length;i++) {
		if (ctrl.text() ==  $(tds[i]).text()) {
			count++;
			$(tds[i]).addClass('deleted');
			lst.push($rows[i]);
		} else {
			if (count>1) {
				ctrl.attr('rowspan',count);
				groupTable($(lst),startIndex+1,total-1);
			}
			count=1;
			lst = [];
			ctrl=$(tds[i]);
			lst.push($rows[i]);
		}
	}
}

/*	숫자만 입력 가능하게	*/
function onlyNumber(evt) {
	var theEvent = evt || window.event;
	var key = theEvent.keyCode || theEvent.which;
	key = String.fromCharCode( key );
	var regex = /[0-9]|\./;
	if( !regex.test(key) ) {
		theEvent.returnValue = false;
		if(theEvent.preventDefault) theEvent.preventDefault();
	}
}

/*****************************************************
 * 바로 사용할수 있는 함수
 *****************************************************/

/**
 * null 체크 함수
 * @param val
 * @returns {Boolean}
 */
function isNull(val) {
	if( !val ) {
		return true;
	} else if( typeof(val) == "undefined" ) {
		return true;
	} else if( val == null ) {
		return true;
	}



	if( typeof(val) != "string" ) {
		val = String(val);
	}

	if( val.trim() == "" ) {
		return true;
	} else {
		return false;
	}
}

/**
 * UUID 생성 함수
 * @returns {string}
 */
function generateUID() {
	return ("0000" + (Math.random()*Math.pow(36,4) << 0).toString(36)).slice(-6)
}

function generateUUID(){
	var d = new Date().getTime();
	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = (d + Math.random()*16)%16 | 0;
		d = Math.floor(d/16);
		return (c=='x' ? r : (r&0x3|0x8)).toString(16);
	});
	return uuid;
}

var COMMON_DATA = {
	USER_INFO : ''
};

var MOCK_DATA  = {
	USER_INFO : {
		'authorities': [
			{'authority': 'ROLE_BILL_MNG'},
			{'authority': 'ROLE_CUST_MNG'},
			{'authority': 'ROLE_PROD_MNG'}
		],
		'menu': [

		],
		'memberInfo': {
			'id': 'hong',
			'password': 'hong1234',
			'name': '홍길동',
			'authorities': [
				{'authority': 'ROLE_BILL_MNG'},
				{'authority': 'ROLE_CUST_MNG'},
				{'authority': 'ROLE_PROD_MNG'}
			],
			'username': 'hong',
			'enabled': true,
			'accountNonExpired': true,
			'accountNonLocked': true,
			'credentialsNonExpired': true
		}
	}
};

