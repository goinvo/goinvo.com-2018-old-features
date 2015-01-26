var animationSpeed = 400; //(x 1ms)
var lastSlideIndex = 0;
var ableToNavigate = true;

var timelineValues = [
	0, // 10000 BC
	317, // 4000 BC
	376, // 3000 BC
	538, // 400 BC
	722, // 1920
	739, // 1926
	910, // 2018
	920 // 2019
];

var timelinePercents = [
    {
        "left" : "1%",
        "year" : "10000 BC"
    },
    {
        "left" : "31.7%",
        "year" : "4000 BC"
    },
    {
        "left" : "37.6%",
        "year" : "3000 BC"
    },
    {
        "left" : "53.8%",
        "year" : "400 BC"
    },
    {
        "left" : "72.2%",
        "year" : "1920"
    },
    {
        "left" : "75.5%",
        "year" : "1926"
    },
    {
        "left" : "91.0%",
        "year" : "2018"
    },
    {
        "left" : "94.0%",
        "year" : "2019"
    }
];

switchSlide = function(percentage, slickObj){
//	if (percentage > timelineValues[7] - ((timelineValues[7] - timelineValues[6])/2)) {
//		slickObj.slickGoTo(7);
//	} else if (percentage > timelineValues[6] - ((timelineValues[6] - timelineValues[5])/2)) {
//		slickObj.slickGoTo(6);
//	} else if (percentage > timelineValues[5] - ((timelineValues[5] - timelineValues[4])/2)) {
//		slickObj.slickGoTo(5);
//	} else if (percentage > timelineValues[4] - ((timelineValues[4] - timelineValues[3])/2) ){
//		slickObj.slickGoTo(4);
//	} else if (percentage > timelineValues[3] - ((timelineValues[3] - timelineValues[2])/2)) {
//		slickObj.slickGoTo(3);
//	} else if (percentage > timelineValues[2] - ((timelineValues[2] - timelineValues[1])/2)) {
//		slickObj.slickGoTo(2);
//	} else if (percentage > timelineValues[1] - ((timelineValues[1] - timelineValues[0])/2) ){
//		slickObj.slickGoTo(1);
//	} else if (percentage > (timelineValues[0])) {
//		slickObj.slickGoTo(0);
//	}
//	return;
}

switchSlideAfter = function(percentage, slickObj, slidingObject){
	if (percentage > timelineValues[7] - ((timelineValues[7] - timelineValues[6])/2)) {
		slickObj.slickGoTo(7);
        slidingObject.slider('value', timelineValues[7]);
		console.log(7);
	} else if (percentage > timelineValues[6] - ((timelineValues[6] - timelineValues[5])/2)) {
		slickObj.slickGoTo(6);
        slidingObject.slider('value', timelineValues[6]);
		console.log(6);
	} else if (percentage > timelineValues[5] - ((timelineValues[5] - timelineValues[4])/2)) {
		slickObj.slickGoTo(5);
        slidingObject.slider('value', timelineValues[5]);
		console.log(5);
	} else if (percentage > timelineValues[4] - ((timelineValues[4] - timelineValues[3])/2) ){
		slickObj.slickGoTo(4);
        slidingObject.slider('value', timelineValues[4]);
		console.log(4);
	} else if (percentage > timelineValues[3] - ((timelineValues[3] - timelineValues[2])/2)) {
		slickObj.slickGoTo(3);
        slidingObject.slider('value', timelineValues[3]);
		console.log(3);
	} else if (percentage > timelineValues[2] - ((timelineValues[2] - timelineValues[1])/2)) {
		slickObj.slickGoTo(2);
        slidingObject.slider('value', timelineValues[2]);
		console.log(2);
	} else if (percentage > timelineValues[1] - ((timelineValues[1] - timelineValues[0])/2) ){
		slickObj.slickGoTo(1);
        slidingObject.slider('value', timelineValues[1]);
		console.log(1);
	} else if (percentage > (timelineValues[0])) {
		slickObj.slickGoTo(0);
        slidingObject.slider('value', timelineValues[0]);
		console.log(0);
	}
	return;
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
    
    for(i in timelinePercents) {
        t = $('<div>' + timelinePercents[i].year + '</div>');
        t.css('left', timelinePercents[i].left);
		$('#timeline-dates').append(t)
    }
    

	var timeline = timelineObj.slick({
		arrows: true,
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
    
    $('#timeline-slider-controller').on( "slidestop", function( event, ui ) {
        switchSlideAfter(ui.value, timelineObj, $('#timeline-slider-controller'));
    } );

	$('#dates .slider-aside .slide-button').on('click', function(event){
		event.preventDefault();
		buttonSwitch(event, datesObj, '#dates .slider-controls', this);
	});

	$('#locations .slider-controls .slide-button').on('click', function(event){
		event.preventDefault();
		buttonSwitch(event, locationsObj, '#locations .slider-controls', this);
	});

});