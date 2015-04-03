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

// Set the color of the slide buttons
// Depending on the slide we're on
function setSlideButtons(rowNum) {
  $('#slideshow-container .nav-button').attr("data-row", rowNum);
  $('#slideshow-container .close').attr("data-row", rowNum);
}

// Square each panel, and determine their position
// based on their sizes
// Then layout the rest of the grid components
function layout(panels, grid, gridArea, slideshowContainer) {
  var top = 0;
  var left = 0;
  var row = 0;
  var interval = 0;
  var numOfCols = 5;

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

  var slickList = $('.slick-list');
  var slickContainer = slickList.parent();
  slickList.height(slickContainer.height());

  // ===== Resize event =====
  $(window).resize(function() {
    layout(panels, grid, gridArea, slideshowContainer);
    var gridHeight = grid.height();
    gridArea.css({height: gridHeight });
    if ($(window).width() >= 800) {
      slideshowContainer.find('.close').show();
    } else {
      grid.hide();
      slideshowContainer.find('.close').hide();
      if (!slideshowOpen) {
        slideShow.slickGoTo(0, true);
        setSlideButtons(1);
      }
      slideshowContainer.css({'opacity': '1', 'pointer-events' : 'auto'});
      slideshowOpen = true;
    }
    slickList.height(slickContainer.height());
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

    setSlideButtons(clickedPanel.attr("data-row"));

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

    clickedPanel.addClass('transition');
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
          panels.removeClass('transition');
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
    grid.show();

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
    var index = slideShow.slickCurrentSlide();
    var slide = $('#slideshow-container .slide[data-slideIndex="' + index + '"]');
    setSlideButtons(slide.attr("data-row"));
  });

  nextButton.click(function() {
    slideShow.slickNext();
    var index = slideShow.slickCurrentSlide();
    var slide = $('#slideshow-container .slide[data-slideIndex="' + index + '"]');
    setSlideButtons(slide.attr("data-row"));
  });

});
