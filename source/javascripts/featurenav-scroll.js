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
});