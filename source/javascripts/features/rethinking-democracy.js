$(document).ready(function(){
	var govtSlider = $('#govtSlider').unslider();
	$('.unslider-arrow').click(function(event) {
		event.preventDefault();
		if ($(this).hasClass('next')) {
			govtSlider.data('unslider').next();
		} else {
			govtSlider.data('unslider').prev();
		};
	});
	$('.govtSlides .visualNav .unslider-button').click(function(event) {
		event.preventDefault();
		buttonClass = $(this).attr('class');
		slideNumber = buttonClass.replace( /^\D+/g, '');
		govtSlider.data('unslider').move(parseInt(slideNumber));
	});

	var voteSlider = $('#votingSlider').unslider();
	$('.votingSlides .visualNav .unslider-button').click(function(event) {
		event.preventDefault();
		buttonClass = $(this).attr('class');
		slideNumber = buttonClass.replace( /^\D+/g, '');
		voteSlider.data('unslider').move(parseInt(slideNumber));
	});
});