$('.clickable_span').click(function(){
	//$(".popup_content").fadeOut(100);
	if($(this).hasClass('selected_span')) {
		$(this).removeClass('selected_span');
		if($(".popup-box").is(':visible')){
			$(".popup-box").fadeOut(200);
		}
	}
	else {
		if($(".popup-box").is(':visible')){
			$(".popup-box").hide();
		}
		$('.clickable_span').removeClass('selected_span');

		if($(window).width()>769) {
			var distanceToLeft = $(this).position().left;
			var distanceToTop = $(this).offset().top - $("ul.history-items").offset().top;
			var historySectionWidth = $(".history-item").width();
			var popupBoxWidth = 500;
			console.log("left:"+distanceToLeft+", top:"+distanceToTop)
			var popupBoxBottom = $("ul.history-items").height() - distanceToTop + $(".clickable_span").height();
			if($(this).height() > $(".clickable_span").height()) {
				popupBoxBottom = popupBoxBottom - $(".clickable_span").height();
			}
			if((historySectionWidth - distanceToLeft) >= 500) {
				$(".popup-box").css({"left": distanceToLeft, "bottom": popupBoxBottom});
				$(".popup-box .arrow").css({"left": "10px"});
			}
			else {
				if(distanceToLeft >= 500) {
					var popupBoxLeft = distanceToLeft + $(this).width() - 500;
					$(".popup-box").css({"left": popupBoxLeft, "bottom": popupBoxBottom});
					$(".popup-box .arrow").css({"left": "465px"});
				}
				else {
					var popupBoxLeft = historySectionWidth/2 - 250;
					$(".popup-box").css({"left": popupBoxLeft, "bottom": popupBoxBottom});
					var arrowLeft = distanceToLeft - popupBoxLeft + $(this).width()/2;
					$(".popup-box .arrow").css({"left": arrowLeft});
				}
			}
		}
		else {
			var distanceToTop = $(this).offset().top - $("ul.history-items").offset().top;
			var popupBoxBottom = $("ul.history-items").height() - distanceToTop + $(".clickable_span").height();
			var distanceToLeft;
			if($(this).height() > $(".clickable_span").height()) {
				distanceToLeft = 40;
				popupBoxBottom = popupBoxBottom - $(".clickable_span").height();
			}
			else {
				distanceToLeft = $(this).position().left + ($(this).width())/2;
			}
			$(".popup-box .arrow").css({"left": distanceToLeft});
			$(".popup-box").css({"bottom": popupBoxBottom});
		}

		if($(this).attr("id") == "nursing_span") {
			$(".popup-box img").attr("src","../../../images/careplans/nursing_img.jpg");
			$(".popup-box h6").text("Nursing");
			$(".popup-box p").text("Virginia Henderson, “The Nightingale of Modern Nursing”, was a clinically recognized nurse and instructor in the 1900s. She designed the basic nursing curriculum for the National League for Nursing that taught a patient- centered approach focused on nursing problems rather than medical diagnoses.");
		}
		if($(this).attr("id") == "life_care_planning_span") {
			$(".popup-box img").attr("src","../../../images/careplans/life_care_planning_img.jpg");
			$(".popup-box h6").text("Life Care Planning");
			$(".popup-box p").text("Life care plans started to develop in the 1970s after the convergence of research within several fields. Catastrophic disability research in the mid 70s paved the way for the modern life care plan.");
		}
		if($(this).attr("id") == "EAB_span") {
			$(".popup-box img").attr("src","../../../images/careplans/EAB_img.jpg");
			$(".popup-box h6").text("Experimental Analysis of Behavior");
			$(".popup-box p").text("This subspecialty of psychology provided research in charting behavioral changes over long periods of time. These behaviors could then be deconstructed into discrete actions that could be analyzed by the researcher. The technique of charting provided the case management professional with a tool in identifying individual components of care for a specific patient.");
		}
		if($(this).attr("id") == "developmental_psychology_span") {
			$(".popup-box img").attr("src","../../../images/careplans/developmental_psychology_img.jpg");
			$(".popup-box h6").text("Developmental Psychology");
			$(".popup-box p").text("Developmental psychology provided a practical role in the development of life care planning. Through conducting research on children with cerebral palsy, it was discovered that the overwhelming complexity of the needs of the patient required that a structured reference tool be provided as a roadmap of care. This provided the beginning of the framework for life care planning.");
		}
		if($(this).attr("id") == "case_management_span") {
			$(".popup-box img").attr("src","../../../images/careplans/case_management_img.jpg");
			$(".popup-box h6").text("Case Management");
			$(".popup-box p").text("Case management is the collaborative process of assessing, planning, implementing, and evaluating the options and services for a person’s health needs. In the early 1970s, the case management field began seeing the value of a detailed life care plan and became more involved with providing integrated services for those with long-term medical needs.");
		}
		if($(this).attr("id") == "litigation_span") {
			$(".popup-box img").attr("src","../../../images/careplans/litigation_img.jpg");
			$(".popup-box h6").text("Litigation");
			$(".popup-box p").text("Virginia Henderson, “The Nightingale of Modern Nursing”, was a clinically recognized nurse and instructor in the 1900s. She designed the basic nursing curriculum for the National League for Nursing that taught a patient- centered approach focused on nursing problems rather than medical diagnoses.");
		}

		$(".popup-box").fadeIn(200);
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

	// for popup box
	if($(window).width()>769) {
		var distanceToLeft = $(".selected_span").position().left;
		var distanceToTop = $(".selected_span").offset().top - $("ul.history-items").offset().top;
		var historySectionWidth = $(".history-item").width();
		var popupBoxWidth = 500;
		console.log("left:"+distanceToLeft+", top:"+distanceToTop)
		var popupBoxBottom = $("ul.history-items").height() - distanceToTop + $(".clickable_span").height();
		if($(".selected_span").height() > $(".clickable_span").height()) {
			popupBoxBottom = popupBoxBottom - $(".clickable_span").height();
		}
		if((historySectionWidth - distanceToLeft) >= 500) {
			$(".popup-box").css({"left": distanceToLeft, "bottom": popupBoxBottom});
			$(".popup-box .arrow").css({"left": "10px"});
		}
		else {
			if(distanceToLeft >= 500) {
				var popupBoxLeft = distanceToLeft + $(".selected_span").width() - 500;
				$(".popup-box").css({"left": popupBoxLeft, "bottom": popupBoxBottom});
				$(".popup-box .arrow").css({"left": "465px"});
			}
			else {
				var popupBoxLeft = historySectionWidth/2 - 250;
				$(".popup-box").css({"left": popupBoxLeft, "bottom": popupBoxBottom});
				var arrowLeft = distanceToLeft - popupBoxLeft + $(".selected_span").width()/2;
				$(".popup-box .arrow").css({"left": arrowLeft});
			}
		}
	}
	else {
		var distanceToTop = $(".selected_span").offset().top - $("ul.history-items").offset().top;
		var popupBoxBottom = $("ul.history-items").height() - distanceToTop + $(".clickable_span").height();
		var distanceToLeft;
		if($(".selected_span").height() > $(".clickable_span").height()) {
				distanceToLeft = 40;
			popupBoxBottom = popupBoxBottom - $(".clickable_span").height();
		}
		else {
			distanceToLeft = $(".selected_span").position().left + ($(".selected_span").width())/2;
		}
		$(".popup-box .arrow").css({"left": distanceToLeft});
		$(".popup-box").css({"bottom": popupBoxBottom});
	}

});

$(document).ready(function(){
	$(".carousel-inner").height(setCarouselHeight());
	
	$(".popup-box").click(function(event) {
		/* Act on the event */
		$(this).fadeOut(200);
		$(".clickable_span").removeClass("selected_span");
	});
});