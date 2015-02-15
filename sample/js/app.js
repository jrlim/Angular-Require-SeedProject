define([
	'angular'
], function (ng) {
	"use strict";

	var sampleApp = ng.module('sampleApp', [
		'ngRoute',
		'ngTouch',
		'ui.bootstrap',
		'ui.bootstrap.tpls'
	]);

	return sampleApp;
});