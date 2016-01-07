$('.clickable_span').click(function(){
	$(".popup_content").fadeOut(100);
	$(".clickable_span").removeClass('selected_span');
	if($(this).find(".popup_content").is(':visible')){
		$(this).find(".popup_content").fadeOut(100);
	} else {
		$(this).find(".popup_content").fadeIn(100);
		$(this).addClass('selected_span');
	}
});

function setCarouselHeight(){
	var tallest = 0;
	if($(window).width()>769) {
		var $array1 = $(".carousel.desktop").find(".item").find(".instruction");
		for(var i = 1;i<=$array1.length;i++) {
			if(tallest < $array1.height())
				tallest = $array1.height();
		}
		var $array2 = $(".carousel.desktop").find(".item").find(".image");
		if(tallest < $array2.height())
				tallest = $array2.height();
	}
	else {
		var $array = $(".carousel.mobile").find(".item");
		for(var i = 1;i<=$array.length;i++) {
			if(tallest < $array.height())
				tallest = $array.height();
		}
	}
	return tallest+100;
}

$(window).resize(function(event) {
	/* Act on the event */
	$(".carousel-inner").height(setCarouselHeight());
});

$(document).ready(function(){
	$(".carousel-inner").height(setCarouselHeight());
});