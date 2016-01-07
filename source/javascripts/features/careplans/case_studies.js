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
		for(var i = 1;i<=$(".carousel.desktop .item").find(".instruction").length;i++) {
			if(tallest < $(".carousel.desktop .item:nth-child("+i+")").find(".instruction").height())
				tallest = $(".carousel.desktop .item:nth-child("+i+")").find(".instruction").height();
		}
		if(tallest < $(".carousel.desktop .item").find(".image").height())
				tallest = $(".carousel.desktop .item").find(".image").height();
	}
	else {
		for(var i = 1;i<=$(".carousel.mobile .item").length;i++) {
			if(tallest < $(".carousel.mobile .item:nth-child("+i+")").height())
				tallest = $(".carousel.mobile .item:nth-child("+i+")").height();
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