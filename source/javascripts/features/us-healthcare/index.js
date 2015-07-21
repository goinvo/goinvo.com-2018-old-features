$(document).ready(function(){
  $('ul.tabs li').click(function(){
    var tab = $(this);
    $('ul.tabs li, .tab-content').removeClass('current');
    tab.addClass('current');
    $("#"+tab.attr('data-tab')).addClass('current');
  });


  // Slide down
  $('#panel1').hide();
  $('#flip1').click(function(){
      $('#panel1').slideToggle('slow');
  });

  $('#panel2').hide();
  $('#flip2').click(function(){
      $('#panel2').slideToggle('slow');
  });

  $('#panel3').hide();
  $('#flip3').click(function(){
      $('#panel3').slideToggle('slow');
  });

  $('#panel4').hide();
  $('#flip4').click(function(){
      $('#panel4').slideToggle('slow');
  });

  $('#panel5').hide();
  $('#flip5').click(function(){
      $('#panel5').slideToggle('slow');
  });
});
