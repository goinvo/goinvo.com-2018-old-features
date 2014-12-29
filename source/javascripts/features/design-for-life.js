var animationSpeed = 400; //(x 1ms)
var lastSlideIndex = 0;
var ableToNavigate = true;

var timelineValues = [
	0, // 10000 BC
	31.7, // 4000 BC
	37.6, // 3000 BC
	53.8, // 400 BC
	72.2, // 1920
	73.9, // 1926
	91, // 2018
	92 // 2019
];

switchSlide = function(percentage, slickObj){
	if (percentage > (timelineValues[7] * 10)) {
		slickObj.slickGoTo(7);
	} else if (percentage > (timelineValues[6] * 10)) {
		slickObj.slickGoTo(6);
	} else if (percentage > (timelineValues[5] * 10)) {
		slickObj.slickGoTo(5);
	} else if (percentage > (timelineValues[4] * 10)) {
		slickObj.slickGoTo(4);
	} else if (percentage > (timelineValues[3] * 10)) {
		slickObj.slickGoTo(3);
	} else if (percentage > (timelineValues[2] * 10)) {
		slickObj.slickGoTo(2);
	} else if (percentage > (timelineValues[1] * 10)) {
		slickObj.slickGoTo(1);
	} else if (percentage > (timelineValues[0] * 10)) {
		slickObj.slickGoTo(0);
	}
}

buttonSwitch = function(event, slickObj, navElementSelector, navButton) {
	event.preventDefault();
	if (ableToNavigate) {
		ableToNavigate = false;
		navButtonClass = $(navButton).attr('class');
		slideNumber = navButtonClass.replace( /^\D+/g, '');
		$(navElementSelector + ' .slide-button.active').toggleClass('active');
		$(navButton).toggleClass('active');
		slickObj.slickGoTo(parseInt(slideNumber));
	}
}

$(document).ready(function(event){
	// Init Objects
	var timelineObj = $('#timeline .slider-contents');
	var datesObj = $('#dates .slider-contents');
	var locationsObj = $('#locations .slider-contents');

	// Slide
	switchSlide(0);

	// Init Sliders
	$('#timeline-slider-controller').slider({
		value: 0,
		max: 1000,
		min: 0,
		step: 1
	});

	var timeline = timelineObj.slick({
		arrows: false,
		infinite: false,
		draggable: false,
		onAfterChange: function() {
			ableToNavigate = true;
		}
	});
	var dates = datesObj.slick({
		arrows: false,
		infinite: false,
		draggable: false,
		onAfterChange: function() {
			ableToNavigate = true;
		}
	});
	var locations = locationsObj.slick({
		arrows: false,
		infinite: false,
		draggable: false,
		onAfterChange: function() {
			ableToNavigate = true;
		}
	});

	$('#timeline-slider-controller').on('slide', function(event, ui){
		switchSlide(ui.value, timelineObj);
	});

	$('#dates .slider-aside .slide-button').on('click', function(event){
		event.preventDefault();
		buttonSwitch(event, datesObj, '#dates .slider-controls', this);
	});

	$('#locations .slider-controls .slide-button').on('click', function(event){
		event.preventDefault();
		buttonSwitch(event, locationsObj, '#locations .slider-controls', this);
	});

});