var animationSpeed = 400; //(x 1ms)
var lastSlideIndex = 0;

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

$(document).ready(function(event){
	// Init Objects
	var timelineObj = $('#timeline .slider-contents');
	var datesObj = $('#dates .slider-contents');

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
		draggable: false
	});
	var dates = datesObj.slick({
		arrows: false,
		infinite: false,
		draggable: false
	});



	$('#timeline-slider-controller').on('slide', function(event, ui){
		switchSlide(ui.value, timelineObj);
	});

	$('#dates .slider-aside .date-1985').on('click', function(event){
		event.preventDefault();
		$('#dates .slider-aside a').removeClass('active');
		$(this).addClass('active');
		dates.slickGoTo(0);
	});

	$('#dates .slider-aside .date-2015').on('click', function(event){
		event.preventDefault();
		$('#dates .slider-aside a').removeClass('active');
		$(this).addClass('active');
		dates.slickGoTo(1);
	});

	$('#dates .slider-aside .date-2025').on('click', function(event){
		event.preventDefault();
		$('#dates .slider-aside a').removeClass('active');
		$(this).addClass('active');
		dates.slickGoTo(2);
	});

});