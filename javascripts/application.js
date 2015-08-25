$(document).on('ready page:load', function() {
	var jPM = $.jPanelMenu({
		trigger: '.nav-btn-conteiner'
	});
	jPM.on();
	
	
//$(document).ready(function() {
	var amount_options = {
		start: 0,
		range: {
			'min': 0,
			'max': 10000
		},
		
		format: wNumb({
			decimals: 2,
			thousand: ' ',
			postfix: ' руб.',
		})
    };

	var time_options = {
		start: 0,
		range: {
			'min': 0,
			'max': 30
		},
		
		format: wNumb({
			decimals: 2,
			thousand: ' ',
			postfix: ' дней',
		})
    };

	$('#slider-amount').noUiSlider(amount_options);
	$('#slider-amount').Link('lower').to($('#amount-count'));
	
	$('#slider-time').noUiSlider(time_options);
	$('#slider-time').Link('lower').to($('#time-count'));
	
	$('.chosen-select').chosen({disable_search: true});
});