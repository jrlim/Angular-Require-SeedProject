define([
	'angular'
], function (ng) {
	"use strict";

	var seedApp = ng.module('seedApp', [
		'ngRoute',
		'ngSanitize',
		'ngAnimate',
		'angularTreeview',
		'ui.grid',
		'ui.grid.edit',
		'ui.grid.pagination',
		'ui.grid.selection',
		'ui.grid.autoResize',
		'cgBusy',
		'ui.bootstrap',
		'ui.bootstrap.tpls',
		'valdr',
		'dialogs.main',
		'pascalprecht.translate',
		'dialogs.default-translations'
	]);

	return seedApp;

});