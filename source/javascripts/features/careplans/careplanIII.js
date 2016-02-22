$(document).ready(function() {

	$("button.see-the-future").click(function(event) {
		/* Act on the event */
		$('html, body').animate({
            scrollTop: $("div.part.one").offset().top-101
        }, 500);
	});




	$(window).scroll(function() {
	   if($(window).scrollTop() >= $("div.part.one").offset().top-101 && $(window).scrollTop() < $("div.part.two").offset().top-101) {
	     	// Feature III Nav
	        $(".nav-wrapper.scroll-nav.featureIII.desktop .circle:first-child").removeClass('none');
	        $(".nav-wrapper.scroll-nav.featureIII.desktop .circle:not(:first-child)").addClass('none');
	        $(".nav-wrapper.scroll-nav.featureIII.desktop a:first-child img").addClass('none');
	       	$(".nav-wrapper.scroll-nav.featureIII.desktop a:not(:first-child) img").removeClass('none');
	        $(".nav-wrapper.scroll-nav.featureIII.desktop a:first-child .circle_solid").removeClass('none');
	       	$(".nav-wrapper.scroll-nav.featureIII.desktop a:not(:first-child) .circle_solid").addClass('none');
	   }
	   else if($(window).scrollTop() >= $("div.part.two").offset().top-101 && $(window).scrollTop() < $("div.part.three").offset().top-101) {
	     	// Feature III Nav
	        $(".nav-wrapper.scroll-nav.featureIII.desktop .circle:nth-child(2)").removeClass('none');
	        $(".nav-wrapper.scroll-nav.featureIII.desktop .circle:nth-child(n+3)").addClass('none');
	        $(".nav-wrapper.scroll-nav.featureIII.desktop a:nth-child(2) img").addClass('none');
	       	$(".nav-wrapper.scroll-nav.featureIII.desktop a:nth-child(n+3) img").removeClass('none');
	        $(".nav-wrapper.scroll-nav.featureIII.desktop a:nth-child(2) .circle_solid").removeClass('none');
	       	$(".nav-wrapper.scroll-nav.featureIII.desktop a:nth-child(n+3) .circle_solid").addClass('none');
	   }
	   else if($(window).scrollTop() >= $("div.part.three").offset().top-101 && $(window).scrollTop() < $("div.part.four").offset().top-101) {
	     	// Feature III Nav
	        $(".nav-wrapper.scroll-nav.featureIII.desktop .circle:nth-child(-n+3)").removeClass('none');
	        $(".nav-wrapper.scroll-nav.featureIII.desktop .circle:nth-child(n+4)").addClass('none');
	        $(".nav-wrapper.scroll-nav.featureIII.desktop a:nth-child(-n+3) img").addClass('none');
	       	$(".nav-wrapper.scroll-nav.featureIII.desktop a:nth-child(n+4) img").removeClass('none');
	        $(".nav-wrapper.scroll-nav.featureIII.desktop a:nth-child(-n+3) .circle_solid").removeClass('none');
	       	$(".nav-wrapper.scroll-nav.featureIII.desktop a:nth-child(n+4) .circle_solid").addClass('none');
	   }
	    else if($(window).scrollTop() >= $("div.part.three").offset().top-101 && $(window).scrollTop() < $("div.part.four").offset().top-101) {
	     	// Feature III Nav
	        $(".nav-wrapper.scroll-nav.featureIII.desktop .circle:nth-child(-n+3)").removeClass('none');
	        $(".nav-wrapper.scroll-nav.featureIII.desktop .circle:nth-child(n+4)").addClass('none');
	        $(".nav-wrapper.scroll-nav.featureIII.desktop a:nth-child(-n+3) img").addClass('none');
	       	$(".nav-wrapper.scroll-nav.featureIII.desktop a:nth-child(n+4) img").removeClass('none');
	        $(".nav-wrapper.scroll-nav.featureIII.desktop a:nth-child(-n+3) .circle_solid").removeClass('none');
	       	$(".nav-wrapper.scroll-nav.featureIII.desktop a:nth-child(n+4) .circle_solid").addClass('none');
	   }
	   else if($(window).scrollTop() >= $("div.part.four").offset().top-101 && $(window).scrollTop() < $("div.part.five").offset().top-101) {
	     	// Feature III Nav
	        $(".nav-wrapper.scroll-nav.featureIII.desktop .circle:nth-child(-n+4)").removeClass('none');
	        $(".nav-wrapper.scroll-nav.featureIII.desktop .circle:nth-child(n+5)").addClass('none');
	        $(".nav-wrapper.scroll-nav.featureIII.desktop a:nth-child(-n+4) img").addClass('none');
	       	$(".nav-wrapper.scroll-nav.featureIII.desktop a:nth-child(n+5) img").removeClass('none');
	        $(".nav-wrapper.scroll-nav.featureIII.desktop a:nth-child(-n+4) .circle_solid").removeClass('none');
	       	$(".nav-wrapper.scroll-nav.featureIII.desktop a:nth-child(n+5) .circle_solid").addClass('none');
	   }
	   else if($(window).scrollTop() >= $("div.part.five").offset().top-101 && $(window).scrollTop() < $("div.part.six").offset().top-101) {
	     	// Feature III Nav
	        $(".nav-wrapper.scroll-nav.featureIII.desktop .circle:nth-child(-n+5)").removeClass('none');
	        $(".nav-wrapper.scroll-nav.featureIII.desktop .circle:nth-child(n+6)").addClass('none');
	        $(".nav-wrapper.scroll-nav.featureIII.desktop a:nth-child(-n+5) img").addClass('none');
	       	$(".nav-wrapper.scroll-nav.featureIII.desktop a:nth-child(n+6) img").removeClass('none');
	        $(".nav-wrapper.scroll-nav.featureIII.desktop a:nth-child(-n+5) .circle_solid").removeClass('none');
	       	$(".nav-wrapper.scroll-nav.featureIII.desktop a:nth-child(n+6) .circle_solid").addClass('none');
	   }
	   else if($(window).scrollTop() >= $("div.part.six").offset().top-101 && $(window).scrollTop() < $("div.part.seven").offset().top-101) {
	     	// Feature III Nav
	        $(".nav-wrapper.scroll-nav.featureIII.desktop .circle:nth-child(-n+6)").removeClass('none');
	        $(".nav-wrapper.scroll-nav.featureIII.desktop .circle:nth-child(n+7)").addClass('none');
	        $(".nav-wrapper.scroll-nav.featureIII.desktop a:nth-child(-n+6) img").addClass('none');
	       	$(".nav-wrapper.scroll-nav.featureIII.desktop a:nth-child(n+7) img").removeClass('none');
	        $(".nav-wrapper.scroll-nav.featureIII.desktop a:nth-child(-n+6) .circle_solid").removeClass('none');
	       	$(".nav-wrapper.scroll-nav.featureIII.desktop a:nth-child(n+7) .circle_solid").addClass('none');
	   }
	   else if($(window).scrollTop() >= $("div.part.seven").offset().top-101 && $(window).scrollTop() < $("div.part.eight").offset().top-101) {
	     	// Feature III Nav
	        $(".nav-wrapper.scroll-nav.featureIII.desktop .circle:nth-child(-n+7)").removeClass('none');
	        $(".nav-wrapper.scroll-nav.featureIII.desktop .circle:nth-child(n+8)").addClass('none');
	        $(".nav-wrapper.scroll-nav.featureIII.desktop a:nth-child(-n+7) img").addClass('none');
	       	$(".nav-wrapper.scroll-nav.featureIII.desktop a:nth-child(n+8) img").removeClass('none');
	        $(".nav-wrapper.scroll-nav.featureIII.desktop a:nth-child(-n+7) .circle_solid").removeClass('none');
	       	$(".nav-wrapper.scroll-nav.featureIII.desktop a:nth-child(n+8) .circle_solid").addClass('none');
	   }
	    else if($(window).scrollTop() >= $("div.part.eight").offset().top-101) {
	     	// Feature III Nav
	        $(".nav-wrapper.scroll-nav.featureIII.desktop .circle:nth-child(-n+8)").removeClass('none');
	        $(".nav-wrapper.scroll-nav.featureIII.desktop .circle:nth-child(n+9)").addClass('none');
	        $(".nav-wrapper.scroll-nav.featureIII.desktop a:nth-child(-n+8) img").addClass('none');
	       	$(".nav-wrapper.scroll-nav.featureIII.desktop a:nth-child(n+9) img").removeClass('none');
	        $(".nav-wrapper.scroll-nav.featureIII.desktop a:nth-child(-n+8) .circle_solid").removeClass('none');
	       	$(".nav-wrapper.scroll-nav.featureIII.desktop a:nth-child(n+9) .circle_solid").addClass('none');
	   }
	});

});