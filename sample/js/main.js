
'use strict';
requirejs.config({
	baseUrl : 'js',
	paths:{
		'jquery'			: 'libs/jquery-1.11.2/jquery-1.11.2.min',
		'text'				: 'libs/requirejs-2.1.15/text.min',
		'angular'			: 'libs/angular-1.3.8/angular',
		'ngRoute'			: 'libs/angular-1.3.8/angular-route',
		'ngTouch'			: 'libs/angular-1.3.8/angular-touch',
		'ui.bootstrap'		: 'libs/angular-1.3.8/ui-bootstrap-tpls-0.12.0',
		'underscore'		: 'libs/underscore-1.7.0/underscore-1.7.0.min'
	},
	
/*
	shim:
	AMD 형식을 지원하지 않는 라이브러리의 경우 아래와 같이 SHIM을 사용해서 모듈로 불러올 수 있다.
*/
	shim:{
		'angular' : {
			exports : 'angular'
		},
		'ngRoute' : {
			deps 	: ['angular']
		},
		'ngTouch' : {
			deps 	: ['angular']
		},
		'ui.bootstrap' : {
			deps 	: ['angular']
		},
		'underscore' : {
			exports 	: ['_']
		}
	}

	// 모듈 위치 URL 뒤에 덧붙여질 쿼리를 설정한다.
	// 개발 환경에서는 브라우저 캐시를 회피하고, 실제 서비스 환경에서는 ts값을 배포 시간으로 설정하여 클라이언트 캐시를 갱신하게 할 수 있다.
	// urlArgs : 'ts=' + (new Date()).getTime()

});

//requireJS를 활용하여 모듈 로드
requirejs( [
		'jquery', 			//미리 선언해둔 path, jQuery는 AMD를 지원하기 때문에 이렇게 로드해도 jQuery 또는 $로 호출할 수 있다.
		'angular',			//미리 선언해둔 angular path
		'underscore',
		'ngRoute',
		'ngTouch',
		'ui.bootstrap',
		'app',				// app.js			: Angular module load
		'routes'			// routes.js		: Route config
	],
	//디펜던시 로드뒤 콜백함수
	function ($, angular, _) {
		//이 함수는 위에 명시된 모든 디펜던시들이 다 로드된 뒤에 호출된다.
		//주의해야할 것은, 디펜던시 로드 완료 시점이 페이지가 완전히 로드되기 전 일 수도 있다는 사실이다.

		console.log('Complete Loaded Dependency JS ---> require.config()');

		//페이지가 완전히 로드된 뒤에 실행
		angular.element(document).ready(function () {
			angular.bootstrap(document, ['sampleApp']);
		});

	}
);
