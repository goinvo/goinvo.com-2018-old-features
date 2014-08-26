$(document).ready(function(){
	var govtSlider = $('#govtSlider').slick({
		prevArrow: null,
		nextArrow: null,
		draggable: false,
		speed: 600
	});
	$('.slider-arrow').click(function(event) {
		event.preventDefault();
		if ($(this).hasClass('next')) {
			govtSlider.slickNext();
		} else {
			govtSlider.slickPrev();
		};
	});
	$('.govtSlides .visualNav .slider-button').click(function(event) {
		event.preventDefault();
		buttonClass = $(this).attr('class');
		slideNumber = buttonClass.replace( /^\D+/g, '');
		govtSlider.slickGoTo(parseInt(slideNumber));
	});

	var voteSlider = $('#votingSlider').slick({
		prevArrow: null,
		nextArrow: null,
		draggable: false,
		speed: 600
	});
	$('.votingSlides .visualNav .slider-button').click(function(event) {
		event.preventDefault();
		buttonClass = $(this).attr('class');
		slideNumber = buttonClass.replace( /^\D+/g, '');
		voteSlider.slickGoTo(parseInt(slideNumber));
	});
});