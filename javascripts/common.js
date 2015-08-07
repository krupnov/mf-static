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