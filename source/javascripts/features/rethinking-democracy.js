$(document).ready(function(){

	var govtSlider = $('#govtSlider').slick({
		prevArrow: null,
		nextArrow: null,
		draggable: false,
		dots: false,
		speed: 400
	});
	//Init Heights
	
	$('.slider-arrow').click(function(event) {
		event.preventDefault();
		if ($(this).hasClass('next')) {
			govtSlider.slickNext();
		} else {
			govtSlider.slickPrev();
		};
		var currentSlideHeight = $('#govtSlider .slick-active').outerHeight();
		$('#govtSlider .slick-list').animate({
			height: currentSlideHeight + 'px'
		}, 400);
	});
	$('.govtSlides .visualNav .slider-button').click(function(event) {
		event.preventDefault();
		buttonClass = $(this).attr('class');
		slideNumber = buttonClass.replace( /^\D+/g, '');
		govtSlider.slickGoTo(parseInt(slideNumber));
		var currentSlideHeight = $('#govtSlider .slick-active').outerHeight();
		$('#govtSlider .slick-list').animate({
			height: currentSlideHeight + 'px'
		}, 400);
	});
	var currentSlideHeight = $('#govtSlider .slick-active').outerHeight();
	$('#govtSlider .slick-list').css('height', currentSlideHeight+'px');
	var voteSlider = $('#votingSlider').slick({
		prevArrow: null,
		nextArrow: null,
		draggable: false,
		speed: 400
	});
	$('.votingSlides .visualNav .slider-button').click(function(event) {
		event.preventDefault();
		buttonClass = $(this).attr('class');
		slideNumber = buttonClass.replace( /^\D+/g, '');
		voteSlider.slickGoTo(parseInt(slideNumber));
	});
});

$(window).resize(function(event){
	var currentSlideHeight = $('#govtSlider .slick-active').outerHeight();
	$('#govtSlider .slick-list').css('height', currentSlideHeight+'px');
});