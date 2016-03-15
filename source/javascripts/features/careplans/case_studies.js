$('.clickable_span').click(function(e){
	//$(".popup_content").fadeOut(100);
	 e.stopPropagation();

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
				if($(this).attr("id") == "nursing_span") {
					$("#nursing").css({"left": distanceToLeft, "bottom": popupBoxBottom});
					$("#nursing .arrow").css({"left": "10px"});
				}
				if($(this).attr("id") == "life_care_planning_span") {
					$("#life_care").css({"left": distanceToLeft, "bottom": popupBoxBottom});
					$("#life_care .arrow").css({"left": "10px"});
				}
				if($(this).attr("id") == "EAB_span") {
					$("#EAB").css({"left": distanceToLeft, "bottom": popupBoxBottom});
					$("#EAB .arrow").css({"left": "10px"});
				}
				if($(this).attr("id") == "developmental_psychology_span") {
					$("#developmental").css({"left": distanceToLeft, "bottom": popupBoxBottom});
					$("#developmental .arrow").css({"left": "10px"});
				}
				if($(this).attr("id") == "case_management_span") {
					$("#case_management").css({"left": distanceToLeft, "bottom": popupBoxBottom});
					$("#case_management .arrow").css({"left": "10px"});
				}
				if($(this).attr("id") == "litigation_span") {
					$("#litigation").css({"left": distanceToLeft, "bottom": popupBoxBottom});
					$("#litigation .arrow").css({"left": "10px"});
				}
			}
			else {
				if(distanceToLeft >= 500) {
					var popupBoxLeft = distanceToLeft + $(this).width() - 500;
					if($(this).attr("id") == "nursing_span") {
						$("#nursing").css({"left": popupBoxLeft, "bottom": popupBoxBottom});
						$("#nursing .arrow").css({"left": "465px"});
					}
					if($(this).attr("id") == "life_care_planning_span") {
						$("#life_care").css({"left": popupBoxLeft, "bottom": popupBoxBottom});
						$("#life_care .arrow").css({"left": "465px"});
					}
					if($(this).attr("id") == "EAB_span") {
						$("#EAB").css({"left": popupBoxLeft, "bottom": popupBoxBottom});
						$("#EAB .arrow").css({"left": "465px"});
					}
					if($(this).attr("id") == "developmental_psychology_span") {
						$("#developmental").css({"left": popupBoxLeft, "bottom": popupBoxBottom});
						$("#developmental .arrow").css({"left": "465px"});
					}
					if($(this).attr("id") == "case_management_span") {
						$("#case_management").css({"left": popupBoxLeft, "bottom": popupBoxBottom});
						$("#case_management .arrow").css({"left": "465px"});
					}
					if($(this).attr("id") == "litigation_span") {
						$("#litigation").css({"left": popupBoxLeft, "bottom": popupBoxBottom});
						$("#litigation .arrow").css({"left": "465px"});
					}
				}
				else {
					var popupBoxLeft = historySectionWidth/2 - 250;
					var arrowLeft = distanceToLeft - popupBoxLeft + $(this).width()/2;
					if($(this).attr("id") == "nursing_span") {
						$("#nursing").css({"left": popupBoxLeft, "bottom": popupBoxBottom});
						$("#nursing .arrow").css({"left": arrowLeft});
					}
					if($(this).attr("id") == "life_care_planning_span") {
						$("#life_care").css({"left": popupBoxLeft, "bottom": popupBoxBottom});
						$("#life_care .arrow").css({"left": arrowLeft});
					}
					if($(this).attr("id") == "EAB_span") {
						$("#EAB").css({"left": popupBoxLeft, "bottom": popupBoxBottom});
						$("#EAB .arrow").css({"left": arrowLeft});
					}
					if($(this).attr("id") == "developmental_psychology_span") {
						$("#developmental").css({"left": popupBoxLeft, "bottom": popupBoxBottom});
						$("#developmental .arrow").css({"left": arrowLeft});
					}
					if($(this).attr("id") == "case_management_span") {
						$("#case_management").css({"left": popupBoxLeft, "bottom": popupBoxBottom});
						$("#case_management .arrow").css({"left": arrowLeft});
					}
					if($(this).attr("id") == "litigation_span") {
						$("#litigation").css({"left": popupBoxLeft, "bottom": popupBoxBottom});
						$("#litigation .arrow").css({"left": arrowLeft});
					}
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

			if($(this).attr("id") == "nursing_span") {
				$("#nursing").css({"left": 0, "bottom": popupBoxBottom});
				$("#nursing .arrow").css({"left": distanceToLeft});
			}
			if($(this).attr("id") == "life_care_planning_span") {
				$("#life_care").css({"left": 0, "bottom": popupBoxBottom});
				$("#life_care .arrow").css({"left": distanceToLeft});
			}
			if($(this).attr("id") == "EAB_span") {
				$("#EAB").css({"left": 0, "bottom": popupBoxBottom});
				$("#EAB .arrow").css({"left": distanceToLeft});
			}
			if($(this).attr("id") == "developmental_psychology_span") {
				$("#developmental").css({"left": 0, "bottom": popupBoxBottom});
				$("#developmental .arrow").css({"left": distanceToLeft});
			}
			if($(this).attr("id") == "case_management_span") {
				$("#case_management").css({"left": 0, "bottom": popupBoxBottom});
				$("#case_management .arrow").css({"left": distanceToLeft});
			}
			if($(this).attr("id") == "litigation_span") {
				$("#litigation").css({"left": 0, "bottom": popupBoxBottom});
				$("#litigation .arrow").css({"left": distanceToLeft});
			}

		}


		if($(this).attr("id") == "nursing_span") {
			$("#nursing").fadeIn(200);
		}
		if($(this).attr("id") == "life_care_planning_span") {
			$("#life_care").fadeIn(200);
		}
		if($(this).attr("id") == "EAB_span") {
			$("#EAB").fadeIn(200);
		}
		if($(this).attr("id") == "developmental_psychology_span") {
			$("#developmental").fadeIn(200);
		}
		if($(this).attr("id") == "case_management_span") {
			$("#case_management").fadeIn(200);
		}
		if($(this).attr("id") == "litigation_span") {
			$("#litigation").fadeIn(200);
		}
		$(this).addClass('selected_span');
	}
});


