/**
 * 
 */
if (!String.format) {
	String.format = function(format) {
		var args = Array.prototype.slice.call(arguments, 1);
		return format.replace(/{(\d+)}/g, function(match, number) { 
			return typeof args[number] != 'undefined'? args[number]: match;
		});
	};
}

function numberWithSpaces(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function stringStartsWith(string, prefix) {
	return !string.indexOf(prefix);
}

var passwordMatcher = function(value, element) {
	var password = $("#password").val();
	var confirmPassword = $("#repeatPassword").val();
	if (password
			&& password.length >= 8
			&& password != confirmPassword ) {
		return false;
	} else {
		return true;
	}
};

function convertToLocalDate(dateFormat) {
	$(".localdate").each(function(i, obj) {
		var localDate = moment(Number(obj.innerHTML)).toDate();
		obj.innerHTML = moment(localDate).format(dateFormat);
	});
};

function addPasswordValidationRule(ruleName) {
	$.validator.addMethod(
		ruleName,
		function(value, element) {
			var re = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,})/;
			return this.optional(element) || re.test(value);
		},
		"Пароль должен быть длиннее 8 симолов, а также содержать латинские буквы нижнего и верхнего регистра и цифры."
	);
};

function initPopup() {
	//----- ESCAPE
	$(document).keyup(function(e) {
		if (e.keyCode == 27) { // escape key maps to keycode `27`
			if ($('[data-popup]:visible').length) {
				$('[data-popup-close]:visible').click();
			}
		}
	});
	//----- OPEN
	$('[data-popup-open]').on('click', function(e)  {
		var targeted_popup_class = jQuery(this).attr('data-popup-open');
		$('[data-popup="' + targeted_popup_class + '"]').fadeIn(350);
		e.preventDefault();
	});
 
	//----- CLOSE
	$('[data-popup-close]').on('click', function(e)  {
		var targeted_popup_class = jQuery(this).attr('data-popup-close');
		$('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);
		e.preventDefault();
	});
};

function initLoadingDiv() {
	var $loading = $('#loading').hide();
	$(document)
		.ajaxStart(function () {
			$loading.show();
		})
		.ajaxStop(function () {
			$loading.hide();
		});
};