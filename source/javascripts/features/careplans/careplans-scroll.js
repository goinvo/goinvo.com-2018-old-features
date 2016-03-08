$(window).on('scroll', function () {
	var header = $('.nav-wrapper.stuck');
	var top = header.position().top;
	var fixed = $('.nav-wrapper.scroll-nav');
	var scrollTop = $(window).scrollTop();
	var width = $(window).width();
	if (top <= scrollTop && fixed.css('display') != 'block') {
		fixed.css('display', 'block');
	} else if (top > scrollTop && fixed.css('display') != 'none') {
		fixed.css('display', 'none');
	}

	
	
	//nav section highlighting (toggling class .active)		
	var sections = [$('.item.one'), $('.item.two'), $('.item.three'), $('.item.four')];
	var navSections = [$('.main-nav a.one'), $('.main-nav a.two'), $('.main-nav a.three'), $('.main-nav a.four')];
	
	for(var i = 0; i < sections.length && sections[i].length > 0; i++) {
		var myPosition = sections[i].position().top-89

		if (scrollTop < $(".item.one").offset().top-89) {
			$('.main-nav .active').toggleClass('active', false);
		}		

		if (i == sections.length-1) {
			if(scrollTop >= myPosition && !navSections[i].hasClass('active')) {
				$('.main-nav .active').toggleClass('active', false);	
				navSections[i].toggleClass('active', true);
			}
		}
		else{
			nextPosition = sections[i+1].position().top;
			if(scrollTop >= myPosition && scrollTop < nextPosition && !navSections[i].hasClass('active')) {
				$('.main-nav .active').toggleClass('active', false);	
				navSections[i].toggleClass('active', true);
			}
		}
	}
});

$(document).ready(function() {
	$('a.one').click ( function () {
		$('html, body').animate({
            scrollTop: $("div.part.one").offset().top-89
        }, 500);
	});
	$('a.two').click ( function () {
		$('html, body').animate({
            scrollTop: $("div.part.two").offset().top-89
        }, 500);
	});
	$('a.three').click ( function () {
		$('html, body').animate({
            scrollTop: $("div.part.three").offset().top-89
        }, 500);
	});
	$('a.four').click ( function () {
		$('html, body').animate({
            scrollTop: $("div.part.four").offset().top-89
        }, 500);
	});
	$('a.five').click ( function () {
		$('html, body').animate({
            scrollTop: $("div.part.five").offset().top-89
        }, 500);
	});
	$('a.six').click ( function () {
		$('html, body').animate({
            scrollTop: $("div.part.six").offset().top-89
        }, 500);
	});
	$('a.seven').click ( function () {
		$('html, body').animate({
            scrollTop: $("div.part.seven").offset().top-89
        }, 500);
	});
	$('a.eight').click ( function () {
		$('html, body').animate({
            scrollTop: $("div.part.eight").offset().top-89
        }, 500);
	});

	// superscript
	$(".superscript").click(function(event) {
		/* Act on the event */
		var index;
		if($(this).text().indexOf('-') != -1) {
			index = $(this).text().split("-");
			index = index[0];
		}
		else if($(this).text().indexOf(',') != -1) {
			var index = $(this).text().split(",");
			index = index[0];
		}
		else {
			index = $(this).text();
		}
		var anchor = "reference"+index;
		$('html, body').animate({
            scrollTop: $("li#"+anchor+"").offset().top-100
        }, 500);
	});


	$(window).scroll(function() {
	   if($(window).scrollTop() >= $("div.part.one").offset().top-101 && $(window).scrollTop() < $("div.part.two").offset().top-101) {
	        $(".nav-wrapper.scroll-nav:not(.featureIII) .selected").removeClass('selected');
	        $(".nav-wrapper.scroll-nav:not(.featureIII) a:first-child").addClass('selected');
	   }
	   else if($(window).scrollTop() >= $("div.part.two").offset().top-101 && $(window).scrollTop() < $("div.part.three").offset().top-101) {
	        $(".nav-wrapper.scroll-nav:not(.featureIII) .selected").removeClass('selected');
	        $(".nav-wrapper.scroll-nav:not(.featureIII) a:nth-child(2)").addClass('selected');
	   }
	   else if($(window).scrollTop() >= $("div.part.three").offset().top-101 && $(window).scrollTop() < $("div.part.four").offset().top-101) {
	     	$(".nav-wrapper.scroll-nav:not(.featureIII) .selected").removeClass('selected');
	        $(".nav-wrapper.scroll-nav:not(.featureIII) a:nth-child(3)").addClass('selected');
	   }
	   else if($(window).scrollTop() >= $("div.part.three").offset().top-101) {
	     	$(".nav-wrapper.scroll-nav:not(.featureIII) .selected").removeClass('selected');
	        $(".nav-wrapper.scroll-nav:not(.featureIII) a:nth-child(4)").addClass('selected');
	   }
	});
});