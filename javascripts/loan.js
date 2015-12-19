/**
 * 
 */
$(document).ready(function() {
	
	var localStartDate = moment(loanStartDate).toDate();
	var localEndDate = moment(loanEndDate).toDate();
	var loanStateSpan = document.getElementById("loan-state");
	var refundButton = $("#refund");
	var initialAmount = document.getElementById("initial-amount");
	initialAmount.textContent = numberWithSpaces(initialAmount.textContent);
	
	$("#loan-period").text(moment(localStartDate).format(messages["date.pattern"]) + " - "
			+ moment(localEndDate).format(messages["date.pattern"]));
	var debt = document.getElementById("debt");
	if (canRefund) {
		debt.textContent = numberWithSpaces(debt.textContent);
	}
	if (currentLoan) {
		setInterval(function() {
			$.ajax({
				type: "GET",
				url: loanStateUrl,
				contentType: "application/json;charset=UTF-8",
				dataType: "json",
				success: function(data, textStatus) {
					loanStateSpan.textContent = data.state;
					if (data.canRefund) {
						debt.textContent = numberWithSpaces(data.debt) + ' руб.';
						fillRefundForm(data.refundForm)
						$("#debt-div").show("slow");
						refundButton.show("slow");
					} else {
						$("#debt-div").hide("slow");
						refundButton.hide("slow");
					}
					if (data.canArchive) {
						$("#archive").show("slow");
					} else {
						$("#archive").hide("slow");
					}
				},
				error: function() {
					location.reload(true);
				}
			}); 
		}, 10000);
	}
});

function fillRefundForm(refundData) {
	$("#refundForm").attr("action", refundData.formAction);
	$("#shopId").val(refundData.shopId);
	$("#scid").val(refundData.scid);
	$("#customerNumber").val(refundData.customerNumber);
	$("#sum").val(refundData.sum);
	$("#orderNumber").val(refundData.orderNumber);
	$("#paymentType").val(refundData.paymentType);
};