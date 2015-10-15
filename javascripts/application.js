$(document).on('ready page:load', function() {
	creditBlocks.init();
	getCreditSliders.init();
	
	$('#mobile-nav').sidr({
		displace: false,
		onOpen: function(name) {
			$('html, body').css({
				'overflow': 'hidden',
				'height': '100%'
			})
		},
		onClose: function(name) {
			$('html, body').css({
				'overflow': 'auto',
				'height': 'auto'
			})
		},
	});
	$('#btn-close').click(function(){
		$.sidr('close', 'sidr');
	});
	
	// $('.chosen-select').chosen({disable_search: true});
});

var creditBlocks = {
	init: function() {
		if($('div.credit-status-block').length > 0) {
			var showText = '> Показать';
			var hideText = 'v Скрыть';
			
			var is_visible = false;
			
			// hide all of the elements with a class of 'toggle'
			$('#flip-block').hide();
			
			// capture clicks on the toggle links
			$('#flip').click(function() {
			
				// switch visibility
				is_visible = !is_visible;
			
				// change the link depending on whether the element is shown or hidden
				$(this).html( (!is_visible) ? showText : hideText);
				
				$(this).parent().next('#flip-block').toggle('slow');
			
			// return false so any link destination is not followed
				return false;
			});
		}
	}
}

var getCreditSliders = {
	init: function() {
		var amount_options = {
			start: 0,
			step: 1,
			range: {
				'min': 0,
				'max': 10000
			},

			format: wNumb({
				decimals: 0,
				thousand: ' ',
			})
	    };

		var time_options = {
			start: 0,
			step: 1,
			range: {
				'min': 0,
				'max': 30
			},

			format: wNumb({
				decimals: 0,
				thousand: ' ',
			})
	    };

		var slider_amount = document.getElementById('slider-amount'),
			slider_time = document.getElementById('slider-time'),
			amount_count = document.getElementById('amount-count'),
			time_count = document.getElementById('time-count'),
			input_amount = document.getElementById('input-amount'),
			input_time = document.getElementById('input-time');

		noUiSlider.create(slider_amount, amount_options);
		noUiSlider.create(slider_time, time_options);

		if($('div.promo-cover').length > 0) {
			slider_amount.noUiSlider.on('update', function( values, handle ) {
				amount_count.innerHTML = values[handle];
			});
			
			slider_time.noUiSlider.on('update', function( values, handle ) {
				time_count.innerHTML = values[handle];
			});
		}

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
	}
}