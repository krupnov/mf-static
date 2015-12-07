/**
 * 
 */

$(document).ready(function() {
	chooseCreditTransferOption.init($("div#credit-card"));
	initRequestFormSubmitProcess("#yandex-form", "#yandex-button");
	
	jQuery.extend(jQuery.validator.messages, {
		required: messages["org.hibernate.validator.constraints.NotEmpty.message"],
		number: messages["typeMismatch.java.lang.Integer"]
	});
	$("#yandex-form").validate({
		rules: {
			yandexAccount: {
//				required: true
			}
		},
		errorPlacement: function(error, element) {
				error.insertAfter(element);
			}
		});
});

function stringStartsWith(string, prefix) {
	return !string.indexOf(prefix);
}

function initRequestFormSubmitProcess(form_selector, ref_selector) {
	var form = $(form_selector);
	var ref = $(ref_selector);
	ref.click(function(e) {
		e.preventDefault();
		form.submit();
	});
	
	form.submit(function(ev) {
		if (!form.valid()) {
			return;
		}
		ref.hide("slow");
		$.ajax({
			type: form.attr("method"),
			url: form.attr("action"),
			data: form.serialize(),
			success: function(data, textStatus) {
				if (stringStartsWith(data, "<")) { //error in input form
					form.parent().replaceWith(data);
					initRequestFormSubmitProcess(form_selector, ref_selector);
					chooseCreditTransferOption.init($(form_selector).parent());
				} else if (stringStartsWith(data, messages["ajax.error"])) { //global error
					location.reload();
				} else { //success@requestId@resendTimeout
					var params = data.split("@");
					var requestId = params[1];
				}
			}
		});
		
		ev.preventDefault();
	});
}

var chooseCreditTransferOption = {
	init: function(default_credit_option) {
		
		$("div.credit-transfer-option-block").hide();
		default_credit_option.css('display', 'inline-block');
		
		$("input[name$='credit-transfer-option']").click(function() {
			var creditOption = $(this).val();
			
			$("div.credit-transfer-option-block").hide();
			$("div#" + creditOption).css('display', 'inline-block');
		})
	}
}