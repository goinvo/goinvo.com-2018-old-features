$(document).ready(function(){

  $('ul.tabs li').click(function(){
    var tab = $(this);
    $('ul.tabs li, .tab-content').removeClass('current');
    tab.addClass('current');
    $("#"+tab.attr('data-tab')).addClass('current');
  });


  // Slide down
  $('.slide').click(function(e){
    e.stopPropagation();
    var index = $(this).attr('data-index');
    $('.slide-panel[data-index="'+index+'"]').slideToggle('slow');
  });

  $('.decision').click(function(e){
    e.stopPropagation();
    var index = $(this).attr('data-index');
    $('.decision[data-index="'+index+'"]').attr('data-selected','no');
    $(this).attr('data-selected','yes');
    var outcome = $(this).attr('data-outcome');
    var otherOutcome = outcome==='positive'? 'negative' : 'positive';
    $('[data-outcome="'+otherOutcome+'"][data-index="'+index+'"]:not(.decision)').hide();
    $('[data-outcome="'+outcome+'"][data-index="'+index+'"]:not(.decision)').slideDown();
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
  $('.perspective:first').trigger('click');
  
  
});
