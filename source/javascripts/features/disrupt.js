$(document).ready(function(event){
  var windowHeight = $(window).height();
  var documentHeight = $(document).height();
  var siteNav = $('#site-overlay');
  var articleNav = $('#article-nav');
  var siteFooter = $('#main-footer');

  // Vars for scroll fades
  var firstVideo = $('#top');
  var secondVideo = $('#bottom');
  var firstVideoBottom = firstVideo.offset().top + firstVideo.height();
  var secondVideoTop = secondVideo.offset().top;

  var navOffset = siteNav.height();

  function videoSupport() {
    var v = document.createElement('video');

    if (v.canPlayType('video/mp4')) {
      return true;
    } else if (v.canPlayType('video/webm')) {
      return true;
    } else {
      return false;
    }
  }

  function sidebarImages() {
    if ($(window).width() < 800) {
      sideImages.removeClass("right");
      sideImages.addClass("center");
    } else {
      sideImages.removeClass("center");
      sideImages.addClass("right");
    }
  }

  function topVidMargin() {
    if (articleNav.is(':visible')) {
      navOffset += articleNav.height();
    }
  }

  Typekit.load({
    active: function() {
      topVidMargin();
      firstVideo.css("margin-top", navOffset);
    }
  });

  // Make right side images center if small screen
  var sideImages = $('.images.sidebar');
  sidebarImages();

  if ($(window).width() < 600 || !videoSupport()) {
    $("body").find(".video-container").css("display", "none");
    $("body").find(".image-container").css("display", "block");
  }

  // Color scroll fading
  var colors = [
    {top: '#0282C1', bottom: '#E68B35'},
    {top: '#E68B35', bottom: '#DD2E64'},
    {top: '#DD2E64', bottom: '#82659B'},
    {top: '#82659B', bottom: '#0282C1'},
    {top: '#0282C1', bottom: '#0396AA'},
    {top: '#0396AA', bottom: '#82659B'}
  ];

  $('.container.content').css("background-color", colors[page].top);
  firstVideo.css("background-color", colors[page].top);
  
  var firstTitle = firstVideo.find('h1'); // H1 only exists on first page of article
  $('.social-container').hide();
  
  // ===== Initialization =====

  var vid1 = document.getElementsByClassName('top-vid')[0].getElementsByTagName('video')[0];
  var vid2 = document.getElementsByClassName('bottom-vid')[0].getElementsByTagName('video')[0];

  firstVideo.css("opacity", 0);

  if ($(window).width() > 600 && videoSupport()) {
    (function videosLoaded() {
      if (vid1.readyState === 4) {
        navOffset = siteNav.height();
        topVidMargin();
        firstVideo.css("margin-top", navOffset);
        firstVideo.css("opacity", 1);
        $('.social-container').delay(6000).fadeIn(6000);
        firstTitle.css({
          "letter-spacing" : "0.6em",
          "opacity" : "0"
        });
        firstTitle.delay(2000).animate({
          "letter-spacing" : "0.7em",
          "opacity" : "1"
        }, {
          duration: 12000
        });
      }

      if (vid1.readyState === 4 && vid2.readyState === 4) {
        firstVideoBottom = firstVideo.offset().top + firstVideo.height();
        secondVideoTop = secondVideo.offset().top;
        secondVideoBottom = secondVideoTop + secondVideo.height();
        documentHeight = $(document).height();

        $('.container.content').colorScroll({
          colors: [
            {
              color: colors[page].top,
              position: '0'
            },
            {
              color: '#ffffff',
              position: firstVideoBottom
            },
            {
              color: '#ffffff',
              position: secondVideoTop - windowHeight
            },
            {
              color: colors[page].bottom,
              position: secondVideoBottom - windowHeight
            }
          ]
        });
        $('#grid-section').css("margin-bottom", (secondVideo.height() * 0.66));
      } else {
        setTimeout(videosLoaded, 100);
      }
    }());
  } else {
    firstVideo.css("margin-top", navOffset);
    firstVideo.css("opacity", 1);
    $('.social-container').delay(6000).fadeIn(6000);
    firstTitle.css({
      "letter-spacing" : "0.6em",
      "opacity" : "0"
    });
    firstTitle.delay(2000).animate({
      "letter-spacing" : "0.7em",
      "opacity" : "1"
    }, {
      duration: 12000
    });
    $('#grid-section').css("margin-bottom", (secondVideo.height() * 0.66));
    $('.container.content').css("background-color", "white");
  }

  // ===== Resize event =====
  $(window).resize(function() {
    navOffset = siteNav.height();
    topVidMargin();
    firstVideo.css("margin-top", navOffset);
    sidebarImages();

    // Recalc for scroll fades
    windowHeight = $(window).height();
    documentHeight = $(document).height();
    firstVideoBottom = firstVideo.offset().top + firstVideo.height();
    secondVideoTop = secondVideo.offset().top;
  });

  // ===== Scroll event =====
  $(window).scroll(function() {
    var scrollTop = $(window).scrollTop();
    var windowBottom = scrollTop + windowHeight;
    documentHeight = $(document).height();
    firstVideoBottom = firstVideo.offset().top + firstVideo.height();
    secondVideoTop = secondVideo.offset().top;
    var firstVideoCalc = ((firstVideoBottom - scrollTop) / firstVideoBottom);
    var secondVideoCalc = ((windowBottom-secondVideoTop) / (documentHeight - secondVideoTop));

    //Bottom nav animation
    if (windowBottom > documentHeight - 50) {
      $('#bottom-nav').delay(200).animate({
        opacity: "1",
        bottom: siteFooter.outerHeight()
      }, {
        duration: 500,
        complete: function() {
          $(this).css('pointer-events', 'auto');
        }
      });
    }

    // Fade videos
    if ( firstVideoCalc >= 0 ) {
      firstVideo.css({'opacity': firstVideoCalc });
    }

    if ( secondVideoCalc >= 0 ) {
      var extra = 0;
      if (page === 5) {
        extra = 0.3;
      }
      secondVideo.css({'opacity': secondVideoCalc + extra });
    }
  });

  // Set the title color of the "next part" nav
  $('#bottom-nav .title').css("color", colors[page].bottom);
});
