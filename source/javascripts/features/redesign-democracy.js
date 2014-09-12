// Super Global Variable Time
var animationSpeed = 400; //(x 1ms)
var ableToNavigate = true;
var govtSliderObj = $('#govtSlider');
var votingSliderObj = $('#votingSlider');

// Colors!!
var orange = '#bc743e';
var red = '#d65f4d';
var teal = '#9ec2b7';
var green = '#7f8732';
var blue = '#51697b';
var yellow = '#ddb40a';

// Functions
var setImageHeight = function(container, image) {
	image.css('height', container.height() + 'px');
}

var setAsideImages = function() {
	var winston_aside = $('.winston.image.aside.caption-side p').outerHeight();
	var winston_inline = $('.winston.image.inline.caption-side p').outerHeight();
	var avb = $('.avb.image.caption-side p').outerHeight();
	$('.winston.image.aside.caption-side div').css({
		'height': winston_aside
	});
	$('.winston.image.inline.caption-side div').css({
		'height': winston_inline
	});
	$('.avb.image.caption-side div').css({
		'height': avb
	});
}

var setNavHeight = function() {
	navHeight = $('.nav-wrapper .main-nav').outerHeight();
}

var setNavCuePoint = function() {
	navCue = (($('#article-header').offset().top) + ($('#article-header').outerHeight()) - 55);
}

var setScrollbarLoc = function() {
	scrollbarPosition = $('body').scrollTop();
}

var setScrollbarRelations = function() {
	if (scrollbarPosition > navCue) {
		$('.main-nav').css({
			'height': navHeight + 'px',
			'border-bottom': '2px solid #DDD'
		});
	} else if (scrollbarPosition < navCue) {
		$('.main-nav').css({
			'height': '0px',
			'border-bottom': '0px solid #DDD'
		});
	}
}

// Section positons are logged for nav callouts.
var setSectionLocations = function() {
	section0loc = ($('#article-header').offset().top) - 65 - navHeight;
	section1loc = ($('#section1').offset().top) - 65 - navHeight;
	section2loc = ($('#section2').offset().top) - 65 - navHeight;
	section3loc = ($('#section3').offset().top) - 65 - navHeight;
	section4loc = ($('#section4').offset().top) - 65 - navHeight;
	section5loc = ($('#section5').offset().top) - 65 - navHeight;
}

// These relations use the locations defined above.
var setSectionRelations = function() {
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
}

var scrollToSec = function(sectionLinkElement) {
	event.preventDefault();
	var section = $(sectionLinkElement).attr('href');
	console.log(section);
	if ($(window).width() > 830) {
		var navHeight = $('.nav-wrapper .nav-button').outerHeight();
		var sectionLoc = ($(section).offset().top) - 95 - navHeight;
		console.log(sectionLoc);
	} else if ($(window).width() < 830) {
		var navHeight = $('.nav-wrapper .nav-button').outerHeight();
		var sectionLoc = ($(section).offset().top) - 65 - navHeight;
		$('.main-nav').toggleClass('open');
	}
	$('.main-nav a.active').removeClass('active');
	$(sectionLinkElement).toggleClass('active');
	$('body').animate({
		scrollTop: sectionLoc + 5
	});
}

var setAll = function() {
	setNavHeight();
	setNavCuePoint();
	setScrollbarLoc();
	setScrollbarRelations();
	setSectionLocations();
	setSectionRelations();
}

var setMobile = function() {
	setNavHeight();
	setAsideImages();
	setScrollbarLoc();
	setSectionLocations();
	setSectionRelations();
}

var arrowClick = function(sliderObject, visualNavElement, arrowElement) {
	event.preventDefault();
	var currentSlideIndex = sliderObject.slickCurrentSlide();
	if (ableToNavigate) {
		ableToNavigate = false;
		$(visualNavElement + ' .active').toggleClass('active');
		if ($(arrowElement).hasClass('next')) {
			sliderObject.slickNext();
			if (currentSlideIndex === 5) {
				$(visualNavElement + ' .slide0').toggleClass('active');
				currentSlideIndex = 0;
			} else {
				$(visualNavElement + ' .slide' + (currentSlideIndex + 1)).toggleClass('active');
				currentSlideIndex = currentSlideIndex + 1;
			}
		} else {
			sliderObject.slickPrev();
			if (currentSlideIndex === 0) {
				$(visualNavElement + ' .slide5').toggleClass('active');
				currentSlideIndex = 5;
			} else {
				$(visualNavElement + ' .slide' + (currentSlideIndex - 1)).toggleClass('active');
				currentSlideIndex = currentSlideIndex - 1;
			}
		}
		if (sliderObject = votingSlider) {
			var currentSlideTotalHeight = $('#votingSlider .slick-active').outerHeight();
			var currentSlideTextHeight = $('#votingSlider .slick-active .text').outerHeight();
			$('#votingSlider .slick-list').animate({
				'height': currentSlideTotalHeight + 'px'
			}, animationSpeed, function(){
				ableToNavigate = true;
			});
		}
	}
}

