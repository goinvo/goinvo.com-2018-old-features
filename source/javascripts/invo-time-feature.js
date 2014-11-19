//JS file for the invo Timeline feature (currently it is called 'An-Oral-History')
$(document).ready(function() { 	
	reSizeVideo()
});

$( window ).resize(function() {
	reSizeVideo()
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