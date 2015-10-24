/**
 * 
 */

function updateDebt(span_debt, initial_amount, period) {
	span_debt.textContent = Math.floor(Number(initial_amount)*(1 + Number(period) * rate / 100));
}

function updateReturnDate(span_return_date, period) {
	span_return_date.textContent = moment().add(Number(period), "days").format(messages["date.pattern"]);
}

$(document).ready(function() {
	
	convertToLocalDate(messages["date.pattern"]);
	
	var slider_amount = document.getElementById('slider-amount'),
	slider_time = document.getElementById('slider-time'),
	input_amount = document.getElementById('input-amount'),
	input_time = document.getElementById('input-time'),
	span_return_date = document.getElementById('return-date'),
	span_debt = document.getElementById('debt');

	sliders_options.amount_options.start = initialAmount;
	input_amount.value = initialAmount;
	sliders_options.time_options.start = initialPeriod;
	input_time.value = initialPeriod;
	
	noUiSlider.create(slider_amount, sliders_options.amount_options);
	noUiSlider.create(slider_time, sliders_options.time_options);

	if($('div.get-credit-block').length > 0) {
		slider_amount.noUiSlider.on('update', function( values, handle ) {
			input_amount.value = values[handle];
			updateDebt(span_debt, input_amount.value, input_time.value);
		});
		
		input_amount.addEventListener('change', function(){
			slider_amount.noUiSlider.set(this.value);
			updateDebt(span_debt, input_amount.value, input_time.value);
		});
		
		slider_time.noUiSlider.on('update', function( values, handle ) {
			input_time.value = values[handle];
			updateDebt(span_debt, input_amount.value, input_time.value);
			updateReturnDate(span_return_date, input_time.value);
		});
		
		input_time.addEventListener('change', function(){ 
			slider_time.noUiSlider.set(this.value);
			updateDebt(span_debt, input_amount.value, input_time.value);
			updateReturnDate(span_return_date, input_time.value);
		});
	}
	
	var loanRequestHref = document.getElementById('get-credit');
	var initialLoanRequestReference = loanRequestHref.href;
	loanRequestHref.href = "#";
	loanRequestHref.onclick = function () {
		window.location.href = initialLoanRequestReference + 
			"?amount=" + input_amount.value + 
			"&time=" + input_time.value;
		return false;
	};
});