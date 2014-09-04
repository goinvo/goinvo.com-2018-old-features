$(document).ready(function(){
	// Super Global Variable Time
	var animationSpeed = 400; //(x 1ms)
	var ableToNavigate = true;

	// Menu Bar
	$('.main-nav a').on('click', function(event){
		event.preventDefault();
		var section = $(this).attr('href');
		var sectionLoc = ($(section).offset().top) - 115;
		$(this).toggleClass('active');
		$('body').animate({
			scrollTop: sectionLoc + 5
		});
	});

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
	// $('#govtSlider .slick-list').css('height', currentSlideTotalHeight + 'px');
	$('#govtSlider .slick-active .image').css('height', currentSlideTextHeight + 'px');

	//If you click a slider's arrow...
	$('.slider-arrow').on('click', function(event) {
		event.preventDefault();
		var currentSlideIndex = govtSlider.slickCurrentSlide();
		$('.govtSlides .visualNav .active').toggleClass('active');
		if ($(this).hasClass('next')) {
			govtSlider.slickNext();
			if (currentSlideIndex === 5) {
				$('.govtSlides .visualNav .active').toggleClass('active');
				$('.govtSlides .visualNav .slide0').toggleClass('active');
			} else {
				$('.govtSlides .visualNav .slide' + (currentSlideIndex + 1)).toggleClass('active');
			}
		} else {
			govtSlider.slickPrev();
			if (currentSlideIndex === 0) {
				$('.govtSlides .visualNav .active').toggleClass('active');
				$('.govtSlides .visualNav .slide5').toggleClass('active');
			} else {
				$('.govtSlides .visualNav .slide' + (currentSlideIndex - 1)).toggleClass('active');
			}
		}
		
		var currentSlideTotalHeight = $('#govtSlider .slick-active').outerHeight();
		var currentSlideTextHeight = $('#govtSlider .slick-active .text').outerHeight();
		// $('#govtSlider .slick-list').animate({
		// 	height: currentSlideTotalHeight + 'px'
		// }, animationSpeed, function(){
		// 	ableToNavigate = true;
		// });
		$('#govtSlider .slick-active .image').css({
			height: currentSlideTextHeight + 'px'
		});
	});

	// If you click a government slider's buttons...
	$('.govtSlides .visualNav .slider-button').on('click', function(event) {
		//Get to the slide!
		event.preventDefault();
		if (ableToNavigate) {
			ableToNavigate = false;
			$('#govtSlider').stop();
			$('#govtSlider .slick-list').stop();
			buttonClass = $(this).attr('class');
			slideNumber = buttonClass.replace( /^\D+/g, '');
			$('.govtSlides .visualNav .slider-button.active').toggleClass('active');
			$(this).toggleClass('active');
			govtSlider.slickGoTo(parseInt(slideNumber));

			// // While that's happening, let's do something else, like reinit'ing the vars.
			// var currentSlideTotalHeight = $('#govtSlider .slick-active').outerHeight();
			// var currentSlideTextHeight = $('#govtSlider .slick-active .text').outerHeight();
			$('#govtSlider .slick-active .image').css('height', currentSlideTextHeight + 'px');
			// $('#govtSlider .slick-list').animate({
			// 	height: currentSlideTotalHeight + 'px'
			// }, animationSpeed, function(){
			// 	ableToNavigate = true;
			// });
		}
	});

	// Init Voting Slider
	var votingSlider = $('#votingSlider').slick({
		prevArrow: null,
		nextArrow: null,
		draggable: false,
		dots: false,
		speed: animationSpeed
	});

	// var currentSlideTotalHeight = $('#votingSlider .slick-active').outerHeight();
	// var currentSlideTextHeight = $('#votingSlider .slick-active .text').outerHeight();
	// $('#votingSlider .slick-list').css('height', currentSlideTotalHeight + 'px');
	// $('#votingSlider .slick-active .image').css('height', currentSlideTextHeight + 'px');

	// If you click a voting slider's buttons...
	$('.votingSlides .visualNav .slider-button').on('click', function(event) {
		event.preventDefault();
		if (ableToNavigate) {
			ableToNavigate = false;
			buttonClass = $(this).attr('class');
			slideNumber = buttonClass.replace( /^\D+/g, '');
			$('.votingSlides .visualNav .slider-button.active').toggleClass('active');
			$(this).toggleClass('active');
			votingSlider.slickGoTo(parseInt(slideNumber));

			// // While that's happening, let's do something else, like reinit'ing the vars.
			// var currentSlideTotalHeight = $('#votingSlider .slick-active').outerHeight();
			// var currentSlideTextHeight = $('#votingSlider .slick-active .text').outerHeight();
			// $('#votingSlider .slick-list').animate({
			// 	'height': currentSlideTotalHeight + 'px'
			// }, animationSpeed, function(){
			// 	ableToNavigate = true;
			// });
		}
	});
});

