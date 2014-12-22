var animationSpeed = 400; //(x 1ms)

$(document).ready(function(event){
	// Init Objects
	var timelineObj = $('#timeline .slider-contents');
	var datesObj = $('#dates .slider-contents');

	// Init Sliders
	$('#timeline-slider-controller').slider({
		value: -10000,
		max: 2050,
		min: -10200,
		step: 50
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

	var dates = ['10000 BC', '4000 BC', '3000 BC', '400 BC', '1920', '1960', '2018', '2019'];

	$('#timeline-slider-controller').on('slidechange', function(event){
		console.log($('#timeline-slider-controller').slider('value'));
	});

	$('#dates .slider-aside .date-1985').on('click', function(event){
		event.preventDefault();
		dates.slickGoTo(0);
	});

	$('#dates .slider-aside .date-2015').on('click', function(event){
		event.preventDefault();
		dates.slickGoTo(1);
	});

	$('#dates .slider-aside .date-2025').on('click', function(event){
		event.preventDefault();
		dates.slickGoTo(2);
	});

});