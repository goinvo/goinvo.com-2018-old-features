$(document).ready(function(){
	if (window.location.hash === '#intro' || window.location.hash === '') {
		$('.the-article-nav a[data-section-index=0]').addClass('active');
		$('#sec0').addClass('visible');
		$('#sec11, #sec10, #sec9, #sec8, #sec7, #sec6, #sec5, #sec4, #sec3, #sec2, #sec1').addClass('hidden');
	} else if (window.location.hash === '#hungary') {
		$(document).scrollTop(0);
		$('.the-article-nav a[data-section-index=10]').addClass('active');
		$('#sec10').addClass('visible');
		$('#sec11, #sec9, #sec8, #sec7, #sec6, #sec5, #sec4, #sec3, #sec2, #sec1, #sec0').addClass('hidden');
	} else if (window.location.hash === '#netherlands') {
		$(document).scrollTop(0);
		$('.the-article-nav a[data-section-index=9]').addClass('active');
		$('#sec9').addClass('visible');
		$('#sec11, #sec10, #sec8, #sec7, #sec6, #sec5, #sec4, #sec3, #sec2, #sec1, #sec0').addClass('hidden');
	} else if (window.location.hash === '#france') {
		$(document).scrollTop(0);
		$('.the-article-nav a[data-section-index=8]').addClass('active');
		$('#sec8').addClass('visible');
		$('#sec11, #sec10, #sec9, #sec7, #sec6, #sec5, #sec4, #sec3, #sec2, #sec1, #sec0').addClass('hidden');
	} else if (window.location.hash === '#england') {
		$(document).scrollTop(0);
		$('.the-article-nav a[data-section-index=7]').addClass('active');
		$('#sec7').addClass('visible');
		$('#sec11, #sec10, #sec9, #sec8, #sec6, #sec5, #sec4, #sec3, #sec2, #sec1, #sec0').addClass('hidden');
	} else if (window.location.hash === '#spain') {
		$(document).scrollTop(0);
		$('.the-article-nav a[data-section-index=6]').addClass('active');
		$('#sec6').addClass('visible');
		$('#sec11, #sec10, #sec9, #sec8, #sec7, #sec5, #sec4, #sec3, #sec2, #sec1, #sec0').addClass('hidden');
	} else if (window.location.hash === '#uruguay') {
		$(document).scrollTop(0);
		$('.the-article-nav a[data-section-index=5]').addClass('active');
		$('#sec5').addClass('visible');
		$('#sec11, #sec10, #sec9, #sec8, #sec7, #sec6, #sec4, #sec3, #sec2, #sec1, #sec0').addClass('hidden');
	} else if (window.location.hash === '#argentina') {
		$(document).scrollTop(0);
		$('.the-article-nav a[data-section-index=4]').addClass('active');
		$('#sec4').addClass('visible');
		$('#sec11, #sec10, #sec9, #sec8, #sec7, #sec6, #sec5, #sec3, #sec2, #sec1, #sec0').addClass('hidden');
	} else if (window.location.hash === '#italy') {
		$(document).scrollTop(0);
		$('.the-article-nav a[data-section-index=3]').addClass('active');
		$('#sec3').addClass('visible');
		$('#sec11, #sec10, #sec9, #sec8, #sec7, #sec6, #sec5, #sec4, #sec2, #sec1, #sec0').addClass('hidden');
	} else if (window.location.hash === '#germany') {
		$(document).scrollTop(0);
		$('.the-article-nav a[data-section-index=2]').addClass('active');
		$('#sec2').addClass('visible');
		$('#sec11, #sec10, #sec9, #sec8, #sec7, #sec6, #sec5, #sec4, #sec3, #sec1, #sec0').addClass('hidden');
	} else if (window.location.hash === '#brazil') {
		$(document).scrollTop(0);
		$('.the-article-nav a[data-section-index=1]').addClass('active');
		$('#sec1').addClass('visible');
		$('#sec11, #sec10, #sec9, #sec8, #sec7, #sec6, #sec5, #sec4, #sec3, #sec2, #sec0').addClass('hidden');
	} else if (window.location.hash === '#visuals') {
		$(document).scrollTop(0);
		$('.the-article-nav a[data-section-index=11]').addClass('active');
		$('#sec11').addClass('visible');
		$('#sec10, #sec9, #sec8, #sec7, #sec6, #sec5, #sec4, #sec3, #sec2, #sec1, #sec0').addClass('hidden');
	} else {
		$('.the-article-nav a[data-section-index=0]').addClass('active');
		$('#sec0').addClass('visible');
		$('#sec11, #sec10, #sec9, #sec8, #sec7, #sec6, #sec5, #sec4, #sec3, #sec2, #sec1, #sec0').addClass('hidden');
	}
});
$(window).load(function(){
	// Init Vars
	var heights = [
		$('#sec0'),
		$('#sec1'),
		$('#sec2'),
		$('#sec3'),
		$('#sec4'),
		$('#sec5'),
		$('#sec6'),
		$('#sec7'),
		$('#sec8'),
		$('#sec9'),
		$('#sec10'),
		$('#sec11')
	];

	var initHeight = $('section.row.visible').height();
	$('.content-container').css('height', initHeight + 'px');

	$('.the-article-nav a').on('click', function(){
      	var callIndex = parseInt($(this).attr('data-section-index'));
		var currentLinks = $('a[data-section-index=' + callIndex + ']');
		stop();
		$(document).scrollTop(0);
		$('.the-article-nav a').removeClass('active');
		currentLinks.addClass('active');
		var setHeight = heights[callIndex].css('height');
		$('section.row.visible').animate({
			opacity: 0
		}, 250, function(){
			$('.content-container').animate({
				height: setHeight
			}, 250, function(){
				$('section.row.visible').toggleClass('visible').toggleClass('hidden').removeAttr('style');
				$('#sec' + callIndex).css('display', 'block').animate({
					opacity: 1
				}, 250, function(){
					$(this).toggleClass('visible').toggleClass('hidden');
				})
			});
		});
	});
});
$(window).resize(function(){
	var newHeight = $('section.row.visible').height();
	$('.content-container').css('height', newHeight + 'px');
});