var buttonClick = function(sliderObject, visualNavElement, buttonElement) {
	event.preventDefault();
	if (ableToNavigate) {
		ableToNavigate = false;
		buttonClass = $(buttonElement).attr('class');
		slideNumber = buttonClass.replace( /^\D+/g, '');
		$(visualNavElement + ' .slider-button.active').toggleClass('active');
		$(buttonElement).toggleClass('active');
		sliderObject.slickGoTo(parseInt(slideNumber));
		if (sliderObject = votingSlider) {
			var currentSlideTotalHeight = $('#votingSlider .slick-active').outerHeight();
			var currentSlideTextHeight = $('#votingSlider .slick-active .text').outerHeight();
			$('#votingSlider .slick-list').animate({
				'height': currentSlideTotalHeight + 'px'
			}, animationSpeed, function(){
				ableToNavigate = true;
			});
		}
	}
}

var colorChange = function(sliderObject) {
	var currentSlideIndex = sliderObject.slickCurrentSlide();
	$('.govtSlides .visualNav a').removeClass('active');
	$('.govtSlides .visualNav .slide' + (currentSlideIndex)).toggleClass('active');
	if (currentSlideIndex === 0) {
		color = orange;
	}
	if (currentSlideIndex === 1) {
		color = red;
	}
	if (currentSlideIndex === 2) {
		color = teal;
	}
	if (currentSlideIndex === 3) {
		color = green;
	}
	if (currentSlideIndex === 4) {
		color = blue;
	}
	if (currentSlideIndex === 5) {
		color = yellow;
	}
	$('#' + sliderObject.attr('id') + ' .slick-list').css('border-color', color);

}

$(document).ready(function(){
	// Menu Bar
	$('.main-nav a').on('click', function(event){
		event.preventDefault();
		scrollToSec(this);
	});
	$('.nav-wrapper .nav-button').on('click', function(event){
		event.preventDefault();
		$('.main-nav').toggleClass('open');
	});

	setImageHeight($('#govtSlider .slick-list'), $('#govtSlider .image'));
	
});

$(window).load(function(event) {
	//Set everything up
	var currentSlideTotalHeight = $('#votingSlider .slick-active').outerHeight();
	var currentSlideTextHeight = $('#votingSlider .slick-active .text').outerHeight();
	$('#votingSlider .slick-list').css({
		'height': currentSlideTotalHeight + 'px'
	});

	// Init Governments Slider
		govtSlider = govtSliderObj.slick({
			prevArrow: null,
			nextArrow: null,
			dots: false,
			speed: animationSpeed,
			onAfterChange: function() {
				colorChange(govtSlider);
				ableToNavigate = true;
			}
		});

		// Init Voting Slider
		votingSlider = votingSliderObj.slick({
			prevArrow: null,
			nextArrow: null,
			draggable: false,
			dots: false,
			speed: animationSpeed
		});
	$('.govtSlides .buttonNav .slider-arrow').on('click', function(event){
			arrowClick(govtSlider, '.govtSlides .visualNav', this);
			colorChange(govtSlider);
		});

		$('.govtSlides .visualNav .slider-button').on('click', function(event){
			buttonClick(govtSlider, '.govtSlides .visualNav', this);
			colorChange(govtSlider);
		});

		var currentSlideHeight = $('#votingSlider .slick-active').outerHeight();
		$('#votingSlider .slick-list').css('height', currentSlideHeight + 'px');

		$('.votingSlides .buttonNav .slider-arrow').on('click', function(event){
			arrowClick(votingSlider, '.votingSlides .visualNav', this);
		});

		$('.votingSlides .visualNav .slider-button').on('click', function(event){
			buttonClick(votingSlider, '.votingSlides .visualNav', this);
		});

	//Action
	$('.action .button').on('click', function(event){
		event.preventDefault();
		$(this).delay(200).animate({
			opacity: 0
		}, animationSpeed, function(){
			$(this).addClass('closed');
			$(this).siblings('.form').addClass('open');
		});
		window.setTimeout(
		function() {
			setAll();
			console.log('Wheee!');
		}, 800);
	});

	if ($(window).width() > 830) {
		setAll();
		$(window).on('scroll', function(event){
			setNavCuePoint();
			setScrollbarLoc();
			setScrollbarRelations();
			setSectionRelations();
		});
	} else if ($(window).width() < 830) {
		setMobile();
	}
	setAsideImages();
});

$(window).resize(function(event){
	if ($(window).width() > 830) {
		$('.main-nav').css('height', 'auto');
		setAll();
	} else if ($(window).width() < 830) {
		setMobile();
		$('.main-nav').css({
			'height': '',
			'border-bottom-width': '',
			'border-bottom-style': '',
			'border-bottom-color': ''
		});
	}
	
	// Images
	setAsideImages();
});