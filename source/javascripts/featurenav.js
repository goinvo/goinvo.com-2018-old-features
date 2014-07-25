$(document).ready(function(){
    if (window.location.hash === '#intro') {
        $('#sec0').addClass('visible');
        $('#sec10, #sec9, #sec8, #sec7, #sec6, #sec5, #sec4, #sec3, #sec2, #sec1').addClass('hidden');
    } else if (window.location.hash === '#hungary') {
        $('#sec10').addClass('visible');
        $('#sec9, #sec8, #sec7, #sec6, #sec5, #sec4, #sec3, #sec2, #sec1, #sec0').addClass('hidden');
    } else if (window.location.hash === '#netherlands') {
        $('#sec9').addClass('visible');
        $('#sec10, #sec8, #sec7, #sec6, #sec5, #sec4, #sec3, #sec2, #sec1, #sec0').addClass('hidden');
    } else if (window.location.hash === '#france') {
        $('#sec8').addClass('visible');
        $('#sec10, #sec9, #sec7, #sec6, #sec5, #sec4, #sec3, #sec2, #sec1, #sec0').addClass('hidden');
    } else if (window.location.hash === '#england') {
        $('#sec7').addClass('visible');
        $('#sec10, #sec9, #sec8, #sec6, #sec5, #sec4, #sec3, #sec2, #sec1, #sec0').addClass('hidden');
    } else if (window.location.hash === '#spain') {
        $('#sec6').addClass('visible');
        $('#sec10, #sec9, #sec8, #sec7, #sec5, #sec4, #sec3, #sec2, #sec1, #sec0').addClass('hidden');
    } else if (window.location.hash === '#uruguay') {
        $('#sec5').addClass('visible');
        $('#sec10, #sec9, #sec8, #sec7, #sec6, #sec4, #sec3, #sec2, #sec1, #sec0').addClass('hidden');
    } else if (window.location.hash === '#argentina') {
        $('#sec4').addClass('visible');
        $('#sec10, #sec9, #sec8, #sec7, #sec6, #sec5, #sec3, #sec2, #sec1, #sec0').addClass('hidden');
    } else if (window.location.hash === '#italy') {
        $('#sec3').addClass('visible');
        $('#sec10, #sec9, #sec8, #sec7, #sec6, #sec5, #sec4, #sec2, #sec1, #sec0').addClass('hidden');
    } else if (window.location.hash === '#germany') {
        $('#sec2').addClass('visible');
        $('#sec10, #sec9, #sec8, #sec7, #sec6, #sec5, #sec4, #sec3, #sec1, #sec0').addClass('hidden');
    } else if (window.location.hash === '#brazil') {
        $('#sec1').addClass('visible');
        $('#sec10, #sec9, #sec8, #sec7, #sec6, #sec5, #sec4, #sec3, #sec2, #sec0').addClass('hidden');
    } else {
        $('#sec0').addClass('visible');
        $('#sec10, #sec9, #sec8, #sec7, #sec6, #sec5, #sec4, #sec3, #sec2, #sec1').addClass('hidden');
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
        $('#sec10')
    ];

    var scrollTop = $(window).scrollTop(), elementOffset = $('#title').offset().top, distance = (elementOffset - scrollTop);

    var initHeight = $('section.row.visible').height();
    $('.content-container').css('height', initHeight + 'px');

    $('.the-article-nav a').on('click', function(){
        var callIndex = parseInt($(this).attr('data-section-index'));
        var setHeight = heights[callIndex].css('height');
        $('section.row.visible').animate({
            opacity: 0
        }, 500, function(){
            $('.content-container').animate({
                height: setHeight
            }, 500, function(){
                $('section.row.visible').toggleClass('visible').toggleClass('hidden').removeAttr('style');
                $('#sec' + callIndex).css('display', 'block').animate({
                    opacity: 1
                }, 500, function(){
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