$(window).load(function(event) {
	// Section Locations
	var scrollbarPosition = $('body').scrollTop();

	var section0loc = ($('#article-header').offset().top) - 115;
	var section1loc = ($('#section1').offset().top) - 115;
	var section2loc = ($('#section2').offset().top) - 115;
	var section3loc = ($('#section3').offset().top) - 115;
	var section4loc = ($('#section4').offset().top) - 115;
	var section5loc = ($('#section5').offset().top) - 115;
	var section6loc = ($('#section6').offset().top) - 115;
	var section7loc = ($('#section7').offset().top) - 115;
	var section8loc = ($('#section8').offset().top) - 115;

	if (scrollbarPosition < section1loc) {
		$('.main-nav a').removeClass('active');
	}
	if (scrollbarPosition > section1loc) {
		$('.main-nav a').removeClass('active');
		$('.main-nav a.one').toggleClass('active');
	}
	if (scrollbarPosition > section2loc) {
		$('.main-nav a').removeClass('active');
		$('.main-nav a.two').toggleClass('active');
	}
	if (scrollbarPosition > section3loc) {
		$('.main-nav a').removeClass('active');
		$('.main-nav a.three').toggleClass('active');
	}
	if (scrollbarPosition > section4loc) {
		$('.main-nav a').removeClass('active');
		$('.main-nav a.four').toggleClass('active');
	}
	if (scrollbarPosition > section5loc) {
		$('.main-nav a').removeClass('active');
		$('.main-nav a.five').toggleClass('active');
	}
	if (scrollbarPosition > section6loc) {
		$('.main-nav a').removeClass('active');
		$('.main-nav a.six').toggleClass('active');
	}
	if (scrollbarPosition > section7loc) {
		$('.main-nav a').removeClass('active');
		$('.main-nav a.seven').toggleClass('active');
	}
	if (scrollbarPosition > section8loc) {
		$('.main-nav a').removeClass('active');
		$('.main-nav a.eight').toggleClass('active');
	}

	// Header stuff for funsies.
	if ($('body').outerWidth(false) > 480) {
		var navHeight = $('.govtNav .main-nav').outerHeight();
		$('.govtNav').css('visibility', 'visible');
		$('.main-nav').css({
			'height': '0',
			'overflow': 'hidden',
		});
		var navCue = (($('#article-header').offset().top) + ($('#article-header').outerHeight()) - 55);
		var scrollbarPosition = $('body').scrollTop();
		if (scrollbarPosition > navCue) {
			$('.main-nav').css({
				'border-right': '2px solid #CCC',
				'border-left': '2px solid #CCC',
				'border-bottom': '2px solid #DDD'
			});
			$('.main-nav').animate({
				'height': navHeight + 'px'
			});
		}
		$(window).on('scroll', function(event){
			var navCue = (($('#article-header').offset().top) + ($('#article-header').outerHeight()) - 55); // Exclude Margins
			var scrollbarPosition = $('body').scrollTop();
			if (scrollbarPosition > navCue) {
				$('.main-nav').css({
					'border-right': '2px solid #CCC',
					'border-left': '2px solid #CCC',
					'border-bottom': '2px solid #DDD',
					'height': navHeight + 'px'
				});
			} else if (scrollbarPosition < navCue) {
				$('.main-nav').css({
					'border-bottom': '0px solid #DDD',
					'height': '0px'
				});
			}

			// Section positions
			if (scrollbarPosition < section1loc) {
				$('.main-nav a').removeClass('active');
			}
			if (scrollbarPosition > section1loc) {
				$('.main-nav a').removeClass('active');
				$('.main-nav a.one').toggleClass('active');
			}
			if (scrollbarPosition > section2loc) {
				$('.main-nav a').removeClass('active');
				$('.main-nav a.two').toggleClass('active');
			}
			if (scrollbarPosition > section3loc) {
				$('.main-nav a').removeClass('active');
				$('.main-nav a.three').toggleClass('active');
			}
			if (scrollbarPosition > section4loc) {
				$('.main-nav a').removeClass('active');
				$('.main-nav a.four').toggleClass('active');
			}
			if (scrollbarPosition > section5loc) {
				$('.main-nav a').removeClass('active');
				$('.main-nav a.five').toggleClass('active');
			}
			if (scrollbarPosition > section6loc) {
				$('.main-nav a').removeClass('active');
				$('.main-nav a.six').toggleClass('active');
			}
			if (scrollbarPosition > section7loc) {
				$('.main-nav a').removeClass('active');
				$('.main-nav a.seven').toggleClass('active');
			}
			if (scrollbarPosition > section8loc) {
				$('.main-nav a').removeClass('active');
				$('.main-nav a.eight').toggleClass('active');
			}
		});
	}
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
	// Article Section Positons Recalculations
	var section0loc = ($('#article-header').offset().top) - 115;
	var section1loc = ($('#section1').offset().top) - 115;
	var section2loc = ($('#section2').offset().top) - 115;
	var section3loc = ($('#section3').offset().top) - 115;
	var section4loc = ($('#section4').offset().top) - 115;
	var section5loc = ($('#section5').offset().top) - 115;
	var section6loc = ($('#section6').offset().top) - 115;
	var section7loc = ($('#section7').offset().top) - 115;
	var section8loc = ($('#section8').offset().top) - 115;

	// var currentSlideTotalHeight = $('#govtSlider .slick-active').outerHeight();
	// var currentSlideTextHeight = $('#govtSlider .slick-active .text').outerHeight();
	// $('#govtSlider .slick-list').css('height', currentSlideTotalHeight + 'px');
	// $('#govtSlider .slick-active .image').css('height', currentSlideTextHeight + 'px');

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