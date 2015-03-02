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
  var numOfCols = 5;

  var totalWidth = grid.width();

  panels.each(function(i) {
    var panel = $(this);
    var width = totalWidth / numOfCols;
    var height = width; // Panel should always be square
    top = height * row;
    left = width * interval;
    panel.css({height: height, width: width, top: top, left: left});

    interval += 1;
    if (interval !== 0 && interval % numOfCols === 0) {
      interval = 0;
      row += 1;
    }
    // Set the height of their parent container
    $('#grid-container').height(row * height);
  });
}

function layoutSlides(slideShow) {
  var slides = slideShow.find('.slide');
  var totalWidth = slideShow.outerWidth();
  var margin = totalWidth / 5;
  var imageWidth = totalWidth - (margin * 2);

  slides.each(function() {
    $(this).find('.image').css({width: imageWidth, height: imageWidth, 'margin-left': margin });
  })
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

  layoutGrid(panels, grid);

  var gridWidth = grid.outerWidth();
  var gridHeight = grid.outerHeight();

  slideshowWindow.css({width: gridWidth, height: gridHeight });
  slideshowContainer.css({width: gridWidth, height: gridHeight });
  gridArea.css({height: gridHeight });

  layoutSlides(slideShow);

  slideShow.slick({
    arrows: false
  });

  // Resize event
  $(window).resize(function() {
    layoutGrid(panels, grid);
    layoutSlides(slideShow);
    gridWidth = grid.outerWidth();
    gridHeight = grid.outerHeight();
    slideshowWindow.css({width: gridWidth, height: gridHeight });
    slideshowContainer.css({width: gridWidth, height: gridHeight });
    gridArea.css({height: gridHeight });
  });

  // Open slideshow transition
  panels.click(function() {
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

    clickedPanel.animate({
      width: slideShowOriginals.width,
      height: slideShowOriginals.height,
      left: slideShowOriginals.position.left,
      top: slideShowOriginals.position.top
    }, {
      duration: 500,
      queue: false,
      complete: function() {
        $(this).css({
          width: panelOriginals.width,
          height: panelOriginals.height,
          left: panelOriginals.position.left,
          top: panelOriginals.position.top
        });
        layoutGrid(panels, grid);
      }
    });
 
    slideShow.slickGoTo(index, true);

    slideshowWindow.css({
      width: panelOriginals.width,
      height: panelOriginals.height,
      left: panelOriginals.position.left,
      top: panelOriginals.position.top
    });

    slideshowWindow.animate({
      width: slideShowOriginals.width,
      height: slideShowOriginals.height,
      left: slideShowOriginals.position.left,
      top: slideShowOriginals.position.top
    }, {
      duration: 500,
      queue: false,
      complete: function() {
        layoutSlides(slideShow);
      }
    });

    slideshowWindow.css({'opacity': '1', 'pointer-events' : 'auto'});
    grid.css({'opacity': '0', 'pointer-events' : 'none'});
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

    slideshowWindow.animate({
      width: panelOriginals.width,
      height: panelOriginals.height,
      left: panelOriginals.position.left,
      top: panelOriginals.position.top
    }, {
      duration: 500,
      queue: false,
      complete: function() {
        $(this).css({
          width: slideShowOriginals.width,
          height: slideShowOriginals.height,
          left: slideShowOriginals.position.left,
          top: slideShowOriginals.position.top
        });
      }
    });

    panel.css({
      width: slideShowOriginals.width,
      height: slideShowOriginals.height,
      left: slideShowOriginals.position.left,
      top: slideShowOriginals.position.top
    });

    panel.animate({
      width: panelOriginals.width,
      height: panelOriginals.height,
      left: panelOriginals.position.left,
      top: panelOriginals.position.top
    }, {
      duration: 500,
      queue: false,
      complete: function() {
        layoutGrid(panels, grid);
      }
    });

    grid.css({'opacity': '1', 'pointer-events' : 'auto'});
    slideshowWindow.css({'opacity': '0', 'pointer-events' : 'none'});
  });

  // Prev / Next slide buttons
  prevButton.click(function() {
    slideShow.slickPrev();
  });

  nextButton.click(function() {
    slideShow.slickNext();
  });
});
