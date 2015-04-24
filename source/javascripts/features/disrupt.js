$(document).ready(function(event){
  var windowHeight = $(window).height();
  var documentHeight = $(document).height();
  var siteNav = $('#site-overlay');
  var articleNav = $('#article-nav');
  var siteFooter = $('#main-footer');
  var firstVideo = $('#top');
  var secondVideo = $('#bottom');
  var firstVideoBottom = firstVideo.offset().top + firstVideo.height();
  var secondVideoTop = secondVideo.offset().top;
  var navOffset = siteNav.height();
  var mainBackground = $('.container.content');
  var articleContent = $('.disrupt');
  var socialButtons = $('.social-container');
  var vid1 = document.getElementsByClassName('top-vid')[0].getElementsByTagName('video')[0];
  var vid2 = document.getElementsByClassName('bottom-vid')[0].getElementsByTagName('video')[0];
  var vidsToLoad = 2;
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
    navOffset = siteNav.height();
    if (!articleNav.hasClass('mobile')) {
      navOffset += articleNav.height();
    }
  }

  // If all the videos are loaded, set up the color scrolling
  function videosLoaded() {
    vidsToLoad -= 1;
    if (vidsToLoad <= 0) {
      firstVideoBottom = firstVideo.offset().top + firstVideo.height();
      secondVideoTop = secondVideo.offset().top;
      secondVideoBottom = secondVideoTop + secondVideo.height();
      documentHeight = $(document).height();

      mainBackground.colorScroll({
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
    }
  }


  // ===== Initialization =====
  try {
    Typekit.load({
      active: function() {
        topVidMargin();
        firstVideo.css("margin-top", navOffset);

        // Only applicable for section-4, but need the second video height from this script
        $('#grid-section').css("margin-bottom", (windowHeight - secondVideo.height()));
      }
    });
  } catch(e) {
    console.log(e);
  }

  mainBackground.css("background-color", colors[page].top);
  articleContent.animate({
    "opacity": 1
  }, 1000);
  
  var firstTitle = firstVideo.find('h1'); // H1 only exists on first page of article
  socialButtons.hide();

  if ($(window).width() < 800 || !videoSupport()) {
    $(".video-container").css("display", "none");
    $(".image-container").css("display", "block");
    articleNav.addClass("mobile");
  }

  // Once we have just the dimensions of the videos, we can check this function
  vid1.onloadedmetadata = function() {
    videosLoaded();
  }
  vid2.onloadedmetadata = function() {
    videosLoaded();
  }

  // Lets get the first title animations rolling ASAP
  if ($(window).width() > 800 && videoSupport()) {
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
    firstTitle.delay(2000).animate({
      "letter-spacing" : "0.7em",
      "opacity" : "1"
    }, {
      duration: 12000
    });
    socialButtons.delay(6000).fadeIn(6000);
    mainBackground.css("background-color", "white");
  }


  // ===== Resize event =====
  $(window).resize(function() {
    // Change article nav type
    if ($(window).width() < 800) {
      articleNav.addClass("mobile");
    } else {
      articleNav.removeClass("mobile");
    }
    topVidMargin();
    firstVideo.css("margin-top", navOffset);

    // Recalc for scroll fades
    windowHeight = $(window).height();
    documentHeight = $(document).height();
    firstVideoBottom = firstVideo.offset().top + firstVideo.height();
    secondVideoTop = secondVideo.offset().top;
    secondVideoBottom = secondVideoTop + secondVideo.height();
  });


  // ===== Scroll event =====
  $(window).scroll(function() {
    var scrollTop = $(window).scrollTop();
    var windowBottom = scrollTop + windowHeight;
    var firstVideoCalc = ((firstVideoBottom - scrollTop) / firstVideoBottom);
    var secondVideoCalc = ((windowBottom-secondVideoTop) / (documentHeight - secondVideoTop));

    // Let's play the second video here
    if (windowBottom >= documentHeight / 2) {
      vid2.play();
    }

    //Bottom nav animation
    if (windowBottom > secondVideoBottom) {
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
