// This js file sets up the ability to have a clickable image play a video.
var videos = {
	"res-proj" : '<iframe src="https://embed-ssl.ted.com/talks/stephen_friend_the_hunt_for_unexpected_genetic_heroes.html?autoplay=1" width="854" height="480" frameborder="0" scrolling="no" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>'
};

$( document ).ready(function() {	
	var play = $('.video-control-button .play');
	play.on('click', function() {
		playT = $(this);
		videoName = playT.attr('datavideo');
		parentContainer = $(playT.parents('.hero-video-container')[0]);
		var videoPlayer = $(parentContainer.children('.video-player')[0]);
		var videoBanner = $(parentContainer.children('.video-banner')[0]);
		
		videoBanner.css('opacity', 0);
		
		videoPlayer.html(videos[videoName]);
		setTimeout(function() {
			videoBanner.css('display', 'none');
			videoPlayer.css('display', 'block');
		}, 300);
		
	});
	
});
