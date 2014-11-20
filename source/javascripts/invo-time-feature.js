//JS file for the invo Timeline feature (currently it is called 'An-Oral-History')
$(document).ready(function() { 	
	reSizeVideo()
});

$( window ).resize(function() {
	reSizeVideo()
});

$(function() {
    $(".rslides").responsiveSlides({
  auto: false,             // Boolean: Animate automatically, true or false
  speed: 500,            // Integer: Speed of the transition, in milliseconds
  timeout: 4000,          // Integer: Time between slide transitions, in milliseconds
  pager: false,           // Boolean: Show pager, true or false
  nav: true,             // Boolean: Show navigation, true or false
  random: true,          // Boolean: Randomize the order of the slides, true or false
  pause: false,           // Boolean: Pause on hover, true or false
  pauseControls: true,    // Boolean: Pause when hovering controls, true or false
  prevText: "",   // String: Text for the "previous" button
  nextText: "",       // String: Text for the "next" button
  maxwidth: "",           // Integer: Max-width of the slideshow, in pixels
  navContainer: "",       // Selector: Where controls should be appended to, default is after the 'ul'
  manualControls: "",     // Selector: Declare custom pager navigation
  namespace: "rslides",   // String: Change the default namespace used
  before: function(){},   // Function: Before callback
  after: function(){}     // Function: After callback
});
  });

// Resizing the one sidebar video
function reSizeVideo() {
	var videoFrame = $('#juhan-video, #juhan-video-wrap');
	var sWidth = $(window).width();
	
	
	if (sWidth <= 1080 && sWidth > 900) {
		sWidth = 298;
	}
	
	else if(sWidth <= 900 && sWidth > 750) {
		sWidth = 256;
	}

	else if(sWidth <= 750) {
		sWidth = $(window).width();
	}
	
	if(sWidth <= 1080) {
		rw = 283;
		rh = 159;
		newWidth = sWidth - 40;
		newHeight = (rh * newWidth)/rw;
		videoFrame.attr('width', newWidth + 'px');
		videoFrame.attr('height', newHeight + 'px');	
	}
}