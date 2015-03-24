// function play() {
//   $(this).parent().find("video")[0].play();
// }

// function pause() {
//   $(this).parent().find("video")[0].pause();
// }

$(document).ready(function(event){
  var bottomNavState = 'closed';

  var windowHeight = $(window).height();
  var documentHeight = $(document).height();

  // Vars for scroll fades
  var firstVideo = $('#top');
  var secondVideo = $('#bottom');
  var firstVideoBottom = firstVideo.offset().top + firstVideo.height();
  var secondVideoTop = secondVideo.offset().top;

  // ===== Initialization =====
  $("video").each(function() {
    this.volume = 0.5;
  });

  // ===== Resize event =====
  $(window).resize(function() {
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
    var firstVideoCalc = ((firstVideoBottom - scrollTop) / firstVideoBottom);
    var secondVideoCalc = ((windowBottom-secondVideoTop) / (documentHeight - secondVideoTop));

    //Bottom nav animation
    if (scrollTop + windowHeight > documentHeight - 50) {
      if (bottomNavState === 'closed') {
        $('#bottom-nav').animate({
          opacity: 1,
          bottom: "50px"
        }, {
          duration: 500,
          complete: function() {
            bottomNavState = 'open';
            $(this).css('pointer-events', 'auto');
          }
        });
      }
    }

    if (scrollTop + windowHeight < documentHeight - 100) {
      $('#bottom-nav').animate({
        opacity: 0,
        bottom: "0px"
      }, {
        duration: 0,
        complete: function() {
          bottomNavState = 'closed';
          $(this).css('pointer-events', 'none');
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

  // Color scroll fading
  var colors = [
    {top: '#0282C1', bottom: '#E68B35'},
    {top: '#E68B35', bottom: '#DD2E64'},
    {top: '#DD2E64', bottom: '#82659B'},
    {top: '#82659B', bottom: '#0282C1'},
    {top: '#0282C1', bottom: '#0396AA'},
    {top: '#0396AA', bottom: '#82659B'}
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
        position: secondVideoTop - (windowHeight + (windowHeight*0.05))
      },
      {
        color: colors[page].bottom,
        position: documentHeight - windowHeight
      }
    ]
  });

  $('#bottom-nav .title').css("color", colors[page].bottom);

  // ===== Video Hover Controls =====
  // $('.sec-header .title-container').hover(pause, play);
});
