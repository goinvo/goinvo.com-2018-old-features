function getCoords(element) {
  return element.position();
}

function animateEntrance(elements) {
  elements.each(function(i) {
    var div = $(this);

    setTimeout(function() {
      div.fadeIn();
    }, i*100);
  });
}

function play() {
  $(this).parent().find("video")[0].play();
}

function pause() {
  $(this).parent().find("video")[0].pause();
}
 
// Square each panel, and determine their position
// based on their sizes
// Then layout the rest of the grid components
function layout(panels, grid, gridArea, slideshowContainer) {
  var top = 0;
  var left = 0;
  var row = 0;
  var interval = 0;
  var numOfCols = 6;

  var totalWidth = gridArea.width();
  var offset = totalWidth % numOfCols;
  var margin = offset / 2;
  var panelWidth = (totalWidth - offset) / numOfCols;
  var panelHeight = panelWidth;

  panels.each(function(i) {
    var panel = $(this);
    top = panelHeight * row;
    left = panelWidth * interval;
    panel.css({height: panelHeight, width: panelWidth, top: top, left: left});

    interval += 1;
    if (interval !== 0 && interval % numOfCols === 0) {
      interval = 0;
      row += 1;
    }
  });

  var gridWidth = panelWidth * numOfCols;
  var gridHeight = panelHeight * row;

  grid.css({width: gridWidth, height: gridHeight, 'margin-left': margin})
  slideshowContainer.css({width: gridWidth, height: gridHeight, 'margin-left': margin});

  var slides = slideshowContainer.find('.slide');
  var imageWidth = slides.find('.column.right').width();

  slides.each(function() {
    $(this).find('.container').find('.image').css({width: imageWidth, height: imageWidth});
  })
}

