var animationSpeed = 400; //(x 1ms)

$(document).ready(function(event){
	// Init Objects
	var timelineObj = $('#timeline .slider-contents');
	var datesObj = $('#dates .slider-contents');

	// Init Sliders
	$('#timeline-slider-controller').slider({
		value: 0,
		max: 100,
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

	var dates = [
		{
			'date': '10000 BC',
			'index': 3.9
		},
		{
			'date': '4000 BC',
			'index': 31.7
		}, 
		{
			'date': '3000 BC',
			'index': 37.6
		}, 
		{
			'date': '400 BC',
			'index': 53.8
		}, 
		{
			'date': '1920',
			'index': 72.2
		}, 
		{
			'date': '1960',
			'index': 73.9
		}, 
		{
			'date': '2018',
			'index': 91
		}, 
		{
			'date': '2019',
			'index': 91.1
		}
	];

	$('#timeline-slider-controller').on('slide', function(event, ui){
		for (i=0;i<dates.length;i++) {
			// Init vars
			var current = dates[i];
			if (i > 0) {
				var past = dates[i-1];
			} elseif (i < dates.length-1){
				var future = dates[i+1];
			}
		}
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