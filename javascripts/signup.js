/**
 * 
 */
$(document).ready(function() {
	jQuery.validator.addMethod("passwordMatch", passwordMatcher, "Your Passwords Must Match");
	addPasswordValidationRule("passwordPattern");
	$('#signup').validate({
		rules: {
			login: {
				required: true,
				email: true
			},
			password: {
				required: true,
				passwordPattern: true
			},
			repeatPassword: {
				passwordMatch: true
			},
			"captcha.Value": {
				required: true
			}
		},
		messages: {
			login: {
				required: messages["org.hibernate.validator.constraints.NotEmpty.message"],
				email: messages["org.hibernate.validator.constraints.Email.message"]
			},
			password: {
				required: messages["org.hibernate.validator.constraints.NotEmpty.message"] + " ",
			},
			repeatPassword: {
				passwordMatch: messages["validation.repeatpassword.notmatch"] + " "
			},
			"captcha.Value": {
				required: messages["validation.captcha.prompt"]
			}
		},
		errorPlacement: function(error, element) {
			var attributeName = element.attr('name');
			if (attributeName == 'password'
					|| attributeName == 'repeatPassword'
					|| attributeName == 'captcha.Value') {
				error.insertAfter(element.parent().parent());
			} else {
				error.insertAfter(element.parent());
			}
		}
	});
});