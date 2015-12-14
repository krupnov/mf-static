/**
 * 
 */

$(document).ready(function() {
	initLoadingDiv();
	initTransferForms("credit-card");
	initPopup();
	
	jQuery.extend(jQuery.validator.messages, {
		required: messages["org.hibernate.validator.constraints.NotEmpty.message"],
		number: messages["typeMismatch.java.lang.Integer"]
	});
	initiYandexFormValidation();
	initCardFormValidation();
	initSmsForm();
	initRegisterCard();
});

function initiYandexFormValidation() {
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
}

function initCardFormValidation() {
	$("#creadit-card-form").validate({
		rules: {
			selectedCardSynonym: {
				required: true
			}
		},
		errorPlacement: function(error, element) {
			if (element.is(":hidden")) {
				element.next().parent().append(error);
			}
			else {
				error.insertAfter(element);
			}
		}
	});
}

function initSmsForm() {
	var $form = $("#smsForm");
	var $validator = $form.validate({
		rules: {
			value: {
				required: true,
				number: true
			}
		},
		errorPlacement: function(error, element) {
				error.insertAfter(element);
		}
	});
	$form.on("submit", function(e) {
		if (!$form.valid()) {
			return;
		}
		$.ajax({
			type: $form.attr("method"),
			url: $form.attr("action"),
			data: $form.serialize(),
			success: function(data, textStatus) {
				if (stringStartsWith(data, messages["ajax.code.invalidcode"])) { //invalid code
					var errors = {value : messages["validation.phone.invalidcode"]};
					$validator.showErrors(errors);
				} else if (stringStartsWith(data, messages["ajax.code.error"])) { //global error
					location.reload();
				} else { 
					window.location = messages["ajax.sms.successredirect"];
				}
			}
		});
		e.preventDefault();
	});
}

function initRegisterCard() {
	var $form = $("#register-card-form");
	$("#register-card-ref").click(function(e) {
		$form.submit();
		e.preventDefault();
	});
	$("#new-credit-card").mask("9999-9999-9999-9999");
	var $validator = $form.validate({
		rules: {
			value: {
				required: true
			}
		},
		errorPlacement: function(error, element) {
				error.insertAfter(element);
		}
	});
	$form.on("submit", function(e) {
		if (!$form.valid()) {
			return;
		}
		$.ajax({
			type: $form.attr("method"),
			url: $form.attr("action"),
			data: $form.serialize(),
			success: function(data, textStatus) {
				if (data.length == 0) {
					var errors = {value : "bla-bla-bla"};
					$validator.showErrors(errors);
				} else {
					$("#selectedCardSynonym option:gt(0)").remove();
					$.each(data, function(index, value) {
						$("#selectedCardSynonym").append($("<option></option>")
								.attr("value", value.synonym).text(value.mask));
						});
				}
			}
		});
		e.preventDefault();
	});
}

function initTransferForms(transfer_form_selected) {
	$('[data-transfer-form-send]').on('click', function(e) {
		var targeted_form_class = $(this).attr('data-transfer-form-send');
		$('[data-transfer-form="' + targeted_form_class + '"]').submit();
		e.preventDefault();
	});
	initCreditTransferOption($('#' + transfer_form_selected));
	
	$('[data-transfer-form]').on('submit', function(e) {
		var $form = $(this);
		if (!$form.valid()) {
			return;
		}
		
		$.ajax({
			type: $form.attr("method"),
			url: $form.attr("action"),
			data: $form.serialize(),
			success: function(data, textStatus) {
				if (stringStartsWith(data, "<")) { //error in input form
					$('[data-transfer-form-container="' + $form.attr('data-transfer-form') + '"]').replaceWith(data);
					initTransferForms($form.attr('data-transfer-form'));
				} else if (stringStartsWith(data, messages["ajax.code.error"])) { //global error
					location.reload();
				} else { //success@requestId@resendTimeout
					var params = data.split(messages["ajax.csv.delimiter"]);
					var requestId = params[1];
					$('[data-popup="popup-sms"]').fadeIn(350);
					$("#smsForm input:text:visible:first").focus();
				}
			}
		});
		e.preventDefault();
	});
	
	addNewCreditCard.init();
	$('.credit-card-selection').chosen({disable_search: true});
	$.validator.setDefaults({ ignore: ":hidden:not(select)" });
}

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

function initCreditTransferOption(default_credit_option) {
	
	$("div.credit-transfer-option-block").hide();
	default_credit_option.css('display', 'block');
	
	$("input[name$='credit-transfer-option']").click(function() {
		var creditOption = $(this).val();
		
		$("div.credit-transfer-option-block").hide();
		$("div#" + creditOption).css('display', 'block');
	})
}

var addNewCreditCard = {
	init: function() {
		$("div.new-credit-card-btn-name").click(function() {
			if (!$("div#add-new-credit-card").is(":visible")) {
				$("div#add-new-credit-card").css('display', 'block');
			} else {
				$("div#add-new-credit-card").css('display', 'none');
			}
		})
		$("a.cancel-btn").click(function() {
			$("div#add-new-credit-card").css('display', 'none');
		})
	}
}