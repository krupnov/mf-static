/**
 * 
 */

function startTimer(timeout) {
	var inputButton = $("#sendRef"); 
	var messageHolder = $("#repeatMessageHolder");
	var interval = setInterval(function() {
		timeout-- ;
		messageHolder.text(messages["info.attempts.repeatlater"].replace("%d", timeout.toString()));
		if (timeout == 0) {
			clearInterval(interval);
			messageHolder.hide()
			inputButton.show("slow");
		}
	}, 1000);
}

function validateEditPhoneForm(form) {
	return form.validate({
		onkeyup: false,
		onclick: false,
		onfocusout: false,
		rules: {
			phoneNumber: {
				required: true
			}
		},
		messages: {
			phoneNumber: {
				required: messages["org.hibernate.validator.constraints.NotEmpty.message"],
			}
		},
		errorPlacement: function(error, element) {
			error.insertAfter(element.parent());
		}
	});
}

function validateSensSmsCodeForm(form) {
	return form.validate({
		rules: {
			smsCode: {
				required: true,
				number: true
			}
		},
		messages: {
			smsCode: {
				required: messages["org.hibernate.validator.constraints.NotEmpty.message"],
				number: messages["validation.phone.invalidcode"]
			}
		},
		errorPlacement: function(error, element) {
			error.insertAfter(element.parent());
		}
	});
}

function initAjaxSubmitForEditForm(form) {
	form.submit(function(ev) {
		if (!form.valid()) {
			return;
		}
		$("#sendButton").hide("fast");
		$("#sendRef").hide("fast");	
		$.ajax({
			type: form.attr("method"),
			url: form.attr("action"),
			data: form.serialize(),
			success: function(data, textStatus) {
				$("#repeatMessageHolder").show();
				if (data == -1) {
					$("#repeatMessageHolder").text(messages["info.attempts.exceeded"]);
				} else {
					$("#repeatMessageHolder").text(messages["info.attempts.repeatlater"].replace("%d", data.toString()));
					startTimer(data);
					$("#phonenumberconfirm").show("slow");
				}
			}
		});
		
		ev.preventDefault();
	});
	
	$("#sendRef").click(function(e) {
		e.preventDefault();
		form.submit();
	});
}

function intiAjaxSubmitForConfirmForm(form, smsValidator, phoneValidator) {
	form.submit(function(ev) {
		if (!form.valid()) {
			return;
		}
		$.ajax({
			type: form.attr("method"),
			url: form.attr("action"),
			data: form.serialize(),
			success: function(data, textStatus) {
				if (data == -1) {
					var errors = { smsCode : messages["validation.phone.invalidcode"]};
					smsValidator.showErrors(errors);
				} else if (data == -2) {
					var errors = { phoneNumber : messages["signin.error.userreserved"]};
					phoneValidator.showErrors(errors);
				} else {
					window.location.href = data;
				}
			}
		});
		
		ev.preventDefault();
	});
}

$(document).ready(function() {
	
	intiAjaxSubmitForConfirmForm(
			$("#phonenumberconfirm"),
			validateSensSmsCodeForm($("#phonenumberconfirm")),
			validateEditPhoneForm($("#phonenumberedit")));
	
	initAjaxSubmitForEditForm($("#phonenumberedit"))
	
	$("#phoneNumber").mask(messages["phonenumber.mask"]);
	
	if (initialTimeout > 0) {
		startTimer(initialTimeout);
	}
});