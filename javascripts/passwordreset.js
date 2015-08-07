/**
 * 
 */
$(document).ready(function() {
	jQuery.validator.addMethod("passwordMatch", passwordMatcher, "Your Passwords Must Match");
	addPasswordValidationRule("passwordPattern");
	$("#passwordreset").validate({
		rules: {
			password: {
				required: true,
				passwordPattern: true
			},
			repeatPassword: {
				passwordMatch: true
			}
		},
		messages: {
			password: {
				required: messages["org.hibernate.validator.constraints.NotEmpty.message"] + " "
			},
			repeatPassword: {
				passwordMatch: messages["validation.repeatpassword.notmatch"] + " "
			}
		},
		errorPlacement: function(error, element) {
			error.insertAfter(element.parent().parent());
		}
	});
});