$(document).ready(function(event){
  var gridArea = $('#grid-area');
  var slideshowContainer = $('#slideshow-container');
  var slideShow = $('#slides-container');
  var grid = $('#grid-container');
  var panels = $('#grid-container .grid-panel');
  var closeSlideShow = $('#slideshow-container .close');
  var prevButton = $('#slideshow-container .prev');
  var nextButton = $('#slideshow-container .next');
  var transitioning = false;
  var slideshowOpen = false;
  var bottomNavState = 'closed';

  var windowHeight = $(window).height();
  var documentHeight = $(document).height();

  // Vars for scroll fades
  var firstVideo = $('.header-contents').first();
  var secondVideo = $('.sec-header').first();
  var firstVideoBottom = firstVideo.offset().top + firstVideo.height();
  var secondVideoTop = secondVideo.offset().top;

  // ===== Initialization =====
  $("video").each(function() {
    this.volume = 0.5;
  });

  layout(panels, grid, gridArea, slideshowContainer);
  var gridHeight = grid.height();
  gridArea.css({height: gridHeight});

  slideShow.slick({
    arrows: false
  });

  if ($(window).width() >= 800) {
    panels.hide();
    animateEntrance(panels);
  } else {
    grid.hide();
    slideshowContainer.find('.close').hide();
    slideshowContainer.css({'opacity': '1', 'pointer-events': 'auto'});
    slideshowOpen = true;
  }


  // ===== Resize event =====
  $(window).resize(function() {
    // Recalc for scroll fades
    windowHeight = $(window).height();
    documentHeight = $(document).height();
    firstVideoBottom = firstVideo.offset().top + firstVideo.height();
    secondVideoTop = secondVideo.offset().top;

    layout(panels, grid, gridArea, slideshowContainer);
    var gridHeight = grid.height();
    gridArea.css({height: gridHeight });
    if ($(window).width() >= 800) {
      if (slideshowOpen) {
        grid.show();
        panels.hide();
        animateEntrance(panels);
        slideshowContainer.css({'opacity': '0', 'pointer-events' : 'none'});
        slideshowContainer.find('.close').show();
        slideshowOpen = false;
      }
      slideshowContainer.find('.close').show();
    } else {
      grid.hide();
      slideshowContainer.find('.close').hide();
      if (!slideshowOpen) {
        slideShow.slickGoTo(0, true);
      }
      slideshowContainer.css({'opacity': '1', 'pointer-events' : 'auto'});
      slideshowOpen = true;
    }
  });

  // ===== Scroll event =====
  $(window).scroll(function() {
    var scrollTop = $(window).scrollTop();
    var windowBottom = scrollTop + windowHeight;
    var firstVideoCalc = ((firstVideoBottom - scrollTop) / firstVideoBottom);
    var secondVideoCalc = ((windowBottom-secondVideoTop) / (documentHeight - secondVideoTop));

    // Bottom nav animation
    // if (winST + winHeight > docHeight - 50) {
    //   if (bottomNavState === 'closed') {
    //     $('#bottom-nav').animate({
    //       opacity: 1,
    //       bottom: "50px"
    //     }, {
    //       duration: 500,
    //       complete: function() {
    //         bottomNavState = 'open';
    //         $(this).css('pointer-events', 'auto');
    //       }
    //     });
    //   }
    // }

    // if (winST + winHeight < docHeight - 100) {
    //   $('#bottom-nav').animate({
    //     opacity: 0,
    //     bottom: "0px"
    //   }, {
    //     duration: 0,
    //     complete: function() {
    //       bottomNavState = 'closed';
    //       $(this).css('pointer-events', 'none');
    //     }
    //   });
    // }

    // Fade videos
    if ( firstVideoCalc >= 0 ) {
      firstVideo.css({'opacity': firstVideoCalc });
    }

    if ( secondVideoCalc >= 0 ) {
      secondVideo.css({'opacity': secondVideoCalc });
    }
  });

  // Color scroll fading
  var colors = [
    {top: '#1c97aa', bottom: '#e88c35'}
  ];

  $('.container.content').colorScroll({
    colors: [
      {
        color: colors[page].top,
        position: '0'
      },
      {
        color: '#ffffff',
        position: firstVideoBottom + (firstVideoBottom*0.2)
      },
      {
        color: '#ffffff',
        position: secondVideoTop - (windowHeight - (windowHeight*0.05))
      },
      {
        color: colors[page].bottom,
        position: documentHeight - windowHeight
      }
    ]
  });

  // ===== Grid panels hover states =====
  function mouseIn() {
    $(this).addClass('hover');
  }
  function mouseOut() {
    if (transitioning) {
      setTimeout(function() {
        $(this).removeClass('hover');
      }, 750);
    } else {
      $(this).removeClass('hover');
    }
  }
  panels.hover(mouseIn, mouseOut);


  // ===== Open slideshow transition =====
  panels.click(function() {
    transitioning = true;
    var clickedPanel = $(this);
    var index = clickedPanel.attr('data-slideindex');
    var title = clickedPanel.find('.title');

    var panelOriginals = {
      width: clickedPanel.outerWidth(),
      height: clickedPanel.outerHeight(),
      position: getCoords(clickedPanel)
    };
    var slideShowOriginals = {
      width: slideshowContainer.outerWidth(),
      height: slideshowContainer.outerHeight(),
      position: getCoords(slideshowContainer)
    };

    clickedPanel.addClass('no-transition');
    clickedPanel.css({'z-index': 999});

    clickedPanel.animate({
      width: slideShowOriginals.width,
      height: slideShowOriginals.height,
      left: slideShowOriginals.position.left,
      top: slideShowOriginals.position.top
    }, {
      duration: 500,
      queue: false,
      complete: function() {
        slideshowContainer.css({'opacity': '1', 'pointer-events' : 'auto'});
        grid.css({'opacity': '0', 'pointer-events' : 'none'});
        transitioning = false;
        setTimeout(function() {
          clickedPanel.css({
            width: panelOriginals.width,
            height: panelOriginals.height,
            left: panelOriginals.position.left,
            top: panelOriginals.position.top,
            'z-index': 0
          });
          panels.removeClass('hover');
          panels.removeClass('no-transition');
        }, 500);
      }
    });

    title.animate({
      zoom: 4
    }, {
      duration: 500,
      queue: false,
      complete: function() {
        setTimeout(function() {
          title.css({zoom: 1});
        }, 500);
      }
    });

    slideshowOpen = true;
    slideShow.slickGoTo(index, true);
  });


  // ===== Close slideshow transition =====
  closeSlideShow.click(function() {
    var index = slideShow.slickCurrentSlide();
    var panel = $('#grid-container .grid-panel[data-slideindex="' + index + '"]');
    var title = panel.find('.title');

    var panelOriginals = {
      width: panel.outerWidth(),
      height: panel.outerHeight(),
      position: getCoords(panel)
    };
    var slideShowOriginals = {
      width: slideshowContainer.outerWidth(),
      height: slideshowContainer.outerHeight(),
      position: getCoords(slideshowContainer)
    };

    panel.addClass('no-transition');
    panel.css({
      width: slideShowOriginals.width,
      height: slideShowOriginals.height,
      left: slideShowOriginals.position.left,
      top: slideShowOriginals.position.top,
      'z-index': 999
    });

    title.css({zoom: 4});

    panel.animate({
      width: panelOriginals.width,
      height: panelOriginals.height,
      left: panelOriginals.position.left,
      top: panelOriginals.position.top
    }, {
      duration: 500,
      queue: false,
      complete: function() {
        panel.removeClass('no-transition');
        panel.css('z-index', 0);
      }
    });

    title.animate({
      zoom: 1
    }, {
      duration: 500,
      queue: false,
      complete: function() {

      }
    });

    grid.css({'opacity': '1', 'pointer-events' : 'auto'});
    slideshowContainer.css({'opacity': '0', 'pointer-events' : 'none'});
    slideshowOpen = false;
  });


  // ===== Prev / Next slide buttons =====
  prevButton.click(function() {
    slideShow.slickPrev();
  });

  nextButton.click(function() {
    slideShow.slickNext();
  });


  // ===== Video Hover Controls =====
  // $('.sec-header .title-container').hover(unmute, mute);
});
