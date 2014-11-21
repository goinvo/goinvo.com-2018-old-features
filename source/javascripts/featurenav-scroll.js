// This file is for feature articles with a navigation that is fixed after scrolling past it.
$(window).on('scroll', function () {
	var header = $('.nav-wrapper.stuck');
	var top = header.position().top;
	var fixed = $('.nav-wrapper.scroll-nav');
	var scrollTop = $(window).scrollTop();
	var width = $(window).width();
	if (width > 750) {
		if (top <= scrollTop && fixed.css('display') != 'block') {
			fixed.css('display', 'block');
		} else if (top > scrollTop && fixed.css('display') != 'none') {
			fixed.css('display', 'none');
		}
	} else {
		fixed.css('display', 'none');
	}
	
	
	//nav section highlighting (toggling class .active)		
	var sections = [$('header.one'), $('header.two'), $('header.three'), $('header.four'), $('header.five')];
	var navSections = [$('.main-nav a.one'), $('.main-nav a.two'), $('.main-nav a.three'), $('.main-nav a.four'), $('.main-nav a.five')];
	
	for(var i = 0; i < sections.length; i++) {
		myPosition = sections[i].position().top;
		
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