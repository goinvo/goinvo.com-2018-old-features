$(document).ready(function(event){
  var windowHeight = $(window).height();
  var documentHeight = $(document).height();
  var siteNav = $('#site-overlay');
  var articleNav = $('#article-nav');
  var navOffset = siteNav.height() + articleNav.height();
  var mobileMenu = articleNav.find('.mobile-menu');
  var bottomNav = $('#bottom-nav');
  var siteFooter = $('#main-footer');
  var topFade = $('#top');
  var bottomFade = $('#bottom');
  var firstVideo = $('.top-vid');
  var secondVideo = $('.bottom-vid');
  var videosAreGo = false;
  var firstTitle = topFade.find('h1'); // H1 only exists on first page of article
  var scrollTop = $(window).scrollTop();
  var windowBottom = scrollTop + windowHeight;
  var topFadeBottom = topFade.offset().top + topFade.height();
  var bottomFadeTop = bottomFade.offset().top;
  var bottomFadeBottom = bottomFadeTop + bottomFade.height();
  var mainBackground = $('.container.content');
  var articleContent = $('.disrupt');
  var socialButtons = $('.social-container');
  var topFadeCalc = ((topFadeBottom - scrollTop) / topFadeBottom);
  var bottomFadeCalc = ((windowBottom-bottomFadeTop) / (documentHeight - bottomFadeTop));
  var colors = [
    {top: '#0282C1', bottom: '#E68B35'},
    {top: '#E68B35', bottom: '#DD2E64'},
    {top: '#DD2E64', bottom: '#82659B'},
    {top: '#82659B', bottom: '#0282C1'},
    {top: '#0282C1', bottom: '#0396AA'},
    {top: '#0396AA', bottom: '#82659B'}
  ];

  // Check if we can play videos
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

  // Add margin to top video equal to total nav heights
  function topVidMargin() {
    navOffset = siteNav.height() + articleNav.height();
  }

  // If all the videos are loaded, set up the color scrolling
  function videosLoaded() {
    vidsToLoad -= 1;
    if (vidsToLoad <= 0) {
      topFadeBottom = topFade.offset().top + topFade.height();
      bottomFadeTop = bottomFade.offset().top;
      bottomFadeBottom = bottomFadeTop + bottomFade.height();
      documentHeight = $(document).height();
      topVidMargin();
      topFade.css("margin-top", navOffset);
      mainBackground.colorScroll({
        colors: [
          {
            color: colors[page].top,
            position: '0'
          },
          {
            color: '#ffffff',
            position: topFadeBottom
          },
          {
            color: '#ffffff',
            position: bottomFadeTop - windowHeight
          },
          {
            color: colors[page].bottom,
            position: bottomFadeBottom - windowHeight
          }
        ]
      });
    }
  }


  // ===== Initialization =====
  mainBackground.css("background-color", colors[page].top);
  articleContent.animate({
    "opacity": 1
  }, 1000);
  socialButtons.hide();
  bottomNav.find('.title').css("color", colors[page].bottom);

  if ($(window).width() > 800) {
    if (videoSupport()) {
      videosAreGo = true;
      var section = page + 1;
      firstVideo.find('.placeholder').remove();
      firstVideo.find('.video-container').prepend('<video autoplay="true" muted="true" loop="true" poster="../../images/features/disrupt/video_posters/section-' + section + '-top.jpg"><source src="../../videos/disrupt/section-' + section + '-top.mp4" type="video/mp4"><source src="../../videos/disrupt/section-' + section + '-top.webm" type="video/webm"></video>');
      secondVideo.find('.placeholder').remove();
      secondVideo.find('.video-container').prepend('<video autoplay="true" muted="true" loop="true" poster="../../images/features/disrupt/video_posters/section-' + section + '-bottom.jpg"><source src="../../videos/disrupt/section-' + section + '-bottom.mp4" type="video/mp4"><source src="../../videos/disrupt/section-' + section + '-bottom.webm" type="video/webm"></video>');
      var vid1 = document.getElementsByClassName('top-vid')[0].getElementsByTagName('video')[0];
      var vid2 = document.getElementsByClassName('bottom-vid')[0].getElementsByTagName('video')[0];
      var vidsToLoad = 2;
      vid1.onloadedmetadata = function() {
        videosLoaded();
      }
      vid2.onloadedmetadata = function() {
        videosLoaded();
      }
      vid1.oncanplay = function() {
        firstTitle.delay(2000).animate({
          "letter-spacing" : "0.7em",
          "opacity" : "1"
        }, {
          duration: 12000
        });
        socialButtons.delay(6000).fadeIn(6000);
      }
    } else {
      topFadeBottom = topFade.offset().top + topFade.height();
      bottomFadeTop = bottomFade.offset().top;
      bottomFadeBottom = bottomFadeTop + bottomFade.height();
      documentHeight = $(document).height();
      firstTitle.delay(2000).animate({
        "letter-spacing" : "0.7em",
        "opacity" : "1"
      }, {
        duration: 12000
      });
      socialButtons.delay(6000).fadeIn(6000);
    }
  } else {
    if (page === 0) {
      firstTitle.delay(2000).animate({
        "letter-spacing" : "0.7em",
        "opacity" : "1"
      }, {
        duration: 12000
      });
      socialButtons.delay(6000).fadeIn(6000);
    }
    topVidMargin();
    topFade.css("margin-top", navOffset);
    topFadeBottom = topFade.offset().top + topFade.height();
    bottomFadeTop = bottomFade.offset().top;
    bottomFadeBottom = bottomFadeTop + bottomFade.height();
    documentHeight = $(document).height();
    mainBackground.colorScroll({
      colors: [
        {
          color: colors[page].top,
          position: '0'
        },
        {
          color: '#ffffff',
          position: topFadeBottom
        },
        {
          color: '#ffffff',
          position: bottomFadeTop - windowHeight
        },
        {
          color: colors[page].bottom,
          position: bottomFadeBottom - windowHeight
        }
      ]
    });
  }


  try {
    Typekit.load({
      active: function() {
        topVidMargin();
        topFade.css("margin-top", navOffset);
        topFadeBottom = topFade.offset().top + topFade.height();
        bottomFadeTop = bottomFade.offset().top;
        bottomFadeBottom = bottomFadeTop + bottomFade.height();
        documentHeight = $(document).height();
        // Only applicable for section-4, but need the second video height from this script
        if (page === 3) {
          $('#grid-section').css("margin-bottom", (windowHeight - bottomFade.height()));
        }
      }
    });
  } catch(e) {
    console.log(e);
  }

  // Mobile navigation setup
  mobileMenu.on("click", function() {
    $(this).parent().find('ol').toggleClass('open');
    articleNav.find('.toggle-arrow').toggleClass('open');
  });
  // Close article nav if site nav is opened
  $('#mobile-hamburger').on("click", function() {
    articleNav.find('ol').removeClass('open');
  });


  // ===== Resize event =====
  $(window).resize(function() {
    topVidMargin();
    topFade.css("margin-top", navOffset);

    // Recalc for scroll fades
    windowHeight = $(window).height();
    documentHeight = $(document).height();
    topFadeBottom = topFade.offset().top + topFade.height();
    bottomFadeTop = bottomFade.offset().top;
    bottomFadeBottom = bottomFadeTop + bottomFade.height();
  });


  // ===== Scroll event =====
  $(window).scroll(function() {
    scrollTop = $(window).scrollTop();
    windowBottom = scrollTop + windowHeight;
    topFadeCalc = ((topFadeBottom - scrollTop) / topFadeBottom);
    bottomFadeCalc = ((windowBottom-bottomFadeTop) / (documentHeight - bottomFadeTop));

    // Let's play the second video here
    if (videosAreGo) {
      if (windowBottom >= documentHeight / 2) {
        vid2.play();
      }
    }

    //Bottom nav animation
    if (windowBottom > ($(document).height() - siteFooter.height())) {
      bottomNav.delay(100).animate({
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
    if ( topFadeCalc >= 0 ) {
      topFade.css({'opacity': topFadeCalc });
    }
    if ( bottomFadeCalc >= 0 ) {
      var extra = 0;
      if (page === 5) {
        extra = 0.4;
      }
      bottomFade.css({'opacity': bottomFadeCalc + extra });
    }
  });
});
