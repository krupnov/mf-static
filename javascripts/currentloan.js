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
	var debt = document.getElementById("debt");
	debt.textContent = numberWithSpaces(debt.textContent);
	
	$("#loan-period").text(moment(localStartDate).format(messages["date.pattern"]) + " - "
			+ moment(localEndDate).format(messages["date.pattern"]));
	setInterval(function() {
		$.ajax({
			type: "GET",
			url: loanStateUrl,
			contentType: "application/json;charset=UTF-8",
			dataType: "json",
			success: function(data, textStatus) {
				loanStateSpan.textContent = data.state;
				if (data.canRefund) {
					refundButton.show("slow");
				} else {
					refundButton.hide("slow");
				}
			},
			error: function() {
				location.reload(true);
			}
		});
	}, 10000)
});