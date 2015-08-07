/**
 * 
 */
$(document).ready(function() {
	$('#login').validate({
		rules: {
			login: {
				required: true,
				email: true
			},
			password: {
				required: true
			}
		},
		messages: {
			login: {
				required: messages["org.hibernate.validator.constraints.NotEmpty.message"],
				email: messages["org.hibernate.validator.constraints.Email.message"]
			},
			password: {
				required: messages["org.hibernate.validator.constraints.NotEmpty.message"]
			}
		},
		errorPlacement: function(error, element) {
			error.insertAfter(element.parent());
		}
	});
});