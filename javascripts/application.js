$(document).on('ready page:load', function() {
//	creditBlocks.init();
	
	if(($('div.promo-cover').length > 0)) {
		getCreditSliders.init();
	}
	
	if(($('div.get-credit-block').length > 0)) {
		getCreditSliders.init();
	}
	
	if(($('div.credit-transfer-block').length > 0)) {
		chooseCreditTransferOption.init();
	}
	
	if(($('div.credit-transfer-option-block').length > 0)) {
		addNewCreditCard.init();
		
		$('.credit-card-selection').chosen({disable_search: true});
	}
	
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

var sliders_options = {
	amount_options : {
			start: 3000,
			step: 100,
			range: {
				'min': 1000,
				'max': 10000
			},

			format: {
				  to: function ( value ) {
						return Math.round(value);
					  },
					  from: function ( value ) {
						return value;
					  }
					}
		},
	time_options : {
			start: 7,
			step: 1,
			range: {
				'min': 5,
				'max': 30
			},

			format: wNumb({
				decimals: 0,
				thousand: ' ',
			})
		}
};

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

		var slider_amount = document.getElementById('slider-amount'),
			slider_time = document.getElementById('slider-time'),
			amount_count = document.getElementById('amount-count'),
			time_count = document.getElementById('time-count')

		noUiSlider.create(slider_amount, sliders_options.amount_options);
		noUiSlider.create(slider_time, sliders_options.time_options);

		if($('div.promo-cover').length > 0) {
			slider_amount.noUiSlider.on('update', function( values, handle ) {
				amount_count.innerHTML = values[handle];
			});
			
			slider_time.noUiSlider.on('update', function( values, handle ) {
				time_count.innerHTML = values[handle];
			});
		}
	}
}

var chooseCreditTransferOption = {
	init: function() {
		$("input[name$='credit-transfer-option']").click(function() {
			var creditOption = $(this).val();
			
			$("div.credit-transfer-option-block").hide();
			$("div#" + creditOption).css('display', 'block');
		})
	}
}

var addNewCreditCard = {
	init: function() {
		$("div.new-credit-card-btn-name").click(function() {
			$("div#add-new-credit-card").css('display', 'block');
		})
		$("a.cancel-btn").click(function() {
			$("div#add-new-credit-card").css('display', 'none');
		})
	}
}