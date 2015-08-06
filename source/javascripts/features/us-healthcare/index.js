$(document).ready(function(){

  $('#article-nav li').on('click', function() {
    var data = $(this).find('a').data('link');
    var wanted = $(data);
    $('html, body').animate({
        scrollTop: wanted.offset().top - 100
    }, 750);
    
  });
  
  $('.tab-link').click(function(){
    var tab = $(this);
    $('.tab-link, .tab-content').removeClass('current');
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
    $('.individual-result').hide();
  });

  $('.up_link').click(function(e){
    var href = $(this).attr('href');
    href = href.substring(1,href.length);
    var target = $('[name="'+href+'"]');
    if(!$(target).is(":visible") && target){
      var parent = $(target).parent();
      var lastParent;
      while(!$(parent).is(":visible")){
        lastParent = parent;
        parent = $(parent).parent();
      }
      lastParent.show();
    }
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
  
  
  $('.individual-result').hide();
  
  $('.individual-action').click(function(e){
    $('.individual-result').hide();
    var this_key = $(this).attr('data-key');
    $('.individual-result[data-key="'+this_key+'"]').show()
  });
  
  $('.cancel-button').click(function(e){
    $('.individual-result').hide();
  });
  
  
  
  function getPosition(element) {
    var xPosition = 0;
    var yPosition = 0;
  
    while(element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }
    return { x: xPosition, y: yPosition };
  }
  
//  var clinic = document.querySelector("#clinic_visit_location"); 
//  var xray = document.querySelector("#xray_location"); 
//  var ct1 = document.querySelector("#ct1_location"); 
//  var ct2 = document.querySelector("#ct2_location"); 
//  var hospital = document.querySelector("#hospital_location"); 
//  var total = document.querySelector("#total_location"); 
  var position = function(input) { return getPosition(input);}
  
  
   var bill_data = [
    {
      "key": "clinic",
      "title":"Clinic Visit",
      "location":"clinic_visit_location",
      "cost":"$150"
    },
    {
      "key":"xray",
      "title":"X-ray",
      "location":"xray_location",
      "cost":"$100"
    },
    {
      "key":"ct1",
      "title":"CT Scan #1",
      "location":"ct1_location",
      "cost":"$785"
    },
    {
      "key":"ct2",
      "title":"CT Scan #2",
      "location":"ct2_location",
      "cost":"$785"
    },
    {
      "key":"hospital",
      "title":"Hospital Stay",
      "location":"hospital_location",
      "cost":"$14,000"
    },
    {
      "key":"total",
      "title":"Total",
      "location":"total_location",
      "cost":"$15,820"
    }
  ];
  
    
  bill_data.forEach(function(item) {
    $('[data-reason="' + item.key + '"]').hide()
  });
  
  $(window).scroll(function(i) {
    var winH = window.innerHeight;
    var hb = $('#medical-bill');
    bill_data.forEach(function(item) {
      var bill_item = document.querySelector("#" + item.location);
      var scroll_pos_test = position(bill_item).y;
      if(scroll_pos_test < 0 + .39*winH) {
        if( !hb.visible ) {
          $('[data-reason="' + item.key + '"]').show('fast'); 
        } else {
          $('[data-reason="' + item.key + '"]').show();
        }
      } else {
        if( !hb.visible ) {
          $('[data-reason="' + item.key + '"]').hide('fast'); 
        } else {
          $('[data-reason="' + item.key + '"]').hide();
        }
      }
    });
    var currentScrollTop = $(this).scrollTop();

    var top = position(document.querySelector('#waste-container')).y;
    var bottom = position(document.querySelector('#ct2_location')).y;
    var end = position(document.querySelector('#history')).y;
    var start = position(document.querySelector('#clinic_visit_location')).y;

    if(start - winH*.6 > 0 || (top - winH*.5 < 0 && bottom - winH*.5 > 0) || end - winH*.5 < 0 ) { 
      $('#medical-bill').toggleClass('is-visible', false);
    } else {
      $('#medical-bill').toggleClass('is-visible', true);
    }

  });
});
