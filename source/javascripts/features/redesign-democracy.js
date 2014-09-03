$(document).ready(function(){
	// Super Global Variable Time
	var animationSpeed = 400; //(x 1ms)

	// Init Governments Slider
	var govtSlider = $('#govtSlider').slick({
		prevArrow: null,
		nextArrow: null,
		draggable: false,
		dots: false,
		speed: animationSpeed
	});

	var currentSlideTotalHeight = $('#govtSlider .slick-active').outerHeight();
	var currentSlideTextHeight = $('#govtSlider .slick-active .text').outerHeight();
	$('#govtSlider .slick-list').css('height', currentSlideTotalHeight + 'px');
	$('#govtSlider .slick-active .image').css('height', currentSlideTextHeight + 'px');

	//If you click a slider's arrow...
	$('.slider-arrow').click(function(event) {
		event.preventDefault();
		stop();
		if ($(this).hasClass('next')) {
			govtSlider.slickNext();
		} else {
			govtSlider.slickPrev();
		}
		var currentSlideTotalHeight = $('#govtSlider .slick-active').outerHeight();
		var currentSlideTextHeight = $('#govtSlider .slick-active .text').outerHeight();
		$('#govtSlider .slick-list').animate({
			height: currentSlideTotalHeight + 'px'
		}, animationSpeed);
		$('#govtSlider .slick-active .image').css({
			height: currentSlideTextHeight + 'px'
		});

	});

	// If you click a government slider's buttons...
	$('.govtSlides .visualNav .slider-button').click(function(event) {
		//Get to the slide!
		event.preventDefault();
		stop();
		buttonClass = $(this).attr('class');
		slideNumber = buttonClass.replace( /^\D+/g, '');
		$('.govtSlides .visualNav .slider-button.active').toggleClass('active');
		$(this).toggleClass('active');
		govtSlider.slickGoTo(parseInt(slideNumber));

		// While that's happening, let's do something else, like reinit'ing the vars.
		var currentSlideTotalHeight = $('#govtSlider .slick-active').outerHeight();
		var currentSlideTextHeight = $('#govtSlider .slick-active .text').outerHeight();
		$('#govtSlider .slick-list').animate({
			height: currentSlideTotalHeight + 'px'
		}, animationSpeed);
		$('#govtSlider .slick-active .image').animate({
			height: currentSlideTextHeight + 'px'
		});
	});

	// Init Voting Slider
	var votingSlider = $('#votingSlider').slick({
		prevArrow: null,
		nextArrow: null,
		draggable: false,
		dots: false,
		speed: animationSpeed
	});

	var currentSlideTotalHeight = $('#votingSlider .slick-active').outerHeight();
	var currentSlideTextHeight = $('#votingSlider .slick-active .text').outerHeight();
	$('#votingSlider .slick-list').css('height', currentSlideTotalHeight + 'px');
	$('#votingSlider .slick-active .image').css('height', currentSlideTextHeight + 'px');

	// If you click a voting slider's buttons...
	$('.votingSlides .visualNav .slider-button').click(function(event) {
		//Get to the slide!
		event.preventDefault();
		stop();
		buttonClass = $(this).attr('class');
		slideNumber = buttonClass.replace( /^\D+/g, '');
		$('.votingSlides .visualNav .slider-button.active').toggleClass('active');
		$(this).toggleClass('active');
		votingSlider.slickGoTo(parseInt(slideNumber));

		// While that's happening, let's do something else, like reinit'ing the vars.
		var currentSlideTotalHeight = $('#votingSlider .slick-active').outerHeight();
		var currentSlideTextHeight = $('#votingSlider .slick-active .text').outerHeight();
		$('#votingSlider .slick-list').animate({
			height: currentSlideTotalHeight + 'px'
		}, animationSpeed);
		$('#votingSlider .slick-active .image').animate({
			height: currentSlideTextHeight + 'px'
		});
	});
});

$(window).load(function(event) {
	var winston = $('.image.aside.caption-side p').outerHeight();
	var avb = $('.image.inline.caption-side p').outerHeight();
	$('.image.aside.caption-side .winston').css({
		'height': winston
	});
	$('.image.inline.caption-side .avb').css({
		'height': avb
	});
});

$(window).resize(function(event){
	var currentSlideTotalHeight = $('#govtSlider .slick-active').outerHeight();
	var currentSlideTextHeight = $('#govtSlider .slick-active .text').outerHeight();
	$('#govtSlider .slick-list').css('height', currentSlideTotalHeight + 'px');
	$('#govtSlider .slick-active .image').css('height', currentSlideTextHeight + 'px');

	// Images
	var winston = $('.image.aside.caption-side p').outerHeight();
	var avb = $('.image.inline.caption-side p').outerHeight();
	$('.image.aside.caption-side .winston').css({
		'height': winston
	});
	$('.image.inline.caption-side .avb').css({
		'height': avb
	});
});