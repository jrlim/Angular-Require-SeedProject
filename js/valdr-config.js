define([
	'app'
], function (ngApp) {
	"use strict";

	/* Validation Config*/
	ngApp.config(function (valdrProvider) {
		valdrProvider.addConstraints({
			'UserVO': {
				'userId': {
					'required': {
						'message': '사용자 아이디를 입력해 주세요.'
					},
					'size': {
						'min': 4,
						'max': 10,
						'message': '아이디를 4~15자 사이의 영문/숫자 조합으로 입력해주세요.'
					},
					'pattern': {
						'value'		: /^[a-zA-Z]1?[a-zA-Z0-9]*$/,
						'message'	: '아이디는 첫글자는 반드시 영문자이며, 영문/숫자 조합으로 입력해 주세요.'
					}
				},
				'userName': {
					'required': {
						'message': '사용자 이름을 입력해 주세요.'
					},
					'size': {
						'min': 1,
						'max': 20,
						'message': '이름을 1~20자 사이로 입력해 주세요.'
					}
				},
				'hpNumber': {
					'required': {
						'message': '연락처를 입력해 주세요.'
					},
					'pattern': {
						'value'		: /^[0-9]*$/,
						'message'	: '연락처는 숫자만 입력해 주세요.'
					}
				},
				'address': {
					'required': {
						'message': '주소를 입력해 주세요.'
					}
				},
				'company': {
					'required': {
						'message': '회사를 입력해 주세요.'
					}
				},
				'email': {
					'required': {
						'message': '이메일 주소를 입력해 주세요.'
					},
					'email': {
						'message': '유효한 이메일 주소가 아닙니다.'
					}
				},
				/*	커스텀 이메일 정규식 체크	*/
				'customEmail': {
					'required': {
						'message': '이메일을 입력해 주시기 바랍니다.'
					},
					'pattern': {
						'value'		: /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
						'message'	: '유효하지 이메일 양식 입니다.'
					}
				},
				'scno': {
					'required': {
						'message': '사업자번호를 입력해 주시기 바랍니다.'
					},
					'pattern': {
						'value'		: /^([0-9]{3})([\-]{1})([0-9]{2})([\-]{1})([0-9]{5})$/,
						'message'	: '유효하지 않은 사업자 번호입니다. ex)333-22-55555'
					}
				}
			}
		});

	}); // END, ngApp.config

}); // END, define