$(window).on('scroll', function () {
	var header = $('.nav-wrapper.stuck');
	var top = header.position().top;
	var fixed = $('.nav-wrapper.scroll-nav');
	var scrollTop = $(window).scrollTop();
	var width = $(window).width();
	if (width > 768) {
		if (top <= scrollTop && fixed.css('display') != 'block') {
			fixed.css('display', 'block');
		} else if (top > scrollTop && fixed.css('display') != 'none') {
			fixed.css('display', 'none');
		}
	} else {
		fixed.css('display', 'none');
	}
	
	
	//nav section highlighting (toggling class .active)		
	var sections = [$('.item.one'), $('.item.two'), $('.item.three'), $('.item.four'), $('.item.five'), $('.item.six'), $('.item.seven'), $('.item.eight')];
	var navSections = [$('.main-nav a.one'), $('.main-nav a.two'), $('.main-nav a.three'), $('.main-nav a.four'), $('.main-nav a.five'), $('.main-nav a.six'), $('.main-nav a.seven'), $('.main-nav a.eight')];
	
	for(var i = 0; i < sections.length && sections[i].length > 0; i++) {
		var myPosition = sections[i].position().top-200;

		if (scrollTop < $(".item.one").offset().top-201) {
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
            scrollTop: $(".item.one").offset().top-200
        }, 500);
	});
	$('a.two').click ( function () {
		$('html, body').animate({
            scrollTop: $(".item.two").offset().top-200
        }, 500);
	});
	$('a.three').click ( function () {
		$('html, body').animate({
            scrollTop: $(".item.three").offset().top-200
        }, 500);
	});
	$('a.four').click ( function () {
		$('html, body').animate({
            scrollTop: $(".item.four").offset().top-200
        }, 500);
	});
	$('a.five').click ( function () {
		$('html, body').animate({
            scrollTop: $(".item.five").offset().top-200
        }, 500);
	});
	$('a.six').click ( function () {
		$('html, body').animate({
            scrollTop: $(".item.six").offset().top-200
        }, 500);
	});
	$('a.seven').click ( function () {
		$('html, body').animate({
            scrollTop: $(".item.seven").offset().top-200
        }, 500);
	});
	$('a.eight').click ( function () {
		$('html, body').animate({
            scrollTop: $(".item.eight").offset().top-200
        }, 500);
	});
});