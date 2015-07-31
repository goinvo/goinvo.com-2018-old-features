$('.perspective').click(function(e){
    var this_perspective = $(this).attr('data-perspective');
    $('.perspective-option-container).hide();
    //Do any other cleanup you might need... i.e. on the graph
    $('.perspective-option-container[data-perspective="'+this_perspective+'"]').show();
    //Do other stuff with the d3 to select nodes.
    $('.node.data-clinician-highlight').addClass('highlight');
});

$('[data-start-id="health_data_standard"]').each(function(){
    $(this).addClass('highlight');
    
   var end_id = $(this).attr('data-end-id'); 
   $('[data-start-id="'+end_id+'"]
});