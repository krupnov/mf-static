/**
 * 
 */

$(document).ready(function() {
	
	$("#requestForm").validate({
		rules: {
			acceptPolicy: {
				required: true
			}
		},
		messages: {
			acceptPolicy: {
				required: messages["validation.policies.loanrequest.notaccepted"]
			}
		},
		errorPlacement: function(error, element) {
			var name = element.attr("name");
			if (name == "acceptPolicy" || name == "acceptPersonalData") {
				$(element).next().next().after(error);
			} else {
				error.insertAfter(element);
			}
		}
	});
});