/**
 * Dialog Default Translations.
 *
 * Include this module if you're not already using angular-translate in your application, and
 * add it to your application module's dependency list in order to get default header and 
 * dialog messages to appear.
 * 
 * Ex: var myApp = angular.module('myApplication',['dialogs.main','dialogs.default-translations']);
 *
 * It was necessary to separate this out for those already using angular-translate because this would
 * automatically reset their translation list for 'en-US'
 *
 * For those already using angular-translate, just copy the list of DIALOG_[..] translations to your
 * translation list where you set 'en-US' using the $translateProvider.
 */

//== Translations =============================================================//

 angular.module('dialogs.default-translations',['pascalprecht.translate'])
 /**
     * Default translations in English.
     * 
     * Use angular-translate's $translateProvider to provide translations in an
     * alternate language.
     *
     * $translateProvider.translations('[lang]',{[translations]});
     * To use alternate translations set the preferred language to your desired
     * language.
     * $translateProvider.preferredLanguage('[lang]');
     */
    .config(['$translateProvider',function($translateProvider){
        $translateProvider.translations('en-US',{
            DIALOGS_ERROR: "Error",
            DIALOGS_ERROR_MSG: "An unknown error has occurred.",
            DIALOGS_CLOSE: "Close",
            DIALOGS_PLEASE_WAIT: "Please Wait",
            DIALOGS_PLEASE_WAIT_ELIPS: "Please Wait...",
            DIALOGS_PLEASE_WAIT_MSG: "Waiting on operation to complete.",
            DIALOGS_PERCENT_COMPLETE: "% Complete",
            DIALOGS_NOTIFICATION: "Notification",
            DIALOGS_NOTIFICATION_MSG: "Unknown application notification.",
            DIALOGS_CONFIRMATION: "Confirmation",
            DIALOGS_CONFIRMATION_MSG: "Confirmation required.",
            DIALOGS_OK: "OK",
            DIALOGS_YES: "Yes",
            DIALOGS_NO: "No"
        });

		$translateProvider.translations('ko-KR',{
			 DIALOGS_ERROR: "오류",
			 DIALOGS_ERROR_MSG: "알 수 없는 오류가 발생하였습니다.",
			 DIALOGS_CLOSE: "닫기",
			 DIALOGS_PLEASE_WAIT: "처리중",
			 DIALOGS_PLEASE_WAIT_ELIPS: "처리중...",
			 DIALOGS_PLEASE_WAIT_MSG: "작업을 완료하고 있습니다.",
			 DIALOGS_PERCENT_COMPLETE: "% 완료",
			 DIALOGS_NOTIFICATION: "알림",
			 DIALOGS_NOTIFICATION_MSG: "알 수 없는 응용프로그램 알림.",
			 DIALOGS_CONFIRMATION: "승인",
			 DIALOGS_CONFIRMATION_MSG: "승인 하시겠습니까?",
			 DIALOGS_OK: "OK",
			 DIALOGS_YES: "예",
			 DIALOGS_NO: "아니오"
		});

		$translateProvider.preferredLanguage('ko-KR');
    }]); // end config