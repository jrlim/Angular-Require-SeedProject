/** attach controllers to this module 
 * if you get 'unknown {x}Provider' errors from angular, be sure they are
 * properly referenced in one of the module dependencies in the array.
 * below, you can see we bring in our services and constants modules 
 * which avails each controller of, for example, the `config` constants object.
 **/
define(['angular',
	'controllers/BaseController',
	'controllers/GnbController',
	'controllers/SnbController',
	'controllers/views/MdiController',
	'controllers/views/NestedController',
	'controllers/views/HomeController',
	'controllers/views/AboutusController',
	'controllers/views/ContactusController',
	'controllers/views/UserController',
	'controllers/views/CustController',
	'controllers/components/GridController',
	'controllers/components/CompareController',
	'controllers/components/ValidController',
	'controllers/components/DatePickerController',
	'controllers/components/ModalController',
	'controllers/components/BusyController',
	'controllers/components/DialogController',
	'controllers/views/LoginController'
], function (ng) {
    'use strict';
    return ng.module('app.controllers', []);
});