var animationSpeed = 400; //(x 1ms)
var lastSlideIndex = 0;
var ableToNavigate = true;

var videos = [ 
		'#eye-tracking',
		'#crane'
	];

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

}

switchSlideAfter = function(percentage, slickObj, slidingObject){
	if (percentage > timelineValues[7] - ((timelineValues[7] - timelineValues[6])/2)) {
		slickObj.slickGoTo(7);
        slidingObject.slider('value', timelineValues[7]);
	} else if (percentage > timelineValues[6] - ((timelineValues[6] - timelineValues[5])/2)) {
		slickObj.slickGoTo(6);
        slidingObject.slider('value', timelineValues[6]);
	} else if (percentage > timelineValues[5] - ((timelineValues[5] - timelineValues[4])/2)) {
		slickObj.slickGoTo(5);
        slidingObject.slider('value', timelineValues[5]);
	} else if (percentage > timelineValues[4] - ((timelineValues[4] - timelineValues[3])/2) ){
		slickObj.slickGoTo(4);
        slidingObject.slider('value', timelineValues[4]);
	} else if (percentage > timelineValues[3] - ((timelineValues[3] - timelineValues[2])/2)) {
		slickObj.slickGoTo(3);
        slidingObject.slider('value', timelineValues[3]);
	} else if (percentage > timelineValues[2] - ((timelineValues[2] - timelineValues[1])/2)) {
		slickObj.slickGoTo(2);
        slidingObject.slider('value', timelineValues[2]);
	} else if (percentage > timelineValues[1] - ((timelineValues[1] - timelineValues[0])/2) ){
		slickObj.slickGoTo(1);
        slidingObject.slider('value', timelineValues[1]);
	} else if (percentage > (timelineValues[0])) {
		slickObj.slickGoTo(0);
        slidingObject.slider('value', timelineValues[0]);
	}
	return;
}

