$(function() {
    // Stick the #nav to the top of the window
    var nav = $('#invo-logo');
    var navHomeY = $("li#first").offset().top;
    var left = $("li#first").offset().left;
    
    console.log("nav: l: " + nav.offset().left + " t: " + nav.offset().top + " first l: " + left + " t: " + navHomeY);
    
    var scrollTop = "";
    var shouldBeFixed = "";
    var isFixed = false;
    var $w = $(window);
    
    $w.scroll(function() {
        scrollTop =$(window).scrollTop();
        shouldBeFixed = scrollTop > navHomeY-580;
        if (shouldBeFixed && !isFixed) {
            nav.css({
                position: 'fixed',
                left:left,
                top:80
            });
            isFixed = true;
        }
        else if (!shouldBeFixed && isFixed)
        {
            nav.css({
                position:'absolute',
                left:'44px',
                top:'2130px',
            });
            isFixed = false;
        }
    });
    
    
    $w.resize(function() {
        navHomeY = $("li#first").offset().top;
        console.log(navHomeY);
        
    });
    
});