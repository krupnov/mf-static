/**
 * 
 */
$(document).ready(function() {
	
	convertToLocalDate(messages["date.pattern"]);
	
	var slider_amount = document.getElementById('slider-amount'),
	slider_time = document.getElementById('slider-time'),
	input_amount = document.getElementById('input-amount'),
	input_time = document.getElementById('input-time');

	sliders_options.amount_options.start = initialAmount;
	sliders_options.time_options.start = initialPeriod;
	
	noUiSlider.create(slider_amount, sliders_options.amount_options);
	noUiSlider.create(slider_time, sliders_options.time_options);

	if($('div.get-credit-block').length > 0) {
		slider_amount.noUiSlider.on('update', function( values, handle ) {
			input_amount.value = values[handle];
		});
		
		input_amount.addEventListener('change', function(){
			slider_amount.noUiSlider.set(this.value);
		});
		
		slider_time.noUiSlider.on('update', function( values, handle ) {
			input_time.value = values[handle];
		});
		
		input_time.addEventListener('change', function(){ 
			slider_time.noUiSlider.set(this.value);
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