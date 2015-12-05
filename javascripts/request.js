/**
 * 
 */

$(document).ready(function() {
	chooseCreditTransferOption.init();
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