$(window).resize(function(event) {
	/* Act on the event */
	// for popup box
	if($(".popup-box").is(':visible')) {
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
				if($(".selected_span").attr("id") == "nursing_span") {
					$("#nursing").css({"left": distanceToLeft, "bottom": popupBoxBottom});
					$("#nursing .arrow").css({"left": "10px"});
				}
				if($(".selected_span").attr("id") == "life_care_planning_span") {
					$("#life_care").css({"left": distanceToLeft, "bottom": popupBoxBottom});
					$("#life_care .arrow").css({"left": "10px"});
				}
				if($(".selected_span").attr("id") == "EAB_span") {
					$("#EAB").css({"left": distanceToLeft, "bottom": popupBoxBottom});
					$("#EAB .arrow").css({"left": "10px"});
				}
				if($(".selected_span").attr("id") == "developmental_psychology_span") {
					$("#developmental").css({"left": distanceToLeft, "bottom": popupBoxBottom});
					$("#developmental .arrow").css({"left": "10px"});
				}
				if($(".selected_span").attr("id") == "case_management_span") {
					$("#case_management").css({"left": distanceToLeft, "bottom": popupBoxBottom});
					$("#case_management .arrow").css({"left": "10px"});
				}
				if($(".selected_span").attr("id") == "litigation_span") {
					$("#litigation").css({"left": distanceToLeft, "bottom": popupBoxBottom});
					$("#litigation .arrow").css({"left": "10px"});
				}
			}
			else {
				if(distanceToLeft >= 500) {
					var popupBoxLeft = distanceToLeft + $(".selected_span").width() - 500;
					if($(".selected_span").attr("id") == "nursing_span") {
						$("#nursing").css({"left": popupBoxLeft, "bottom": popupBoxBottom});
						$("#nursing .arrow").css({"left": "465px"});
					}
					if($(".selected_span").attr("id") == "life_care_planning_span") {
						$("#life_care").css({"left": popupBoxLeft, "bottom": popupBoxBottom});
						$("#life_care .arrow").css({"left": "465px"});
					}
					if($(".selected_span").attr("id") == "EAB_span") {
						$("#EAB").css({"left": popupBoxLeft, "bottom": popupBoxBottom});
						$("#EAB .arrow").css({"left": "465px"});
					}
					if($(".selected_span").attr("id") == "developmental_psychology_span") {
						$("#developmental").css({"left": popupBoxLeft, "bottom": popupBoxBottom});
						$("#developmental .arrow").css({"left": "465px"});
					}
					if($(".selected_span").attr("id") == "case_management_span") {
						$("#case_management").css({"left": popupBoxLeft, "bottom": popupBoxBottom});
						$("#case_management .arrow").css({"left": "465px"});
					}
					if($(".selected_span").attr("id") == "litigation_span") {
						$("#litigation").css({"left": popupBoxLeft, "bottom": popupBoxBottom});
						$("#litigation .arrow").css({"left": "465px"});
					}
				}
				else {
					var popupBoxLeft = historySectionWidth/2 - 250;
					var arrowLeft = distanceToLeft - popupBoxLeft + $(".selected_span").width()/2;
					if($(".selected_span").attr("id") == "nursing_span") {
						$("#nursing").css({"left": popupBoxLeft, "bottom": popupBoxBottom});
						$("#nursing .arrow").css({"left": arrowLeft});
					}
					if($(".selected_span").attr("id") == "life_care_planning_span") {
						$("#life_care").css({"left": popupBoxLeft, "bottom": popupBoxBottom});
						$("#life_care .arrow").css({"left": arrowLeft});
					}
					if($(".selected_span").attr("id") == "EAB_span") {
						$("#EAB").css({"left": popupBoxLeft, "bottom": popupBoxBottom});
						$("#EAB .arrow").css({"left": arrowLeft});
					}
					if($(".selected_span").attr("id") == "developmental_psychology_span") {
						$("#developmental").css({"left": popupBoxLeft, "bottom": popupBoxBottom});
						$("#developmental .arrow").css({"left": arrowLeft});
					}
					if($(".selected_span").attr("id") == "case_management_span") {
						$("#case_management").css({"left": popupBoxLeft, "bottom": popupBoxBottom});
						$("#case_management .arrow").css({"left": arrowLeft});
					}
					if($(".selected_span").attr("id") == "litigation_span") {
						$("#litigation").css({"left": popupBoxLeft, "bottom": popupBoxBottom});
						$("#litigation .arrow").css({"left": arrowLeft});
					}
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

			if($(".selected_span").attr("id") == "nursing_span") {
				$("#nursing").css({"left": 0, "bottom": popupBoxBottom});
				$("#nursing .arrow").css({"left": distanceToLeft});
			}
			if($(".selected_span").attr("id") == "life_care_planning_span") {
				$("#life_care").css({"left": 0, "bottom": popupBoxBottom});
				$("#life_care .arrow").css({"left": distanceToLeft});
			}
			if($(".selected_span").attr("id") == "EAB_span") {
				$("#EAB").css({"left": 0, "bottom": popupBoxBottom});
				$("#EAB .arrow").css({"left": distanceToLeft});
			}
			if($(".selected_span").attr("id") == "developmental_psychology_span") {
				$("#developmental").css({"left": 0, "bottom": popupBoxBottom});
				$("#developmental .arrow").css({"left": distanceToLeft});
			}
			if($(".selected_span").attr("id") == "case_management_span") {
				$("#case_management").css({"left": 0, "bottom": popupBoxBottom});
				$("#case_management .arrow").css({"left": distanceToLeft});
			}
			if($(".selected_span").attr("id") == "litigation_span") {
				$("#litigation").css({"left": 0, "bottom": popupBoxBottom});
				$("#litigation .arrow").css({"left": distanceToLeft});
			}
		}

	}
});

$(document).ready(function(){
	$(".popup-box").click(function(event) {
		/* Act on the event */
		$(this).fadeOut(200);
		$(".clickable_span").removeClass("selected_span");
	});
	$("body").click(function(){
	  $(".popup-box").fadeOut();
	  $(".clickable_span").removeClass("selected_span");
	});
});