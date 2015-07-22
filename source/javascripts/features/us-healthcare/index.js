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
  $('.perspective').click(function(e){
    $('.action-container').hide();
    $('.perspective').removeClass('selected');
    var this_key = $(this).attr('data-key');
    $('.action-container[data-perspective="'+this_key+'"]').show()
    $(this).addClass('selected');
  });


  var followLinks = function myself(find_targets, nodeKey){
    var data_attribute = "data-key-source";
    var other = 'data-key-target';
    if(find_targets){ 
      data_attribute = "data-key-target";
      other = 'data-key-source';
   } 
    $('.link['+data_attribute+'="'+nodeKey+'"]').each(function(){
      $(this).attr('data-highlight', find_targets?'backwards':'forwards');
        myself(find_targets,$(this).attr(other));
    });
  };
  $('.individual-action').click(function(e){
    $('.link').attr('data-highlight','false');
    $('.individual-action').removeClass('selected');
    var this_key = $(this).attr('data-key');
    console.log(this_key)
    //First, find things that use this key as a source.
    followLinks(false, this_key);
    //Then go the other way.
    followLinks(true, this_key);
    // $('.link[data-key-source="'+this_key+'"]').each(function(){
    //   $(this).attr('data-highlight', 'true');
    //   //First, find the thing that has a source of this key
    //   followLinks(false, $(this).attr('data-key-target'));
    //   // followLinks(false, $(this).attr('data-key-source'));
    // })
    $(this).addClass('selected');
  });
  
});
