// This file is for feature articles with a navigation that is fixed after scrolling past it.
$(window).on('scroll', function () {
	var fixed = $('.nav-wrapper.scroll-nav');
	var scrollTop = $(window).scrollTop();
	var width = $(window).width();
	if (width > 768) {
		fixed.css('display', 'block');
	} else {
		fixed.css('display', 'none');
	}
	
	
	//nav section highlighting (toggling class .active)		
	var sections = [$('.item.one'), $('.item.two'), $('.item.three'), $('.item.four'), $('.item.five'), $('.item.six'), $('.item.seven'), $('.item.eight')];
	var navSections = [$('.main-nav a.one'), $('.main-nav a.two'), $('.main-nav a.three'), $('.main-nav a.four'), $('.main-nav a.five'), $('.main-nav a.six'), $('.main-nav a.seven'), $('.main-nav a.eight')];
	
	for(var i = 0; i < sections.length && sections[i].length > 0; i++) {
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