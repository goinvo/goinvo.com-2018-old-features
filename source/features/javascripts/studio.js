$(document).ready(function(){
	var position = $(window).scrollTop(); 
    var scrollChange = $(window).scrollTop(); 
    var direction = "-";
    var pastDirection = "-"
    
    $(window).scroll(function() {
      var width = $(window).width();
      var scrollTop = $(window).scrollTop(); 
      if(scrollTop > position) {
          direction = "down";
      }
      else {
          direction = "up";
      }
      if(pastDirection != direction) {
          scrollChange = scrollTop;
      }
      
      if(width < 500) {
        if(scrollTop > 80) {
            $('#studio-header').toggleClass("hide-me", true);
        }
        else {
            $('#studio-header').toggleClass("hide-me", false);
        }
      }
      else {
          if(scrollTop > 80 && scrollChange-scrollTop <= 50) {
              $('#studio-header').toggleClass("hide-me", true);
          }
          else {
            $('#studio-header').toggleClass("hide-me", false);
          }
      }
      position = scrollTop;
      pastDirection = direction;
      
      
    });
});
