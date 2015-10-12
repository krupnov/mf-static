$(document).on('ready page:load', function() {
	creditBlocks.init();
		
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
