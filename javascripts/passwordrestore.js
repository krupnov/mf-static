/**
 * 
 */
$(document).ready(function() {
	$("#passwordrestore").validate({
		rules: {
			login: {
				required: true,
				email: true
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
			"captcha.Value": {
				required: messages["validation.captcha.prompt"]
			}
		},
		errorPlacement: function(error, element) {
			var attributeName = element.attr('name');
			if (attributeName == 'captcha.Value') {
				error.insertAfter(element.parent().parent());
			} else {
				error.insertAfter(element.parent());
			}
		}
	});
});