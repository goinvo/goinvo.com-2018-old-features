$('input[type="checkbox"]').change(function() {
    var id = $(this).attr("id");
    if (this.checked){
	    $.getJSON("/features/careplans/data/conditions.json", function (data) {
	    	var condition = data[0][id];
	    	if( $('.care-team > .'+id).length == 0 ){
		    	$('.care-team').append("<span class="+id+">"+condition["care team"]+"</span>");
		    }
	    	$.each(condition["care plan"], function(component, content) {
	    		component = component.replace(/\s/g, '');
	    		$.each(content, function(key, val){
	    			if (val != "" && $('#'+component+' > #'+key+' > .'+id).length == 0) {
	    				$("#"+component+" > #"+key).append("<p class="+id+">"+val+"</p>");
	    			}
	    		});
	    	});
	    });
	}
	else {
		$("."+id).remove();
	}
});