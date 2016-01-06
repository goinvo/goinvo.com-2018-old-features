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
	for(var i = 1;i<=$(".item").length;i++) {
		if(tallest < $(".item:nth-child("+i+")").height())
			tallest = $(".item:nth-child("+i+")").height();
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