// This js file sets up the ability to have a clickable image play a video.
var videos = {
	"res-proj" : {
		'source' : '<iframe src="https://embed-ssl.ted.com/talks/stephen_friend_the_hunt_for_unexpected_genetic_heroes.html?autoplay=1" width="854" height="480" frameborder="0" scrolling="no" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>',
		'width' : 854,
		'height' : 400
	}
};

$( document ).ready(function() {	
	var play = $('.video-control-button .play');
	play.on('click', function() {
		playT = $(this);
		videoName = playT.attr('datavideo');
		parentContainer = $(playT.parents('.hero-video-container')[0]);
		var videoPlayer = $(parentContainer.children('.video-player')[0]);
		var videoBanner = $(parentContainer.children('.video-banner')[0]);
		var videoBackground = $(videoBanner.children('.video-background')[0]);
		var videoButtons = $(videoBanner.children('.video-control-button')[0]);

		videoPlayer.html(videos[videoName]['source']);
		var videoFrame = $(videoPlayer.children('iframe')[0]);
		var sWidth = $(window).width();
		
		if(sWidth >= 760) {
			videoBanner.css('opacity', 0);
		}
		
		
		if(sWidth <= 894) {
			rw = videos[videoName]['width'];
			rh = videos[videoName]['height'];
			newWidth = sWidth - 40;
			newHeight = (rh * newWidth)/rw;
			console.log(newHeight);
			videoFrame.attr('width', newWidth + 'px');
			videoFrame.attr('height', newHeight + 'px');
		}
		videoPlayer.fitVids();
		setTimeout(function() {
			if(sWidth >= 760){
				videoBanner.css('display', 'none');
			}
			else {
				videoBackground.css('display', 'none');	
				videoButtons.css('display', 'none');
			}
			videoPlayer.css('display', 'block');
		}, 300);
		
	});
	
});
