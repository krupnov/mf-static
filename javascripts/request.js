/**
 * 
 */

$(document).ready(function() {
	chooseCreditTransferOption.init();
	
	document.getElementById('yandex-button').addEventListener("click", function () {
		if ($("#yandex-form").valid())
			$("#yandex-form").submit();
	});
	
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

var chooseCreditTransferOption = {
	init: function() {
		
		$("div.credit-transfer-option-block").hide();
		$("div#credit-card").css('display', 'inline-block');
		
		$("input[name$='credit-transfer-option']").click(function() {
			var creditOption = $(this).val();
			
			$("div.credit-transfer-option-block").hide();
			$("div#" + creditOption).css('display', 'inline-block');
		})
	}
}