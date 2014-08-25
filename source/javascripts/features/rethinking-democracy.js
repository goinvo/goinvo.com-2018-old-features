$(document).ready(function(){
	var govtSlider = $('#govtSlider').bxSlider({
		adaptiveheight: true,
		pager: false,
		controls: false
	});
	$('.unslider-arrow').click(function(event) {
		event.preventDefault();
		if ($(this).hasClass('next')) {
			govtSlider.goToNextSlide();
		} else {
			govtSlider.goToPrevSlide();
		};
	});
	$('.govtSlides .visualNav .unslider-button').click(function(event) {
		event.preventDefault();
		buttonClass = $(this).attr('class');
		slideNumber = buttonClass.replace( /^\D+/g, '');
		govtSlider.goToSlide(parseInt(slideNumber));
	});

	var voteSlider = $('#votingSlider').bxSlider({
		adaptiveheight: true,
		pager: false,
		controls: false
	});
	$('.votingSlides .visualNav .unslider-button').click(function(event) {
		event.preventDefault();
		buttonClass = $(this).attr('class');
		slideNumber = buttonClass.replace( /^\D+/g, '');
		voteSlider.goToSlide(parseInt(slideNumber));
	});
});