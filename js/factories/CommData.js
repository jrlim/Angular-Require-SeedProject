/**
 * 공통 Data
 */
define([
	'app'
], function (ngApp) {
	"use strict";
	return ngApp.factory('CommData', function() {

		/* APP Information Definition */

		var CommData = {};

		/**
		 * 기본 정보
		 * @type {string}
		 */
		CommData.ContextPath = '';	// ex) http://127.0.0.1:8080

		/**
		 * 앱 기본 정보
		 * @type {{Version: string, Project: string, Name: string}}
		 */
		CommData.AppInfo = {
			Version			: '0.1.3',
			Project			: 'KT OpenS/W 기반 M2M BSS',
			Name			: 'KT Open BSS',
			isDev			: true,
			isForceLogout	: false,
			isLoginPass 	: true
		};

		/**
		 * 로그인 사용자 정보 및 개발시 로그인 정책 설정
		 * @type {{isLoggedIn: boolean, isLoginPass: boolean, userInfo: {}}}
		 */
		CommData.AuthInfo = {
			isLoggedIn	: false,
			Authorities : [],
			UserInfo	: {}
		};

		/**
		 * 공통 코드 생성일 및 공통 코드 생성일 체크
		 * @type {string}
		 */
		CommData.CommCode = { CreateDate : '2015.01.05'};

		/**
		 * 임시 클라이언트 정보. 실제 로그인 구현시 불필요.
		 * @type {{no: number, code: string, name: string, title: string, tel: string, addr: string, config: {}, cssPath: string}[]}
		 */
		CommData.ClientInfo = [
			{
				no 		: 1,
				code	: '1001',
				name	: 'KT',
				title	: 'Olleh KT',
				tel		: '031-1111-2222',
				addr	: '경기도 성남시 분당구 정자동 KT 본사',
				config	: {},
				cssPath	: ''
			},
			{
				no 		: 2,
				code	: '1002',
				name	: 'KTDS',
				title	: 'KTDS',
				tel		: '031-1111-2222',
				addr	: '경기도 성남시 분당구 정자동 KT 본사',
				config	: {},
				cssPath	: ''
			},
			{
				no 		: 3,
				code	: '1003',
				name	: 'HYUNDAI',
				title	: '현대 자동차',
				tel		: '031-3333-4444',
				addr	: '서욽특별시 양재동 현대 자동차 사옥',
				config	: {},
				cssPath	: 'css/hyundai.css'
			},
			{
				no 		: 4,
				code	: '1004',
				name	: 'KIA',
				title	: '기아 자동차',
				tel		: '031-5555-6666',
				addr	: '서욽특별시 양재동 기아 자동차 사옥',
				config	: {},
				cssPath	: 'css/kia.css'
			}
		];

		CommData.getAppInfo = function () {
			return CommData.AppInfo.Name;
		};

		CommData.getVersion = function () {
			return CommData.AppInfo.Version;
		};


		CommData.OpenBssData = {
			Menus : {
				treeMenu1 : [
					{ "menuNm" : "User", "id" : "role1", "children" : [
						{ "menuNm" : "subUser1", "id" : "role11", "children" : [] },
						{ "menuNm" : "subUser2", "id" : "role12", "children" : [
							{ "menuNm" : "subUser2-1", "id" : "role121", "children" : [
								{ "menuNm" : "subUser2-1-1", "id" : "role1211", "children" : [] },
								{ "menuNm" : "subUser2-1-2", "id" : "role1212", "children" : [] }
							]}
						]}
					]},

					{ "menuNm" : "Admin", "id" : "role2", "children" : [] },

					{ "menuNm" : "Guest", "id" : "role3", "children" : [] }
				],
				treeMenu2 : [
					{ "menuNm" : "User", "id" : "role1", "children" : [
						{ "menuNm" : "subUser1", "id" : "role11", "collapsed" : true, "children" : [] },
						{ "menuNm" : "subUser2", "id" : "role12", "collapsed" : true, "children" : [
							{ "menuNm" : "subUser2-1", "id" : "role121", "children" : [
								{ "menuNm" : "subUser2-1-1", "id" : "role1211", "children" : [] },
								{ "menuNm" : "subUser2-1-2", "id" : "role1212", "children" : [] }
							]}
						]}
					]},

					{ "menuNm" : "Admin", "id" : "role2", "children" : [
						{ "menuNm" : "subAdmin1", "id" : "role11", "collapsed" : true, "children" : [] },
						{ "menuNm" : "subAdmin2", "id" : "role12", "children" : [
							{ "menuNm" : "subAdmin2-1", "id" : "role121", "children" : [
								{ "menuNm" : "subAdmin2-1-1", "id" : "role1211", "children" : [] },
								{ "menuNm" : "subAdmin2-1-2", "id" : "role1212", "children" : [] }
							]}
						]}
					]},

					{ "menuNm" : "Guest", "id" : "role3", "children" : [
						{ "menuNm" : "subGuest1", "id" : "role11", "children" : [] },
						{ "menuNm" : "subGuest2", "id" : "role12", "collapsed" : true, "children" : [
							{ "menuNm" : "subGuest2-1", "id" : "role121", "children" : [
								{ "menuNm" : "subGuest2-1-1", "id" : "role1211", "children" : [] },
								{ "menuNm" : "subGuest2-1-2", "id" : "role1212", "children" : [] }
							]}
						]}
					]}
				]
			}
		};

		CommData.userListMock = [
		];

		/**
		 * 트리로 변환전 mock 메뉴 리스트
		 * @type {{total: number, page: number, records: number, rows: *[]}}
		 */
		CommData.menuList = {
			total	: 0,
			page	: 0,
			records	: 0,
			rows	: [
//				{endRowNum: 0, id: '00000001', indcOdrg: 1, level: 0, menuDesc: '고객관리', 	menuLvl: 1, menuNm: '고객', 		nd: 0, page: 0, pgmId: 'AAA-00001', rNum: 0, rowCnt: 0, rows: 0, search: false, startRowNum: 0, upMenuId: 'ROOT_MENU', urlAdr: '/userMng', userYn: 'Y'},
//				{endRowNum: 0, id: '00000004', indcOdrg: 1, level: 0, menuDesc: '청구관리', 	menuLvl: 1, menuNm: '청구', 		nd: 0, page: 0, pgmId: 'BBB-00000', rNum: 0, rowCnt: 0, rows: 0, search: false, startRowNum: 0, upMenuId: 'ROOT_MENU', urlAdr: '/bill', userYn: 'Y'},
//				{endRowNum: 0, id: '00000008', indcOdrg: 1, level: 0, menuDesc: '자식없음', 	menuLvl: 1, menuNm: '자식없음', 	nd: 0, page: 0, pgmId: 'CCC-00000', rNum: 0, rowCnt: 0, rows: 0, search: false, startRowNum: 0, upMenuId: 'ROOT_MENU', urlAdr: '/test', userYn: 'Y'},
//				{endRowNum: 0, id: '00000002', indcOdrg: 1, level: 1, menuDesc: '사용자 목록', menuLvl: 2, menuNm: '고객 조회', 	nd: 0, page: 0, pgmId: 'AAA-00001', rNum: 0, rowCnt: 0, rows: 0, search: false, startRowNum: 0, upMenuId: '00000001', urlAdr: '/userMng/list', userYn: 'Y'},
//				{endRowNum: 0, id: '00000005', indcOdrg: 1, level: 1, menuDesc: '청구 목록', 	menuLvl: 2, menuNm: '청구 조회', 	nd: 0, page: 0, pgmId: 'BBB-00001', rNum: 0, rowCnt: 0, rows: 0, search: false, startRowNum: 0, upMenuId: '00000004', urlAdr: '/bill/list', userYn: 'Y'},
//				{endRowNum: 0, id: '00000003', indcOdrg: 2, level: 1, menuDesc: '사용자 수정', menuLvl: 2, menuNm: '고객 등록', 	nd: 0, page: 0, pgmId: 'AAA-00001', rNum: 0, rowCnt: 0, rows: 0, search: false, startRowNum: 0, upMenuId: '00000001', urlAdr: '/userMng/save', userYn: 'Y'},
//				{endRowNum: 0, id: '00000006', indcOdrg: 2, level: 1, menuDesc: '청구 수정', 	menuLvl: 2, menuNm: '청구 등록', 	nd: 0, page: 0, pgmId: 'BBB-00002', rNum: 0, rowCnt: 0, rows: 0, search: false, startRowNum: 0, upMenuId: '00000004', urlAdr: '/bill/save', userYn: 'Y'}
			]
		};

		/**
		 * MDI 테스트 메뉴들
		 * @type {{endRowNum: number, id: string, indcOdrg: number, level: number, menuDesc: string, menuLvl: number, menuNm: string, nd: number, page: number, pgmId: string, rNum: number, rowCnt: number, rows: number, search: boolean, startRowNum: number, upMenuId: string, urlAdr: string, userYn: string}[]}
		 */
		CommData.mdiTestMenus = [
			{endRowNum: 0, id: 'mdi00001', indcOdrg: 1, level: 0, menuDesc: 'MDI목록',			menuLvl: 1, menuNm: 'MDI',	 		nd: 0,	page: 0, pgmId: 'MDI-00001', rNum: 0, rowCnt: 0, rows: 0, search: false, startRowNum: 0, upMenuId: 'ROOT_MENU', urlAdr: '#/mdi', userYn: 'Y'},
			{endRowNum: 0, id: 'mdi00002', indcOdrg: 1, level: 1, menuDesc: 'Compare View',		menuLvl: 2, menuNm: 'Compare',		nd: 0,	page: 0, pgmId: 'MDI-00002', rNum: 0, rowCnt: 0, rows: 0, search: false, startRowNum: 0, upMenuId: 'mdi00001', urlAdr: './partials/components/compare.html', userYn: 'Y'},
			{endRowNum: 0, id: 'mdi00003', indcOdrg: 1, level: 1, menuDesc: 'Grid View',		menuLvl: 2, menuNm: 'Grid',			nd: 0,	page: 0, pgmId: 'MDI-00003', rNum: 0, rowCnt: 0, rows: 0, search: false, startRowNum: 0, upMenuId: 'mdi00001', urlAdr: './partials/components/grid.html', userYn: 'Y'},
			{endRowNum: 0, id: 'mdi00004', indcOdrg: 1, level: 1, menuDesc: 'Nested View',		menuLvl: 2, menuNm: 'Nested',		nd: 0,	page: 0, pgmId: 'MDI-00004', rNum: 0, rowCnt: 0, rows: 0, search: false, startRowNum: 0, upMenuId: 'mdi00001', urlAdr: './partials/views/temp/nested.html',	userYn: 'Y'}
//			{endRowNum: 0, id: 'mdi00006', indcOdrg: 1, level: 1, menuDesc: 'Cust View',		menuLvl: 2, menuNm: 'Cust',	 		nd: 0,	page: 0, pgmId: 'MDI-00006', rNum: 0, rowCnt: 0, rows: 0, search: false, startRowNum: 0, upMenuId: 'mdi00001', urlAdr: './partials/views/cust/custList.html', userYn: 'Y'}
		];

		/**
		 * 현재 사용자의 정렬된 트리메뉴
		 * @type {Array}
		 */
		CommData.currentTreeList = [];

		/**
		 * GridController 테스트 그리드 데이터
		 * @type {*[]}
		 */
		CommData.categories = [
			{"idx":1,"name":"고용노동부","code":"1492000","pcode":"0","epub_count":0,"pdf_count":31,"status":"y","children":[{"idx":2,"name":"근로복지공단","code":"B490001","pcode":"1492000","epub_count":0,"pdf_count":2,"status":"y"},{"idx":3,"name":"한국고용정보원","code":"B551904","pcode":"1492000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":4,"name":"한국산업안전보건공단","code":"B552468","pcode":"1492000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":5,"name":"한국산업인력공단","code":"B490007","pcode":"1492000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":6,"name":"한국장애인고용공단","code":"B552583","pcode":"1492000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":7,"name":"한국승강기안전기술원","code":"B552662","pcode":"1492000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":8,"name":"한국사회적기업진흥원","code":"B552745","pcode":"1492000","epub_count":0,"pdf_count":1,"status":"y"},{"idx":9,"name":"건설근로자공제회","code":"B552711","pcode":"1492000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":10,"name":"노사발전재단","code":"B552146","pcode":"1492000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":11,"name":"학교법인한국폴리텍","code":"B552014","pcode":"1492000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":12,"name":"한국기술교육대학교","code":"7004123","pcode":"1492000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":13,"name":"한국잡월드","code":"B552836","pcode":"1492000","epub_count":0,"pdf_count":0,"status":"y"}]},{"idx":14,"name":"교육부","code":"1340000","pcode":"0","epub_count":0,"pdf_count":1,"status":"y","children":[{"idx":15,"name":"사립학교교직원연금관리공단","code":"B550257","pcode":"1340000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":16,"name":"한국교육학술정보원","code":"B550629","pcode":"1340000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":17,"name":"한국장학재단","code":"B552529","pcode":"1340000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":18,"name":"강릉원주대학교치과병원","code":"B552632","pcode":"1340000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":19,"name":"강원대학교병원","code":"B551191","pcode":"1340000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":20,"name":"경북대학교병원","code":"B550484","pcode":"1340000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":21,"name":"경상대학교병원","code":"B550593","pcode":"1340000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":22,"name":"부산대학교병원","code":"B550554","pcode":"1340000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":23,"name":"부산대학교치과병원","code":"B552853","pcode":"1340000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":24,"name":"서울대학교병원","code":"B550297","pcode":"1340000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":25,"name":"서울대학교치과병원","code":"B551406","pcode":"1340000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":26,"name":"전남대학교병원","code":"B550528","pcode":"1340000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":27,"name":"전북대학교병원","code":"B550561","pcode":"1340000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":28,"name":"제주대학교병원","code":"B551190","pcode":"1340000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":29,"name":"충남대학교병원","code":"B550589","pcode":"1340000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":30,"name":"충북대학교병원","code":"B550590","pcode":"1340000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":31,"name":"한국고전번역원","code":"B552143","pcode":"1340000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":32,"name":"한국사학진흥재단","code":"B340004","pcode":"1340000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":33,"name":"한국학중앙연구원","code":"B551458","pcode":"1340000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":34,"name":"국가평생교육진흥원","code":"B552881","pcode":"1340000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":35,"name":"동북아역사재단","code":"B551961","pcode":"1340000","epub_count":0,"pdf_count":0,"status":"y"}]},{"idx":36,"name":"국방부","code":"1290000","pcode":"0","epub_count":0,"pdf_count":0,"status":"y","children":[{"idx":37,"name":"전쟁기념사업회","code":"B290004","pcode":"1290000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":38,"name":"한국국방연구원","code":"B290005","pcode":"1290000","epub_count":0,"pdf_count":0,"status":"y"}]},{"idx":39,"name":"국토교통부","code":"1613000","pcode":"0","epub_count":0,"pdf_count":17,"status":"y","children":[{"idx":40,"name":"인천국제공항공사","code":"B551177","pcode":"1613000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":41,"name":"한국공항공사","code":"B551178","pcode":"1613000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":42,"name":"대한주택보증주식회사","code":"B551889","pcode":"1613000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":43,"name":"제주국제자유도시개발센터","code":"B551391","pcode":"1613000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":44,"name":"한국감정원","code":"B190024","pcode":"1613000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":45,"name":"한국도로공사","code":"B500004","pcode":"1613000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":46,"name":"한국수자원공사","code":"B500001","pcode":"1613000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":47,"name":"한국토지주택공사","code":"B552555","pcode":"1613000","epub_count":1,"pdf_count":0,"status":"y"},{"idx":48,"name":"한국철도공사","code":"B551457","pcode":"1613000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":49,"name":"교통안전공단","code":"B500011","pcode":"1613000","epub_count":0,"pdf_count":5,"status":"y"},{"idx":50,"name":"국토교통과학기술진흥원","code":"B552989","pcode":"1613000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":51,"name":"대한지적공사","code":"B310008","pcode":"1613000","epub_count":0,"pdf_count":30,"status":"y"},{"idx":52,"name":"한국시설안전공단","code":"B552016","pcode":"1613000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":53,"name":"한국철도시설공단","code":"B551219","pcode":"1613000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":54,"name":"(주)워터웨이플러스","code":"B553218","pcode":"1613000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":55,"name":"(주)한국건설관리공사","code":"B551053","pcode":"1613000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":56,"name":"주택관리공단","code":"B552672","pcode":"1613000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":57,"name":"코레일관광개발(주)","code":"B552709","pcode":"1613000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":58,"name":"코레일네트웍스(주)","code":"B552692","pcode":"1613000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":59,"name":"코레일로지스(주)","code":"B552804","pcode":"1613000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":60,"name":"코레일유통(주)","code":"B552742","pcode":"1613000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":61,"name":"코레일테크(주)","code":"B552859","pcode":"1613000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":62,"name":"항공안전기술센터","code":"B553212","pcode":"1613000","epub_count":0,"pdf_count":0,"status":"y"}]},{"idx":63,"name":"기획재정부","code":"1051000","pcode":"0","epub_count":0,"pdf_count":0,"status":"y","children":[{"idx":64,"name":"한국조폐공사","code":"B190001","pcode":"1051000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":65,"name":"한국수출입은행","code":"B190031","pcode":"1051000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":66,"name":"한국투자공사","code":"B500003","pcode":"1051000","epub_count":0,"pdf_count":0,"status":"y"}]},{"idx":67,"name":"농림축산식품부","code":"1543000","pcode":"0","epub_count":0,"pdf_count":28,"status":"y","children":[{"idx":68,"name":"가축위생방역지원본부","code":"B552130","pcode":"1543000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":69,"name":"국제식물검역인증원","code":"B552860","pcode":"1543000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":70,"name":"농업정책자금관리단","code":"B551968","pcode":"1543000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":71,"name":"농림수산식품기술기획평가원","code":"B552559","pcode":"1543000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":72,"name":"농림수산식품교육문화정보원","code":"B552895","pcode":"1543000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":73,"name":"축산물품질평가원","code":"B552679","pcode":"1543000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":74,"name":"한국농수산식품유통공사","code":"B552845","pcode":"1543000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":75,"name":"한국농어촌공사","code":"B552149","pcode":"1543000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":76,"name":"한국마사회","code":"B370020","pcode":"1543000","epub_count":0,"pdf_count":0,"status":"y"}]},{"idx":77,"name":"문화체육관광부","code":"1371000","pcode":"0","epub_count":1,"pdf_count":18,"status":"y","children":[{"idx":78,"name":"한국관광공사","code":"B370001","pcode":"1371000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":79,"name":"서울올림픽기념국민체육진흥공단","code":"B551014","pcode":"1371000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":80,"name":"한국문화예술위원회","code":"B551510","pcode":"1371000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":81,"name":"영화진흥위원회","code":"B551004","pcode":"1371000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":82,"name":"한국언론진흥재단","code":"B552648","pcode":"1371000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":83,"name":"국제방송교류재단","code":"B551024","pcode":"1371000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":84,"name":"한국콘텐츠진흥원","code":"B552644","pcode":"1371000","epub_count":1,"pdf_count":11,"status":"y"},{"idx":85,"name":"한국출판문화산업진흥원","code":"B552916","pcode":"1371000","epub_count":0,"pdf_count":1,"status":"y"},{"idx":86,"name":"한국체육산업개발(주)","code":"B552024","pcode":"1371000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":87,"name":"한국저작권위원회","code":"B552546","pcode":"1371000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":88,"name":"한국영상자료원","code":"B370029","pcode":"1371000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":89,"name":"한국문화진흥(주)","code":"B550358","pcode":"1371000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":90,"name":"한국문화예술교육진흥원","code":"B551463","pcode":"1371000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":91,"name":"한국문화관광연구원","code":"B551940","pcode":"1371000","epub_count":0,"pdf_count":132,"status":"y"},{"idx":92,"name":"한국문학번역원","code":"B552132","pcode":"1371000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":93,"name":"한국공예디자인문화진흥원","code":"B552668","pcode":"1371000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":94,"name":"태권도진흥재단","code":"B552570","pcode":"1371000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":95,"name":"영상물등급위원회","code":"B551008","pcode":"1371000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":96,"name":"아시아문화개발원","code":"B552866","pcode":"1371000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":97,"name":"세종학당재단","code":"B552986","pcode":"1371000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":98,"name":"대한체육회","code":"B370006","pcode":"1371000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":99,"name":"대한장애인체육회","code":"B551551","pcode":"1371000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":100,"name":"그랜드코리아레저(주)","code":"B552719","pcode":"1371000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":101,"name":"국민생활체육회","code":"B552538","pcode":"1371000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":102,"name":"국립박물관문화재단","code":"B552854","pcode":"1371000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":103,"name":"게임물관리위원회","code":"B553062","pcode":"1371000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":104,"name":"(재)한국문화정보센터","code":"B552813","pcode":"1371000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":105,"name":"(재)한국공연예술센터","code":"B552862","pcode":"1371000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":106,"name":"(재)체육인재육성재단","code":"B552720","pcode":"1371000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":107,"name":"(재)예술의전당","code":"B550433","pcode":"1371000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":108,"name":"(재)예술경영지원센터","code":"B552867","pcode":"1371000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":109,"name":"(재)명동 정동 극장","code":"B550618","pcode":"1371000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":110,"name":"(재)국악방송","code":"B552661","pcode":"1371000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":111,"name":"(사)한국문화예술회관연합회","code":"B552734","pcode":"1371000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":368,"name":"국립세종도서관","code":"1370104","pcode":"1371000","epub_count":1,"pdf_count":0,"status":"y"}]},{"idx":112,"name":"미래창조과학부","code":"1710000","pcode":"0","epub_count":0,"pdf_count":2,"status":"y","children":[{"idx":113,"name":"한국방송통신전파진흥원","code":"B552729","pcode":"1710000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":114,"name":"(재)우체국금융개발원","code":"B552886","pcode":"1710000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":115,"name":"(재)한국우편사업진흥원","code":"B552844","pcode":"1710000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":116,"name":"우체국물류지원단","code":"B552907","pcode":"1710000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":117,"name":"정보통신산업진흥원","code":"B552551","pcode":"1710000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":118,"name":"한국과학창의재단","code":"B552111","pcode":"1710000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":119,"name":"한국연구재단","code":"B552540","pcode":"1710000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":120,"name":"한국인터넷진흥원","code":"B551505","pcode":"1710000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":121,"name":"한국정보화진흥원","code":"B552537","pcode":"1710000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":122,"name":"(재)우체국시설관리단","code":"B552857","pcode":"1710000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":123,"name":"광주과학기술원","code":"B550935","pcode":"1710000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":124,"name":"기초과학연구원","code":"B552824","pcode":"1710000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":125,"name":"기초기술연구회","code":"B551187","pcode":"1710000","epub_count":0,"pdf_count":0,"status":"y","children":[{"idx":126,"name":"한국과학기술연구원","code":"B090032","pcode":"B551187","epub_count":0,"pdf_count":0,"status":"y"},{"idx":127,"name":"한국기초과학지원연구원","code":"B551364","pcode":"B551187","epub_count":0,"pdf_count":0,"status":"y"},{"idx":128,"name":"한국천문연구원","code":"B090041","pcode":"B551187","epub_count":0,"pdf_count":0,"status":"y"},{"idx":129,"name":"한국생명공학연구원","code":"B551703","pcode":"B551187","epub_count":0,"pdf_count":0,"status":"y"},{"idx":130,"name":"한국한의학연구원","code":"B090018","pcode":"B551187","epub_count":0,"pdf_count":0,"status":"y"},{"idx":131,"name":"한국과학기술정보연구원","code":"B551186","pcode":"B551187","epub_count":0,"pdf_count":0,"status":"y"},{"idx":132,"name":"한국표준과학연구원","code":"B090025","pcode":"B551187","epub_count":0,"pdf_count":0,"status":"y"},{"idx":133,"name":"한국항공우주연구원","code":"B551959","pcode":"B551187","epub_count":0,"pdf_count":0,"status":"y"},{"idx":134,"name":"한국원자력연구원","code":"B551909","pcode":"B551187","epub_count":0,"pdf_count":0,"status":"y"},{"idx":135,"name":"한국원자력의학원","code":"B551913","pcode":"B551187","epub_count":0,"pdf_count":0,"status":"y"},{"idx":136,"name":"녹색기술센터","code":"B553026","pcode":"B551187","epub_count":0,"pdf_count":0,"status":"y"},{"idx":137,"name":"국가핵융합연구소","code":"B551956","pcode":"B551187","epub_count":0,"pdf_count":0,"status":"y"},{"idx":138,"name":"세계김치연구소","code":"B553097","pcode":"B551187","epub_count":0,"pdf_count":0,"status":"y"},{"idx":139,"name":"안전성평가연구소","code":"B551966","pcode":"B551187","epub_count":0,"pdf_count":0,"status":"y"},{"idx":140,"name":"재료연구소","code":"B552121","pcode":"B551187","epub_count":0,"pdf_count":0,"status":"y"},{"idx":141,"name":"국가보안기술연구소","code":"B551479","pcode":"B551187","epub_count":0,"pdf_count":0,"status":"y"},{"idx":142,"name":"한국건설기술연구원","code":"B090023","pcode":"B551187","epub_count":0,"pdf_count":2,"status":"y"}]},{"idx":143,"name":"대구경북과학기술원","code":"B552467","pcode":"1710000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":144,"name":"별정우체국연금관리단","code":"B552698","pcode":"1710000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":145,"name":"산업기술연구회","code":"B551179","pcode":"1710000","epub_count":0,"pdf_count":0,"status":"y","children":[{"idx":146,"name":"한국생산기술연구원","code":"B090021","pcode":"B551179","epub_count":0,"pdf_count":0,"status":"y"},{"idx":147,"name":"한국지질자원연구원","code":"B551176","pcode":"B551179","epub_count":0,"pdf_count":0,"status":"y"},{"idx":148,"name":"한국전자통신연구원","code":"B090022","pcode":"B551179","epub_count":0,"pdf_count":0,"status":"y"},{"idx":149,"name":"한국기계연구원","code":"B350011","pcode":"B551179","epub_count":0,"pdf_count":0,"status":"y"},{"idx":150,"name":"한국에너지기술연구원","code":"B551184","pcode":"B551179","epub_count":0,"pdf_count":0,"status":"y"},{"idx":151,"name":"한국철도기술연구원","code":"B090024","pcode":"B551179","epub_count":0,"pdf_count":0,"status":"y"},{"idx":152,"name":"한국전기연구원","code":"B551929","pcode":"B551179","epub_count":0,"pdf_count":0,"status":"y"},{"idx":153,"name":"한국식품연구원","code":"B551553","pcode":"B551179","epub_count":0,"pdf_count":0,"status":"y"},{"idx":154,"name":"한국화학연구원","code":"B551890","pcode":"B551179","epub_count":0,"pdf_count":0,"status":"y"}]},{"idx":155,"name":"연구개발특구진흥재단","code":"B552947","pcode":"1710000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":156,"name":"한국과학기술기획평가원","code":"B550936","pcode":"1710000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":157,"name":"한국과학기술원","code":"B350021","pcode":"1710000","epub_count":0,"pdf_count":0,"status":"y"}]},{"idx":158,"name":"법무부","code":"1270000","pcode":"0","epub_count":0,"pdf_count":70,"status":"y","children":[{"idx":159,"name":"대한법률구조공단","code":"B270001","pcode":"1270000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":160,"name":"정부법무공단","code":"B552634","pcode":"1270000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":161,"name":"한국법무보호복지공단","code":"B552684","pcode":"1270000","epub_count":0,"pdf_count":0,"status":"y"}]},{"idx":162,"name":"보건복지부","code":"1352000","pcode":"0","epub_count":0,"pdf_count":15,"status":"y","children":[{"idx":163,"name":"국민연금공단","code":"B552015","pcode":"1352000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":164,"name":"건강보험심사평가원","code":"B551182","pcode":"1352000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":165,"name":"국민건강보험공단","code":"B550928","pcode":"1352000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":166,"name":"한국보건산업진흥원","code":"B551174","pcode":"1352000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":167,"name":"한국노인인력개발원","code":"B552474","pcode":"1352000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":168,"name":"한국보건복지정보개발원","code":"B552653","pcode":"1352000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":169,"name":"한국보건복지인력개발원","code":"B551901","pcode":"1352000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":170,"name":"(재)한국보육진흥원","code":"B552654","pcode":"1352000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":171,"name":"(재)한국장애인개발원","code":"B552064","pcode":"1352000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":172,"name":"국립암센터","code":"B551172","pcode":"1352000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":173,"name":"국립중앙의료원","code":"B552657","pcode":"1352000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":174,"name":"대한적십자사","code":"B460004","pcode":"1352000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":175,"name":"한국건강증진재단","code":"B552849","pcode":"1352000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":176,"name":"한국국제보건의료재단","code":"B552038","pcode":"1352000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":177,"name":"한국보건의료연구원","code":"B552145","pcode":"1352000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":178,"name":"한국사회복지협의회","code":"B460014","pcode":"1352000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":179,"name":"한국의료분쟁조정중재원","code":"B552861","pcode":"1352000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":180,"name":"한국보건의료인국가시험원","code":"B551029","pcode":"1352000","epub_count":0,"pdf_count":0,"status":"y"}]},{"idx":181,"name":"산업통상자원부","code":"1450000","pcode":"0","epub_count":1,"pdf_count":13,"status":"y","children":[{"idx":182,"name":"한국가스공사","code":"B550012","pcode":"1450000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":183,"name":"한국석유공사","code":"B410005","pcode":"1450000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":184,"name":"한국전력공사","code":"B410002","pcode":"1450000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":185,"name":"한국지역난방공사","code":"B550373","pcode":"1450000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":186,"name":"한국수력원자력(주)","code":"B552041","pcode":"1450000","epub_count":0,"pdf_count":1,"status":"y"},{"idx":187,"name":"한국중부발전(주)","code":"B552521","pcode":"1450000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":188,"name":"한국서부발전(주)","code":"B552522","pcode":"1450000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":189,"name":"한국동서발전(주)","code":"B552070","pcode":"1450000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":190,"name":"한국남부발전(주)","code":"B552520","pcode":"1450000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":191,"name":"한국남동발전(주)","code":"B551893","pcode":"1450000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":192,"name":"한국광물자원공사","code":"B552133","pcode":"1450000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":193,"name":"대한석탄공사","code":"B410004","pcode":"1450000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":194,"name":"한국무역보험공사","code":"B552696","pcode":"1450000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":195,"name":"한국원자력환경공단","code":"B553023","pcode":"1450000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":196,"name":"대한무역투자진흥공사","code":"B410001","pcode":"1450000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":197,"name":"에너지관리공단","code":"B410009","pcode":"1450000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":198,"name":"한국가스안전공사","code":"B410019","pcode":"1450000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":199,"name":"한국광해관리공단","code":"B552065","pcode":"1450000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":200,"name":"한국디자인진흥원","code":"B551365","pcode":"1450000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":201,"name":"한국산업기술진흥원","code":"B552536","pcode":"1450000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":202,"name":"한국산업기술평가관리원","code":"B552534","pcode":"1450000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":203,"name":"한국산업단지공단","code":"B550624","pcode":"1450000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":204,"name":"한국석유관리원","code":"B552532","pcode":"1450000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":205,"name":"한국세라믹기술원","code":"B552539","pcode":"1450000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":206,"name":"한국에너지기술평가원","code":"B552680","pcode":"1450000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":207,"name":"한국전기안전공사","code":"B550018","pcode":"1450000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":208,"name":"한국전력거래소","code":"B552115","pcode":"1450000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":209,"name":"(주)강원랜드","code":"B552525","pcode":"1450000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":210,"name":"(주)한국가스기술공사","code":"B551494","pcode":"1450000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":211,"name":"기초전력연구원","code":"B552855","pcode":"1450000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":212,"name":"인천종합에너지(주)","code":"B551547","pcode":"1450000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":213,"name":"전략물자관리원","code":"B552135","pcode":"1450000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":214,"name":"한국로봇산업진흥원","code":"B552743","pcode":"1450000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":215,"name":"한국원자력문화재단","code":"B550509","pcode":"1450000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":216,"name":"한국전력기술(주)","code":"B550271","pcode":"1450000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":217,"name":"한국표준협회","code":"B550177","pcode":"1450000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":218,"name":"한일산업기술협력재단","code":"B550519","pcode":"1450000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":219,"name":"한전원자력연료(주)","code":"B552093","pcode":"1450000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":220,"name":"한전KDN(주)","code":"B552059","pcode":"1450000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":221,"name":"한전KPS(주)","code":"B551881","pcode":"1450000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":222,"name":"한국산업기술시험원","code":"B551951","pcode":"1450000","epub_count":0,"pdf_count":0,"status":"y"}]},{"idx":223,"name":"안전행정부","code":"1312000","pcode":"0","epub_count":0,"pdf_count":1,"status":"y","children":[{"idx":224,"name":"공무원연금공단","code":"B552640","pcode":"1312000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":225,"name":"한국승강기안전관리원","code":"B410026","pcode":"1312000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":226,"name":"민주화운동기념사업회","code":"B551213","pcode":"1312000","epub_count":0,"pdf_count":0,"status":"y"}]},{"idx":227,"name":"여성가족부","code":"1060100","pcode":"0","epub_count":0,"pdf_count":0,"status":"y","children":[{"idx":228,"name":"한국청소년상담복지개발원","code":"B552919","pcode":"1060100","epub_count":0,"pdf_count":0,"status":"y"},{"idx":229,"name":"한국청소년활동진흥원","code":"B552713","pcode":"1060100","epub_count":0,"pdf_count":0,"status":"y"},{"idx":230,"name":"한국양성평등교육진흥원","code":"B552478","pcode":"1060100","epub_count":0,"pdf_count":0,"status":"y"},{"idx":231,"name":"한국건강가정진흥원","code":"B553099","pcode":"1060100","epub_count":0,"pdf_count":0,"status":"y"},{"idx":232,"name":"한국여성인권진흥원","code":"B553095","pcode":"1060100","epub_count":0,"pdf_count":0,"status":"y"}]},{"idx":233,"name":"외교부","code":"1262000","pcode":"0","epub_count":4,"pdf_count":3,"status":"y","children":[{"idx":234,"name":"한국국제협력단","code":"B260003","pcode":"1262000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":235,"name":"한국국제교류재단","code":"B260004","pcode":"1262000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":236,"name":"재외동포재단","code":"B260001","pcode":"1262000","epub_count":0,"pdf_count":0,"status":"y"}]},{"idx":237,"name":"통일부","code":"1250000","pcode":"0","epub_count":0,"pdf_count":14,"status":"y","children":[{"idx":238,"name":"북한이탈주민지원재단","code":"B552842","pcode":"1250000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":239,"name":"(사)남북교류협력지원협회","code":"B552871","pcode":"1250000","epub_count":1,"pdf_count":0,"status":"y"},{"idx":240,"name":"통일교육원","code":"1250054","pcode":"1250000","epub_count":0,"pdf_count":1,"status":"y"}]},{"idx":241,"name":"해양수산부","code":"1192000","pcode":"0","epub_count":0,"pdf_count":2,"status":"y","children":[{"idx":242,"name":"부산항만공사","code":"B551220","pcode":"1192000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":243,"name":"인천항만공사","code":"B551504","pcode":"1192000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":244,"name":"여수광양항만공사","code":"B552782","pcode":"1192000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":245,"name":"울산항만공사","code":"B551938","pcode":"1192000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":246,"name":"해양환경관리공단","code":"B551979","pcode":"1192000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":247,"name":"선박안전기술공단","code":"B551912","pcode":"1192000","epub_count":0,"pdf_count":5,"status":"y"},{"idx":248,"name":"한국수산자원관리공단","code":"B552848","pcode":"1192000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":249,"name":"한국해양수산연수원","code":"B550657","pcode":"1192000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":250,"name":"주식회사 부산항보안공사","code":"B552769","pcode":"1192000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":251,"name":"주식회사 인천항보안공사","code":"B552796","pcode":"1192000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":252,"name":"한국어촌어항협회","code":"B551545","pcode":"1192000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":253,"name":"한국해양과학기술원","code":"B552904","pcode":"1192000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":254,"name":"한국해양과학기술진흥원","code":"B552564","pcode":"1192000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":255,"name":"항로표지기술협회","code":"B552482","pcode":"1192000","epub_count":0,"pdf_count":0,"status":"y"}]},{"idx":256,"name":"환경부","code":"1480000","pcode":"0","epub_count":0,"pdf_count":2,"status":"y","children":[{"idx":257,"name":"국립공원관리공단","code":"B480001","pcode":"1480000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":258,"name":"한국환경공단","code":"B552584","pcode":"1480000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":259,"name":"한국환경산업기술원","code":"B552518","pcode":"1480000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":260,"name":"국립생태원","code":"B553084","pcode":"1480000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":261,"name":"수도권매립지관리공사","code":"B551225","pcode":"1480000","epub_count":0,"pdf_count":0,"status":"y"}]},{"idx":262,"name":"법제처","code":"1170000","pcode":"0","epub_count":0,"pdf_count":12,"status":"y","children":[{"idx":263,"name":"법령정보관리원","code":"1170107","pcode":"1170000","epub_count":0,"pdf_count":0,"status":"y"}]},{"idx":264,"name":"국가보훈처","code":"1180000","pcode":"0","epub_count":0,"pdf_count":0,"status":"y","children":[{"idx":265,"name":"독립기념관","code":"B370008","pcode":"1180000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":266,"name":"한국보훈복지의료공단","code":"B551202","pcode":"1180000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":267,"name":"88관광개발(주)","code":"B550402","pcode":"1180000","epub_count":0,"pdf_count":0,"status":"y"}]},{"idx":268,"name":"식품의약품안전처","code":"1471000","pcode":"0","epub_count":0,"pdf_count":6,"status":"y","children":[{"idx":269,"name":"축산물안전관리인증원","code":"B553085","pcode":"1471000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":270,"name":"한국희귀의약품센터","code":"B553126","pcode":"1471000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":271,"name":"한국의약품안전관리원","code":"B552894","pcode":"1471000","epub_count":0,"pdf_count":0,"status":"y"}]},{"idx":272,"name":"검찰청","code":"1280000","pcode":"0","epub_count":0,"pdf_count":0,"status":"y"},{"idx":273,"name":"경찰청","code":"1320000","pcode":"0","epub_count":0,"pdf_count":0,"status":"y","children":[{"idx":274,"name":"도로교통공단","code":"B552061","pcode":"1320000","epub_count":0,"pdf_count":0,"status":"y"}]},{"idx":275,"name":"관세청","code":"1220000","pcode":"0","epub_count":0,"pdf_count":0,"status":"y","children":[{"idx":276,"name":"한국관세무역개발원","code":"I000001","pcode":"1220000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":277,"name":"국제원산지정보원","code":"I000002","pcode":"1220000","epub_count":0,"pdf_count":0,"status":"y"}]},{"idx":278,"name":"국세청","code":"1210000","pcode":"0","epub_count":0,"pdf_count":0,"status":"y","children":[{"idx":279,"name":"국세공무원교육원","code":"1212032","pcode":"1210000","epub_count":0,"pdf_count":0,"status":"y"}]},{"idx":280,"name":"기상청","code":"1360000","pcode":"0","epub_count":0,"pdf_count":0,"status":"y","children":[{"idx":281,"name":"한국기상산업진흥원","code":"B552641","pcode":"1360000","epub_count":0,"pdf_count":0,"status":"y"}]},{"idx":282,"name":"농촌진흥청","code":"1390000","pcode":"0","epub_count":0,"pdf_count":0,"status":"y","children":[{"idx":283,"name":"농업기술실용화재단","code":"B552582","pcode":"1390000","epub_count":0,"pdf_count":0,"status":"y"}]},{"idx":284,"name":"문화재청","code":"1550000","pcode":"0","epub_count":0,"pdf_count":0,"status":"y","children":[{"idx":285,"name":"한국문화재보호재단","code":"B551481","pcode":"1550000","epub_count":0,"pdf_count":0,"status":"y"}]},{"idx":286,"name":"방위사업청","code":"1690000","pcode":"0","epub_count":0,"pdf_count":0,"status":"y","children":[{"idx":287,"name":"국방과학연구소","code":"B550234","pcode":"1690000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":288,"name":"국방기술품질원","code":"B551544","pcode":"1690000","epub_count":0,"pdf_count":0,"status":"y"}]},{"idx":289,"name":"병무청","code":"1300000","pcode":"0","epub_count":0,"pdf_count":1,"status":"y"},{"idx":290,"name":"산림청","code":"1400000","pcode":"0","epub_count":0,"pdf_count":1,"status":"y","children":[{"idx":291,"name":"한국임업진흥원","code":"B552826","pcode":"1400000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":292,"name":"녹색사업단","code":"B552530","pcode":"1400000","epub_count":0,"pdf_count":4,"status":"y"}]},{"idx":293,"name":"소방방재청","code":"1660000","pcode":"0","epub_count":0,"pdf_count":0,"status":"y","children":[{"idx":294,"name":"한국소방산업기술원","code":"B552486","pcode":"1660000","epub_count":0,"pdf_count":0,"status":"y"}]},{"idx":295,"name":"조달청","code":"1230000","pcode":"0","epub_count":0,"pdf_count":0,"status":"y"},{"idx":296,"name":"중소기업청","code":"1420000","pcode":"0","epub_count":0,"pdf_count":0,"status":"y","children":[{"idx":297,"name":"중소기업진흥공단","code":"B410011","pcode":"1420000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":298,"name":"중소기업기술정보진흥원","code":"B552104","pcode":"1420000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":299,"name":"소상공인시장진흥공단","code":"B553077","pcode":"1420000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":300,"name":"(주)중소기업유통센터","code":"B410012","pcode":"1420000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":301,"name":"신용보증재단중앙회","code":"B552473","pcode":"1420000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":302,"name":"창업진흥원","code":"B552735","pcode":"1420000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":303,"name":"한국벤처투자","code":"B552477","pcode":"1420000","epub_count":0,"pdf_count":0,"status":"y"}]},{"idx":304,"name":"통계청","code":"1240000","pcode":"0","epub_count":0,"pdf_count":0,"status":"y"},{"idx":305,"name":"특허청","code":"1430000","pcode":"0","epub_count":0,"pdf_count":0,"status":"y","children":[{"idx":306,"name":"한국발명진흥회","code":"B550576","pcode":"1430000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":307,"name":"한국특허정보원","code":"B551387","pcode":"1430000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":308,"name":"(재)한국지식재산연구원","code":"B552683","pcode":"1430000","epub_count":0,"pdf_count":0,"status":"y"},{"idx":309,"name":"한국지식재산보호협회","code":"B552721","pcode":"1430000","epub_count":0,"pdf_count":0,"status":"y"}]},{"idx":310,"name":"해양경찰청","code":"1530000","pcode":"0","epub_count":0,"pdf_count":0,"status":"y"},{"idx":311,"name":"행정중심복합도시건설청","code":"1670000","pcode":"0","epub_count":0,"pdf_count":0,"status":"y"},{"idx":312,"name":"국가정보원","code":"1030000","pcode":"0","epub_count":0,"pdf_count":0,"status":"y"},{"idx":313,"name":"감사원","code":"1040000","pcode":"0","epub_count":0,"pdf_count":0,"status":"y"},{"idx":314,"name":"대통령비서실","code":"1010000","pcode":"0","epub_count":0,"pdf_count":0,"status":"y"},{"idx":315,"name":"대통령경호실","code":"1020000","pcode":"0","epub_count":0,"pdf_count":0,"status":"y"},{"idx":316,"name":"국가안보실","code":"1025000","pcode":"0","epub_count":0,"pdf_count":0,"status":"y"},{"idx":317,"name":"국무조정실","code":"1090000","pcode":"0","epub_count":0,"pdf_count":0,"status":"y","children":[{"idx":318,"name":"경제인문사회연구회","code":"B551541","pcode":"1090000","epub_count":0,"pdf_count":0,"status":"y","children":[{"idx":319,"name":"과학기술정책연구원","code":"B090039","pcode":"B551541","epub_count":0,"pdf_count":1,"status":"y"},{"idx":320,"name":"국토연구원","code":"B090029","pcode":"B551541","epub_count":0,"pdf_count":0,"status":"y"},{"idx":321,"name":"대외경제정책연구원","code":"B090003","pcode":"B551541","epub_count":3,"pdf_count":0,"status":"y"},{"idx":322,"name":"산업연구원","code":"B090008","pcode":"B551541","epub_count":2,"pdf_count":1,"status":"y"},{"idx":323,"name":"에너지경제연구원","code":"B410018","pcode":"B551541","epub_count":0,"pdf_count":107,"status":"y"},{"idx":324,"name":"정보통신정책연구원","code":"B090010","pcode":"B551541","epub_count":0,"pdf_count":0,"status":"y"},{"idx":325,"name":"통일연구원","code":"B010002","pcode":"B551541","epub_count":1,"pdf_count":84,"status":"y"},{"idx":326,"name":"한국개발연구원","code":"B090001","pcode":"B551541","epub_count":1,"pdf_count":117,"status":"y"},{"idx":327,"name":"한국교육개발원","code":"B090027","pcode":"B551541","epub_count":0,"pdf_count":1,"status":"y"},{"idx":328,"name":"한국교육과정평가원","code":"B090007","pcode":"B551541","epub_count":0,"pdf_count":0,"status":"y"},{"idx":329,"name":"한국교통연구원","code":"B552071","pcode":"B551541","epub_count":0,"pdf_count":169,"status":"y"},{"idx":330,"name":"한국노동연구원","code":"B090012","pcode":"B551541","epub_count":0,"pdf_count":0,"status":"y"},{"idx":331,"name":"한국농촌경제연구원","code":"B090028","pcode":"B551541","epub_count":0,"pdf_count":206,"status":"y"},{"idx":332,"name":"한국법제연구원","code":"B090015","pcode":"B551541","epub_count":0,"pdf_count":0,"status":"y"},{"idx":333,"name":"한국보건사회연구원","code":"B090011","pcode":"B551541","epub_count":2,"pdf_count":188,"status":"y"},{"idx":334,"name":"한국여성정책연구원","code":"B552118","pcode":"B551541","epub_count":0,"pdf_count":105,"status":"y"},{"idx":335,"name":"한국조세재정연구원(한국조세연구원)","code":"B090002","pcode":"B551541","epub_count":0,"pdf_count":33,"status":"y"},{"idx":336,"name":"한국직업능력개발원","code":"B090013","pcode":"B551541","epub_count":0,"pdf_count":0,"status":"y"},{"idx":337,"name":"한국청소년정책연구원","code":"B551923","pcode":"B551541","epub_count":0,"pdf_count":0,"status":"y"},{"idx":338,"name":"한국해양수산개발원","code":"B090014","pcode":"B551541","epub_count":0,"pdf_count":0,"status":"y"},{"idx":339,"name":"한국행정연구원","code":"B090006","pcode":"B551541","epub_count":0,"pdf_count":0,"status":"y"},{"idx":340,"name":"한국형사정책연구원","code":"B090005","pcode":"B551541","epub_count":0,"pdf_count":0,"status":"y"},{"idx":341,"name":"한국환경정책평가연구원","code":"B090026","pcode":"B551541","epub_count":0,"pdf_count":0,"status":"y"},{"idx":342,"name":"육아정책연구소","code":"B552655","pcode":"B551541","epub_count":0,"pdf_count":0,"status":"y"},{"idx":343,"name":"KDI국제정책대학원","code":"7003625","pcode":"B551541","epub_count":0,"pdf_count":0,"status":"y"}]}]},{"idx":344,"name":"국무총리비서실","code":"1100000","pcode":"0","epub_count":0,"pdf_count":0,"status":"y"},{"idx":345,"name":"공정거래위원회","code":"1130000","pcode":"0","epub_count":0,"pdf_count":0,"status":"y","children":[{"idx":346,"name":"한국소비자원","code":"B551919","pcode":"1130000","epub_count":3,"pdf_count":0,"status":"y"},{"idx":347,"name":"한국공정거래조정원","code":"B552037","pcode":"1130000","epub_count":0,"pdf_count":0,"status":"y"}]},{"idx":348,"name":"국민권익위원회","code":"1140100","pcode":"0","epub_count":0,"pdf_count":0,"status":"y"},{"idx":349,"name":"금융위원회","code":"1160100","pcode":"0","epub_count":0,"pdf_count":0,"status":"y","children":[{"idx":350,"name":"기술신용보증기금","code":"B190009","pcode":"1160100","epub_count":0,"pdf_count":0,"status":"y"},{"idx":351,"name":"신용보증기금","code":"B190016","pcode":"1160100","epub_count":0,"pdf_count":0,"status":"y"},{"idx":352,"name":"예금보험공사","code":"B190017","pcode":"1160100","epub_count":0,"pdf_count":0,"status":"y"},{"idx":353,"name":"한국자산관리공사","code":"B010003","pcode":"1160100","epub_count":0,"pdf_count":0,"status":"y"},{"idx":354,"name":"한국주택금융공사","code":"B551408","pcode":"1160100","epub_count":0,"pdf_count":0,"status":"y"},{"idx":355,"name":"한국예탁결제원","code":"B552481","pcode":"1160100","epub_count":0,"pdf_count":0,"status":"y"},{"idx":356,"name":"한국거래소","code":"B552480","pcode":"1160100","epub_count":0,"pdf_count":0,"status":"y"},{"idx":357,"name":"한국정책금융공사","code":"B552669","pcode":"1160100","epub_count":0,"pdf_count":0,"status":"y"},{"idx":358,"name":"코스콤","code":"B552688","pcode":"1160100","epub_count":0,"pdf_count":0,"status":"y"},{"idx":359,"name":"한국산업은행","code":"B190030","pcode":"1160100","epub_count":0,"pdf_count":0,"status":"y"},{"idx":360,"name":"중소기업은행","code":"B190021","pcode":"1160100","epub_count":0,"pdf_count":0,"status":"y"},{"idx":361,"name":"산은금융지주","code":"B552674","pcode":"1160100","epub_count":0,"pdf_count":0,"status":"y"}]},{"idx":362,"name":"방송통신위원회","code":"1570100","pcode":"0","epub_count":0,"pdf_count":0,"status":"y","children":[{"idx":363,"name":"한국방송광고진흥공사","code":"B552898","pcode":"1570100","epub_count":0,"pdf_count":0,"status":"y"}]},{"idx":364,"name":"국가인권위원회","code":"1620000","pcode":"0","epub_count":0,"pdf_count":0,"status":"y"},{"idx":365,"name":"원자력안전위원회","code":"1079960","pcode":"0","epub_count":0,"pdf_count":0,"status":"y","children":[{"idx":366,"name":"한국원자력안전기술원","code":"B350014","pcode":"1079960","epub_count":0,"pdf_count":0,"status":"y"},{"idx":367,"name":"한국원자력통제기술원","code":"B551678","pcode":"1079960","epub_count":0,"pdf_count":0,"status":"y"}]}
		];

		/**
		 * CustController의 테스트 그리드 데이터
		 * @type {{UserList: {name: string, gender: string, company: string}[]}}
		 */
		CommData.GridTemp = {
			UserList: [
				{"name":"Ethel Price","gender":"female","company":"Enersol"},{"name":"Claudine Neal","gender":"female","company":"Sealoud"},{"name":"Beryl Rice","gender":"female","company":"Velity"},{"name":"Wilder Gonzales","gender":"male","company":"Geekko"},{"name":"Georgina Schultz","gender":"female","company":"Suretech"},{"name":"Carroll Buchanan","gender":"male","company":"Ecosys"},{"name":"Valarie Atkinson","gender":"female","company":"Hopeli"},{"name":"Schroeder Mathews","gender":"male","company":"Polarium"},{"name":"Lynda Mendoza","gender":"female","company":"Dogspa"},{"name":"Sarah Massey","gender":"female","company":"Bisba"},{"name":"Robles Boyle","gender":"male","company":"Comtract"},{"name":"Evans Hickman","gender":"male","company":"Parleynet"},{"name":"Dawson Barber","gender":"male","company":"Dymi"},{"name":"Bruce Strong","gender":"male","company":"Xyqag"},{"name":"Nellie Whitfield","gender":"female","company":"Exospace"},{"name":"Jackson Macias","gender":"male","company":"Aquamate"},{"name":"Pena Pena","gender":"male","company":"Quarx"},{"name":"Lelia Gates","gender":"female","company":"Proxsoft"},{"name":"Letitia Vasquez","gender":"female","company":"Slumberia"},{"name":"Trevino Moreno","gender":"male","company":"Conjurica"},{"name":"Barr Page","gender":"male","company":"Apex"},{"name":"Kirkland Merrill","gender":"male","company":"Utara"},{"name":"Blanche Conley","gender":"female","company":"Imkan"},{"name":"Atkins Dunlap","gender":"male","company":"Comveyor"},{"name":"Everett Foreman","gender":"male","company":"Maineland"},{"name":"Gould Randolph","gender":"male","company":"Intergeek"},{"name":"Kelli Leon","gender":"female","company":"Verbus"},{"name":"Freda Mason","gender":"female","company":"Accidency"},{"name":"Tucker Maxwell","gender":"male","company":"Lumbrex"},{"name":"Yvonne Parsons","gender":"female","company":"Zolar"},{"name":"Woods Key","gender":"male","company":"Bedder"},{"name":"Stephens Reilly","gender":"male","company":"Acusage"},{"name":"Mcfarland Sparks","gender":"male","company":"Comvey"},{"name":"Jocelyn Sawyer","gender":"female","company":"Fortean"},{"name":"Renee Barr","gender":"female","company":"Kiggle"},{"name":"Gaines Beck","gender":"male","company":"Sequitur"},{"name":"Luisa Farrell","gender":"female","company":"Cinesanct"},{"name":"Robyn Strickland","gender":"female","company":"Obones"},{"name":"Roseann Jarvis","gender":"female","company":"Aquazure"},{"name":"Johnston Park","gender":"male","company":"Netur"},{"name":"Wong Craft","gender":"male","company":"Opticall"},{"name":"Merritt Cole","gender":"male","company":"Techtrix"},{"name":"Dale Byrd","gender":"female","company":"Kneedles"},{"name":"Sara Delgado","gender":"female","company":"Netagy"},{"name":"Alisha Myers","gender":"female","company":"Intradisk"},{"name":"Felecia Smith","gender":"female","company":"Futurity"},{"name":"Neal Harvey","gender":"male","company":"Pyramax"},{"name":"Nola Miles","gender":"female","company":"Sonique"},{"name":"Herring Pierce","gender":"male","company":"Geeketron"},{"name":"Shelley Rodriquez","gender":"female","company":"Bostonic"},{"name":"Cora Chase","gender":"female","company":"Isonus"},{"name":"Mckay Santos","gender":"male","company":"Amtas"},{"name":"Hilda Crane","gender":"female","company":"Jumpstack"},{"name":"Jeanne Lindsay","gender":"female","company":"Genesynk"},{"name":"Frye Sharpe","gender":"male","company":"Eplode"},{"name":"Velma Fry","gender":"female","company":"Ronelon"},{"name":"Reyna Espinoza","gender":"female","company":"Prismatic"},{"name":"Spencer Sloan","gender":"male","company":"Comverges"},{"name":"Graham Marsh","gender":"male","company":"Medifax"},{"name":"Hale Boone","gender":"male","company":"Digial"},{"name":"Wiley Hubbard","gender":"male","company":"Zensus"},{"name":"Blackburn Drake","gender":"male","company":"Frenex"},{"name":"Franco Hunter","gender":"male","company":"Rockabye"},{"name":"Barnett Case","gender":"male","company":"Norali"},{"name":"Alexander Foley","gender":"male","company":"Geekosis"},{"name":"Lynette Stein","gender":"female","company":"Macronaut"},{"name":"Anthony Joyner","gender":"male","company":"Senmei"},{"name":"Garrett Brennan","gender":"male","company":"Bluegrain"},{"name":"Betsy Horton","gender":"female","company":"Zilla"},{"name":"Patton Small","gender":"male","company":"Genmex"},{"name":"Lakisha Huber","gender":"female","company":"Insource"},{"name":"Lindsay Avery","gender":"female","company":"Unq"},{"name":"Ayers Hood","gender":"male","company":"Accuprint"},{"name":"Torres Durham","gender":"male","company":"Uplinx"},{"name":"Vincent Hernandez","gender":"male","company":"Talendula"},{"name":"Baird Ryan","gender":"male","company":"Aquasseur"},{"name":"Georgia Mercer","gender":"female","company":"Skyplex"},{"name":"Francesca Elliott","gender":"female","company":"Nspire"},{"name":"Lyons Peters","gender":"male","company":"Quinex"},{"name":"Kristi Brewer","gender":"female","company":"Oronoko"},{"name":"Tonya Bray","gender":"female","company":"Insuron"},{"name":"Valenzuela Huff","gender":"male","company":"Applideck"},{"name":"Tiffany Anderson","gender":"female","company":"Zanymax"},{"name":"Jerri King","gender":"female","company":"Eventex"},{"name":"Rocha Meadows","gender":"male","company":"Goko"},{"name":"Marcy Green","gender":"female","company":"Pharmex"},{"name":"Kirk Cross","gender":"male","company":"Portico"},{"name":"Hattie Mullen","gender":"female","company":"Zilencio"},{"name":"Deann Bridges","gender":"female","company":"Equitox"},{"name":"Chaney Roach","gender":"male","company":"Qualitern"},{"name":"Consuelo Dickson","gender":"female","company":"Poshome"},{"name":"Billie Rowe","gender":"female","company":"Cemention"},{"name":"Bean Donovan","gender":"male","company":"Mantro"},{"name":"Lancaster Patel","gender":"male","company":"Krog"},{"name":"Rosa Dyer","gender":"female","company":"Netility"},{"name":"Christine Compton","gender":"female","company":"Bleeko"},{"name":"Milagros Finch","gender":"female","company":"Handshake"},{"name":"Ericka Alvarado","gender":"female","company":"Lyrichord"},{"name":"Sylvia Sosa","gender":"female","company":"Circum"},{"name":"Humphrey Curtis","gender":"male","company":"Corepan"}
			]
		};

		/**
		 * 공통코드 리스트
		 * @type {Array}
		 */
		CommData.CodeList = [];

		/**
		 * flatten 처리된 공통코드 리스트  groupList들을 단일 Object Array로 처리
		 * @type {Array}
		 */
		CommData.FlattenCodeList = [];

		CommData.MockCodeList = [
			{
				cdGroupId : '306',
				groupList : [
					{
						dtlCd : '2541',
						dtlCdNm : '전화세 (현재사용)',
						cdGroupId : '306',
						cdGroupNm : '세금종류코드',
						dtlCdDesc : null
					},
					{
						dtlCd : '2542',
						dtlCdNm : '전파세',
						cdGroupId : '306',
						cdGroupNm : '세금종류코드',
						dtlCdDesc : null
					},
					{
						dtlCd : '2544',
						dtlCdNm : '총계 (현재사용안함)',
						cdGroupId : '306',
						cdGroupNm : '세금종류코드',
						dtlCdDesc : null
					}
				]
			},
			{
				cdGroupId : '387',
				groupList : [
					{
						dtlCd : '3606',
						dtlCdNm : 'Cancel Deposit for Cancel Call to Number',
						cdGroupId : '387',
						cdGroupNm : '요금관련활동사유코드',
						dtlCdDesc : null
					},
					{
						dtlCd : '3607',
						dtlCdNm : 'Cancel Deposit Requirement',
						cdGroupId : '387',
						cdGroupNm : '요금관련활동사유코드',
						dtlCdDesc : null
					},
					{
						dtlCd : '3608',
						dtlCdNm : 'BILL요구 (KTF)',
						cdGroupId : '387',
						cdGroupNm : '요금관련활동사유코드',
						dtlCdDesc : null
					},
					{
						dtlCd : '3609',
						dtlCdNm : '잔액(현금)이동',
						cdGroupId : '387',
						cdGroupNm : '요금관련활동사유코드',
						dtlCdDesc : null
					}
				]
			}
		];

		CommData.mockUserData = {
			'authorities' : [
				{'authority' : 'ROLE_BILL_MNG'},
				{'authority' : 'ROLE_CUST_MNG'},
				{'authority' : 'ROLE_PROD_MNG'}
			],
			'menu' : [

			],
			'memberInfo' : {
				'id'					: 'hong',
				'password'				: 'hong1234',
				'name'					: '홍길동',
				'authorities'			: [
					{'authority' : 'ROLE_BILL_MNG'},
					{'authority' : 'ROLE_CUST_MNG'},
					{'authority' : 'ROLE_PROD_MNG'}
				],
				'username'				: 'hong',
				'enabled'				: true,
				'accountNonExpired' 	: true,
				'accountNonLocked'		: true,
				'credentialsNonExpired' : true
			}
		};

		/* CommData return End */
		return CommData;
	});
});