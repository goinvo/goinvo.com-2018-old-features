$(document).ready(function(){
	$('input[type="checkbox"]').change(function() {
	    var id = $(this).attr("id");
	    if (id == "option0" || id == "option1"){
	    	id = id+$(".tab-pane.active")[0].id;
	    }
	    if (this.checked){
		    addCondition(id);
		}
		else {
			$(".tab-pane.active").find("."+id).remove();
		}
	});
})

function addCondition (id) {
	$.getJSON("/features/careplans/data/conditions.json", function (data) {
    	var condition = data[0][id];
    	if (condition != undefined) {
	    	if( $(".tab-pane.active").find('.care-team > .'+id).length == 0 ){
		    	$('.care-team').append("<span class="+id+">"+condition["care team"]+"</span>");
		    }
	    	$.each(condition["care plan"], function(component, content) {
	    		component = component.replace(/\s/g, '');
	    		$.each(content, function(key, val){
	    			if (val != "" && $(".tab-pane.active").find('#'+component+' > #'+key+' > .'+id).length == 0) {
	    				$(".tab-pane.active").find("#"+component+" > #"+key).append("<p class="+id+">"+val+"</p>");
	    			}
	    		});
	    	});
	    }
    });
}

function enableDisable () {
	var boxes = $(".tab-pane.active").find('input[type="checkbox"]');
	var checked_boxes = $(".tab-pane.active").find('input[type="checkbox"]:checked');
    if ( checked_boxes.length == 2 ) {
    	$.each( boxes , function (i, box) {
    		$(box).prop("disabled", !this.checked);
    	});
    }
    else if ( checked_boxes.length < 2 ){
    	$(boxes).prop("disabled", false);
    } 
}