moveSlider = function(slide, slidingObject){
	slidingObject.slider('value', timelineValues[slide]);
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
	
	var videoTransitions = [
		{
			'caption' : $('#hgraphCaption')	,
			'video' : $('#hgraph')
		},
		{
			'caption' : $('#sleeper-caption')	,
			'video' : $('#sleeper-video')
		}
	];

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
			var currentSlide = timeline.slickCurrentSlide();
			moveSlider(currentSlide, $('#timeline-slider-controller'));
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
	
	$('.navigation ol li a').click(function() {
		elm = $(this).data('click');
		var sTop = $(elm).position().top - 120;
		sTop = sTop + 'px';
		
		$( 'body' ).animate({
			scrollTop: sTop
		  }, 500); 
	});
	
	moveCard = function(button, card) {
			var left = button.position().left;
			var top = $('#locations .slider-graphic').outerHeight() + $('#locations .slider-controls').outerHeight() - 5;
			var allCards = $('.calendar-graphics div'); 
		
			allCards.toggleClass('active', false);
			allCards.css('left', '-300px');
			allCards.css('top', top);
		
			card.toggleClass('active', true);
			card.css('left', left);
	};
	
	$('#locations .slide-button').click( function() {
		var index = $(this).attr('class');
		var i = index.indexOf(' slide');
		index = index.substring(i+6, i + 7);
		index = parseInt(index);
		switch(index) {
			case 0:
					moveCard($(this), $('.calendar-graphics .one'));
					break;
			case 1:
					moveCard($(this), $('.calendar-graphics .two'));
					break;
			case 2:
					moveCard($(this), $('.calendar-graphics .three'));
					break;
			case 3:
					moveCard($(this), $('.calendar-graphics .four'));
					break;
			case 4:
					moveCard($(this), $('.calendar-graphics .five'));
					break;
			case 5:
					moveCard($(this), $('.calendar-graphics .six'));
					break;
			default: 
					break;
		}
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
	
	
	
	var fixedElems = [
		{
			'scrollToShrink' : 	$('#blade-runner-wrapper'),
			'initialHeight' : $('#blade-runner-wrapper').height(),
			'initialPos' : parseInt($('#blade-runner-wrapper').position().top),
			'scrollText' : $('#blade-margin'),
			'scrollEmpty' : $('#blade-empty')
		},
		{
			'scrollToShrink' : 	$('#crane-wrapper'),
			'initialHeight' : $('#crane-wrapper').height(),
			'initialPos' : parseInt($('#crane-wrapper').position().top),
			'scrollText' : $('#crane-margin'),
			'scrollEmpty' : $('#crane-empty')
		},
		{
			'scrollToShrink' : 	$('#aging-wrapper'),
			'initialHeight' : $('#aging-wrapper').height(),
			'initialPos' : parseInt($('#aging-wrapper').position().top),
			'scrollText' : $('#aging-margin'),
			'scrollEmpty' : $('#aging-empty')
		}
	];
	
	moveCard($('#locations .slide-button.slide0'), $('.calendar-graphics .one'));
	
	var pastScrollTop = $(window).scrollTop();
	
	$(window).scroll(function(event) {
		var navHeight = $('#main-header').outerHeight() + $('.navigation').outerHeight();
		var currentScroll = $(window).scrollTop();
		var totalNavHeight = currentScroll + navHeight;
		var win = $(window);
		var windowWidth = win.width();
		var windowHeight = win.height();
		console.log(windowHeight);
		if(windowWidth > 1000){
			var l = fixedElems.length;

			// Loop over the array of HTML Elements that we want to scroll over
			for(var i = 0; i < l; i++) {

				var elemObject = fixedElems[i];
				var iPos = elemObject.initialPos;
				var iHei = elemObject.initialHeight;
				var elem = elemObject.scrollToShrink;
				var empty = elemObject.scrollEmpty;

				// initial position + initial height
				var iPosHei = iPos + iHei;  
				var scrollPosition = parseInt(elem.position().top) - navHeight;
				var currentHeight = elem.height();	 
				var hasClass = elem.hasClass('fix-me');

				// Is the top of our scroll currently overlapping the element &  it hasn't been fixed yet? Then fix it
				if(totalNavHeight >= iPos && !hasClass && totalNavHeight < iPosHei) {
					empty.css('height', elem.outerHeight() + 36);
					elem.toggleClass('fix-me', true);	
					elem.css('top', navHeight)
				} else if (totalNavHeight < iPos && hasClass) {
					elem.toggleClass('fix-me', false);
					empty.css('height', '0');
				}

				// Closing or opening
				if(currentScroll > pastScrollTop && currentHeight > 0) {
					if(currentScroll >= scrollPosition) {
						elem.height(currentHeight - (currentScroll - pastScrollTop));	
					}
				} else if(currentScroll < pastScrollTop && currentScroll < (iPosHei)  && currentHeight < iHei && totalNavHeight  < elemObject.scrollText.position().top - 36) {
					elem.height(currentHeight + (pastScrollTop - currentScroll));
				}

			}
		}
		pastScrollTop = currentScroll; // used to determine the scroll direction
		
		var vl = videos.length;
		
		for(var j=0; j < vl; j++) {
			var vElem = $(videos[j]);
			var pos = vElem.position().top;
			var ht = vElem.height();			
			
			if(currentScroll >= pos - windowHeight && currentScroll <= pos + (ht * 2)) {
				vElem.find('video').get(0).play();
			}
		}
		
		var tl = videoTransitions.length;
		
		for(var k=-0; k < tl; k++) {
			var tElem = videoTransitions[k];
			var tPos = tElem.caption.position().top;
			
			if(currentScroll >= tPos - windowHeight && tElem.caption.hasClass('initial-margin')) {
				tElem.caption.toggleClass('initial-margin', false);
				tElem.video.toggleClass('initial-hide', false);
				tElem.video.find('video').get(0).play()
			}
		}
		
	});

});


$(window).load(function(){
	$('.main-header video').get(0).play();
});

