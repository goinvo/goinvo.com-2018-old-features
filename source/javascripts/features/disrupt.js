function getCoords(element) {
  return element.position();
}

function layoutGrid(panels, grid) {
  // Square each panel, and determine their position
  // based on their sizes
  var top = 0;
  var left = 0;
  var row = 0;
  var interval = 0;
  var numOfCols = 6;

  var totalWidth = grid.width();

  panels.each(function(i) {
    var panel = $(this);
    var width = totalWidth / numOfCols;
    var height = width; // Panel should always be square
    top = height * row;
    left = width * interval;
    panel.css({height: height, width: width, top: top, left: left, 'z-index': 0, 'font-size': 1 + 'em'});

    interval += 1;
    if (interval !== 0 && interval % numOfCols === 0) {
      interval = 0;
      row += 1;
    }
    // Set the height of their parent container
    $('#grid-container').height(row * height);
  });
}

function layoutSlides(slideshowContainer) {
  var slides = slideshowContainer.find('.slide');
  var imageWidth = slides.find('.column.right').width();

  slides.each(function() {
    $(this).find('.container').find('.image').css({width: imageWidth, height: imageWidth});
  })
}

function animateEntrance(elements) {
  elements.each(function(i) {
    var div = $(this);

    setTimeout(function() {
      div.fadeIn();
    }, i*100);
  });
}

$(document).ready(function(event){
  var gridArea = $('#grid-area');
  var slideshowPositionedContainer = $('#slideshow-positioned-container');
  var slideshowWindow = $('#slideshow-window');
  var slideshowContainer = $('#slideshow-container');
  var slideShow = $('#slides-container');
  var grid = $('#grid-container');
  var panels = $('#grid-container .grid-panel');
  var closeSlideShow = $('#slideshow-container .close');
  var prevButton = $('#slideshow-container .prev');
  var nextButton = $('#slideshow-container .next');
  var transitioning = false;
  var slideshowOpen = false;

  layoutGrid(panels, grid);

  if ($(window).width() >= 800) {
    panels.hide();
    layoutGrid(panels, grid);
    animateEntrance(panels);
  } else {
    grid.hide();
    slideshowContainer.find('.close').hide();
    slideshowWindow.css({'opacity': '1', 'pointer-events' : 'auto'});
    slideshowOpen = true;
  }

  var gridWidth = grid.outerWidth();
  var gridHeight = grid.outerHeight();

  slideshowWindow.css({width: gridWidth, height: gridHeight });
  slideshowContainer.css({width: gridWidth, height: gridHeight });
  gridArea.css({height: gridHeight });

  layoutSlides(slideshowContainer);

  slideShow.slick({
    arrows: false
  });

  // Resize event
  $(window).resize(function() {
    layoutGrid(panels, grid);
    gridWidth = grid.outerWidth();
    gridHeight = grid.outerHeight();
    slideshowWindow.css({width: gridWidth, height: gridHeight });
    slideshowContainer.css({width: gridWidth, height: gridHeight });
    gridArea.css({height: gridHeight });
    layoutSlides(slideshowContainer);
    if ($(window).width() >= 800) {
      if(!slideshowOpen) {
        grid.show();
      } else {
        grid.show();
        grid.css({'opacity': '0', 'pointer-events' : 'none'});
      }
      slideshowContainer.find('.close').show();
    } else {
      grid.hide();
      slideshowContainer.find('.close').hide();
      if (!slideshowOpen) {
        slideShow.slickGoTo(0, true);
      }
      slideshowWindow.css({'opacity': '1', 'pointer-events' : 'auto'});
      slideshowOpen = true;
    }
  });

  // Grid panels hover states
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

  // Open slideshow transition
  panels.click(function() {
    transitioning = true;
    var clickedPanel = $(this);
    var index = clickedPanel.attr('data-slideindex');
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
      top: slideShowOriginals.position.top,
      'font-size': '4em'
    }, {
      duration: 500,
      queue: false,
      complete: function() {
        layoutSlides(slideshowContainer);
        slideshowWindow.css({'opacity': '1', 'pointer-events' : 'auto'});
        grid.css({'opacity': '0', 'pointer-events' : 'none'});
        transitioning = false;
        setTimeout(function() {
          $(this).css({
            width: panelOriginals.width,
            height: panelOriginals.height,
            left: panelOriginals.position.left,
            top: panelOriginals.position.top
          });
          layoutGrid(panels, grid);
          panels.removeClass('hover');
          panels.removeClass('no-transition');
        }, 500);
      }
    });
    slideshowOpen = true;
    slideShow.slickGoTo(index, true);
  });

  // Close slideshow transition
  closeSlideShow.click(function() {
    var index = slideShow.slickCurrentSlide();
    var panel = $('#grid-container .grid-panel[data-slideindex="' + index + '"]');

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

    panel.css({
      width: slideShowOriginals.width,
      height: slideShowOriginals.height,
      left: slideShowOriginals.position.left,
      top: slideShowOriginals.position.top,
      'z-index': 999,
      'font-size': '4em'
    });

    panel.animate({
      width: panelOriginals.width,
      height: panelOriginals.height,
      left: panelOriginals.position.left,
      top: panelOriginals.position.top,
      'font-size': '1em'
    }, {
      duration: 500,
      queue: false,
      complete: function() {
        layoutGrid(panels, grid);
      }
    });

    grid.css({'opacity': '1', 'pointer-events' : 'auto'});
    slideshowWindow.css({'opacity': '0', 'pointer-events' : 'none'});
    slideshowOpen = false;
  });

  // Prev / Next slide buttons
  prevButton.click(function() {
    slideShow.slickPrev();
  });

  nextButton.click(function() {
    slideShow.slickNext();
  });
});
