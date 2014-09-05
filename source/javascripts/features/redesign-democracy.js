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
	var winston = $('.image.aside.caption-side p').outerHeight();
	var avb = $('.image.inline.caption-side p').outerHeight();
	$('.image.aside.caption-side .winston').css({
		'height': winston
	});
	$('.image.inline.caption-side .avb').css({
		'height': avb
	});
}

var setNavHeight = function() {
	navHeight = $('.govtNav .main-nav').outerHeight();
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
	section6loc = ($('#section6').offset().top) - 65 - navHeight;
	section7loc = ($('#section7').offset().top) - 65 - navHeight;
	section8loc = ($('#section8').offset().top) - 65 - navHeight;
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
}

var setAll = function() {
	setNavHeight();
	setNavCuePoint();
	setScrollbarLoc();
	setScrollbarRelations();
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
		var section = $(this).attr('href');
		var sectionLoc = ($(section).offset().top) - 65 - navHeight;
		$('.main-nav a.active').removeClass('active');
		$(this).toggleClass('active');
		$('body').animate({
			scrollTop: sectionLoc + 5
		});
	});

	// Init Governments Slider
	govtSlider = govtSliderObj.slick({
		prevArrow: null,
		nextArrow: null,
		draggable: false,
		dots: false,
		speed: animationSpeed,
		onAfterChange: function() {
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

	setImageHeight($('#govtSlider .slick-list'), $('#govtSlider .image'));
	
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
});

$(window).load(function(event) {
	//Set everything up
	if ($(window).width() > 830) {
		setAll();
		$(window).on('scroll', function(event){
			setNavCuePoint();
			setScrollbarLoc();
			setScrollbarRelations();
			setSectionRelations();
		});
	}
	// Header stuff for funsies.
	setAsideImages();
});

$(window).resize(function(event){
	if ($(window).width() > 830) {
		$('.main-nav').css('height', 'auto');
		setAll();
	} if ($(window).width() < 830) {
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