// This js file sets up the ability to have a clickable image play a video.
var videos = {
	"res-proj" : {
		'source' : '<iframe src="https://embed-ssl.ted.com/talks/stephen_friend_the_hunt_for_unexpected_genetic_heroes.html?autoplay=1" width="854" height="480" frameborder="0" scrolling="no" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>',
		'width' : 854,
		'height' : 400
	},
	"juhan-vid" : {
		'source' : '<iframe src="//player.vimeo.com/video/41157184?autoplay=1" width="854" height="480" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>',
		'width' : 854,
		'height' : 480
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
		var videoText = $(parentContainer.children('.video-text')[0]);
		var videoBackground = $(videoBanner.children('.video-background')[0]);
		var videoButtons = $(videoBanner.children('.video-control-button')[0]);
		var theID = videoBanner.prop('id');
		
		if(theID.indexOf('res-proj') >= 0) {
			setTimeout(function(){$('.mountsinai-container').css('margin-top', 0);}, 300);
				
		}
		else if(theID.indexOf('juhan-vid') >= 0) {
			setTimeout(function(){$('.partners').css('margin-top', 0);}, 300);
		}

		videoPlayer.html(videos[videoName]['source']);
		var videoFrame = $(videoPlayer.children('iframe')[0]);
		var sWidth = $(window).width();
		
		if(sWidth >= 760) {
			videoBanner.css('opacity', 0);
		}
		else {
			console.log(videoText);
			videoBanner.css('min-height', 750);	
		}
		
		if(sWidth <= videos[videoName]['width'] + 40) {
			rw = videos[videoName]['width'];
			rh = videos[videoName]['height'];
			newWidth = sWidth - 40;
			newHeight = (rh * newWidth)/rw;
			console.log(newHeight);
			videoFrame.attr('width', newWidth + 'px');
			videoFrame.attr('height', newHeight + 'px');
		}
		setTimeout(function() {
			//videoPlayer.fitVids();
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
