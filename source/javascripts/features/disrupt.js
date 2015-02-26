function getPanelCoords(panelId) {
  var panel = $('#grid-container .grid-panel[data-slideindex=' + panelId +']');
  return panel.position();
}

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

$(window).resize(function() {
  var panels = $('#grid-container .grid-panel');
  var grid = $('#grid-container');
  var slideShowContainer = $('#slideshow-container');
  var gridArea = $('#grid-area');
  layoutGrid(panels, grid);
  var gridWidth = grid.outerWidth();
  var gridHeight = grid.outerHeight();
  slideShowContainer.css({width: gridWidth, height: gridHeight });
  gridArea.css({height: gridHeight });
});

$(document).ready(function(event){
  var gridArea = $('#grid-area');
  var slideshowPositionedContainer = $('#slideshow-positioned-container');
  var slideShowContainer = $('#slideshow-container');
  var slideShow = $('#slides-container');
  var grid = $('#grid-container');
  var panels = $('#grid-container .grid-panel');
  var closeSlideShow = $('#slideshow-container .close');
  var prevButton = $('#slideshow-container .prev');
  var nextButton = $('#slideshow-container .next');

  layoutGrid(panels, grid);

  var gridWidth = grid.outerWidth();
  var gridHeight = grid.outerHeight();

  slideShowContainer.css({width: gridWidth, height: gridHeight });

  gridArea.css({height: gridHeight });

  slideShow.slick();

  panels.click(function() {
    var clickedPanel = $(this);
    var index = clickedPanel.attr('data-slideindex');
    var panelOriginals = {
      width: clickedPanel.outerWidth(),
      height: clickedPanel.outerHeight(),
      position: getPanelCoords(index)
    };
    var slideShowOriginals = {
      width: slideShowContainer.outerWidth(),
      height: slideShowContainer.outerHeight(),
      position: getCoords(slideShowContainer)
    };
   
    panels.css({'opacity': '0', 'pointer-events' : 'none'});

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
      }
    });
 
    slideShow.slickGoTo(index, true);

    slideShowContainer.css({
      width: panelOriginals.width,
      height: panelOriginals.height,
      left: panelOriginals.position.left,
      top: panelOriginals.position.top
    });

    slideShowContainer.animate({
      width: slideShowOriginals.width,
      height: slideShowOriginals.height,
      left: slideShowOriginals.position.left,
      top: slideShowOriginals.position.top
    }, {
      duration: 500,
      queue: false,
      complete: function() {
        
      }
    });

    slideShowContainer.css({'opacity': '1', 'pointer-events' : 'auto'});
    panels.css({'opacity': '0', 'pointer-events' : 'none'});

    layoutGrid(panels, grid);
  });

  closeSlideShow.click(function() {
    var index = slideShow.slickCurrentSlide();
    var panel = $('#grid-container .grid-panel[data-slideindex="' + index + '"]');
    var panelOriginals = {
      width: panel.outerWidth(),
      height: panel.outerHeight(),
      position: getPanelCoords(index)
    };
    var slideShowOriginals = {
      width: slideShowContainer.outerWidth(),
      height: slideShowContainer.outerHeight(),
      position: getCoords(slideShowContainer)
    };

    slideShowContainer.animate({
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

    panels.css({'opacity': '1', 'pointer-events' : 'auto'});
    slideShowContainer.css({'opacity': '0', 'pointer-events' : 'none'});
  });

  prevButton.click(function() {
    slideShow.slickPrev();
  });

  nextButton.click(function() {
    slideShow.slickNext();
  });
});
