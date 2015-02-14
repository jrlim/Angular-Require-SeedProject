/**
 * 공통 필터링 구현체
 */
define([
	'app',
	'services/CommUtil',
	'factories/CommData'
], function (ngApp) {
	'use strict';

	var fn = {};

	/**
	 * HTML 필터링 (에디터, textarea 등에서 html 표현시 사용)
	 * 사용예제 : <div ng-bind-html="hakwonObj.introduction | rawHtml"></div>
	 */
	fn.rawHtml = function($sce) {
		return function(val) {
			return $sce.trustAsHtml(val);
		};
	};

	/**
	 * 공통 코드 조회 필터링 기능
	 * @param CommUtil
	 * @returns {Function}
	 */
	fn.getCommCodeName = function(CommUtil) {
		return function(dtlCd) {
			return CommUtil.getCommCodeName(dtlCd);
		};
	};

	/**
	 * 원화 표기시 소수점이하 제거 필터링 기능
	 * ₩99,000.00  -> ₩99,000
	 * 사용예제 : <input type="text" ng-value="198000 | noFractionCurrency"/>
	 * @param $filter
	 * @param $locale
	 * @returns {Function}
	 */
	fn.noFractionCurrency = function($filter, $locale) {
		var currencyFilter = $filter('currency');
		var formats = $locale.NUMBER_FORMATS;
		return function (amount, currencySymbol) {
			var value = currencyFilter(amount, currencySymbol);
			var sep = value.indexOf(formats.DECIMAL_SEP);
			if (amount >= 0) {
				return value.substring(0, sep);
			}
			return value.substring(0, sep) + ')';
		}
	};

	/*	Application 필터 설정	*/
	ngApp.filter('RawHtml', fn.rawHtml);
	ngApp.filter('GetCodeName', fn.getCommCodeName);
	ngApp.filter('noFractionCurrency', fn.noFractionCurrency);

});
