$(document).ready(function(event){
  var windowHeight = $(window).height();
  var documentHeight = $(document).height();
  var siteNav = $('#site-overlay');
  var articleNav = $('#article-nav');

  // Vars for scroll fades
  var firstVideo = $('#top');
  var secondVideo = $('#bottom');
  var firstVideoBottom = firstVideo.offset().top + firstVideo.height();
  var secondVideoTop = secondVideo.offset().top;

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

  firstVideo.css("margin-top", articleNav.height() + siteNav.height());
  
  var firstTitle = firstVideo.find('h1'); // H1 only exists on first page of article
  $('.social-container').hide();
  
  // ===== Initialization =====
  $("video").each(function() {
    this.volume = 0.5;
  });

  var vid1 = document.getElementById('top').getElementsByTagName('video')[0];
  var vid2 = document.getElementById('bottom').getElementsByTagName('video')[0];

  firstVideo.css("opacity", 0);

  (function videosLoaded() {
    if (vid1.readyState === 4) {
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
            position: documentHeight - windowHeight
          }
        ]
      });
      $('#grid-section').css("margin-bottom", secondVideo.height());
    } else {
      setTimeout(videosLoaded, 100);
    }
  }());

  // ===== Resize event =====
  $(window).resize(function() {
    firstVideo.css("margin-top", articleNav.height() + siteNav.height());

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
      $('#bottom-nav').animate({
        opacity: 1,
        bottom: "50px"
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
      secondVideo.css({'opacity': secondVideoCalc });
    }
  });

  // Set the title color of the "next part" nav
  $('#bottom-nav .title').css("color", colors[page].bottom);
});
