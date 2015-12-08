/**
 * 
 */

$(document).ready(function() {
	initTransferForms("credit-card");
	initPopup();
	
	jQuery.extend(jQuery.validator.messages, {
		required: messages["org.hibernate.validator.constraints.NotEmpty.message"],
		number: messages["typeMismatch.java.lang.Integer"]
	});
	$("#yandex-form").validate({
		rules: {
			yandexAccount: {
				required: true
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

function initTransferForms(transfer_form_selected) {
	$('[data-transfer-form-send]').on('click', function(e) {
		var targeted_form_class = jQuery(this).attr('data-transfer-form-send');
		$('[data-transfer-form="' + targeted_form_class + '"]').submit();
		e.preventDefault();
	});
	initCreditTransferOption($('[data-transfer-form="' + transfer_form_selected + '"]').parent());
	
	$('[data-transfer-form]').on('submit', function(e) {
		var form = jQuery(this);
		if (!form.valid()) {
			return;
		}
		$.ajax({
			type: form.attr("method"),
			url: form.attr("action"),
			data: form.serialize(),
			success: function(data, textStatus) {
				if (stringStartsWith(data, "<")) { //error in input form
					form.parent().replaceWith(data);
					initTransferForms(form.attr('data-transfer-form'));
				} else if (stringStartsWith(data, messages["ajax.error"])) { //global error
					location.reload();
				} else { //success@requestId@resendTimeout
					var params = data.split("@");
					var requestId = params[1];
				}
			}
		});
		e.preventDefault();
	});
}

function initPopup() {
	//----- ESCAPE
	$(document).keyup(function(e) {
		if (e.keyCode == 27) { // escape key maps to keycode `27`
			if ($('[data-popup]:visible').length) {
//				alert($('[data-popup]:visible').attr('data-popup'));
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

function initCreditTransferOption(default_credit_option) {
	
	$("div.credit-transfer-option-block").hide();
	default_credit_option.css('display', 'inline-block');
	
	$("input[name$='credit-transfer-option']").click(function() {
		var creditOption = $(this).val();
		
		$("div.credit-transfer-option-block").hide();
		$("div#" + creditOption).css('display', 'inline-block');
	})
}