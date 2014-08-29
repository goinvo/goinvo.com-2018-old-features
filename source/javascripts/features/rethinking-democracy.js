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
		buttonClass = $(this).attr('class');
		slideNumber = buttonClass.replace( /^\D+/g, '');
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

	var voteSlider = $('#votingSlider').slick({
		prevArrow: null,
		nextArrow: null,
		draggable: false,
		speed: animationSpeed
	});
	$('.votingSlides .visualNav .slider-button').click(function(event) {
		event.preventDefault();
		buttonClass = $(this).attr('class');
		slideNumber = buttonClass.replace( /^\D+/g, '');
		voteSlider.slickGoTo(parseInt(slideNumber));
	});
});

$(window).load(function(event) {
	var padding01 = (($('.image.aside.caption-side img').height()-($('.image.aside.caption-side p').height()+6))/2);
	var padding02 = (($('.image.inline.caption-side img').height()-($('.image.inline.caption-side p').height()+6))/2);
	$('.image.aside.caption-side p').css({
		'padding-top': padding01,
		'padding-bottom': padding01
	});
	$('.image.inline.caption-side p').css({
		'padding-top': padding02,
		'padding-bottom': padding02
	});
});

$(window).resize(function(event){
	var currentSlideTotalHeight = $('#govtSlider .slick-active').outerHeight();
	var currentSlideTextHeight = $('#govtSlider .slick-active .text').outerHeight();
	$('#govtSlider .slick-list').css('height', currentSlideTotalHeight + 'px');
	$('#govtSlider .slick-active .image').css('height', currentSlideTextHeight + 'px');

	// Images
	var padding01 = (($('.image.aside.caption-side img').height()-($('.image.aside.caption-side p').height()+6))/2);
	var padding02 = (($('.image.inline.caption-side img').height()-($('.image.inline.caption-side p').height()+6))/2);
	$('.image.aside.caption-side p').css({
		'padding-top': padding01,
		'padding-bottom': padding01
	});
	$('.image.inline.caption-side p').css({
		'padding-top': padding02,
		'padding-bottom': padding02
	});
});