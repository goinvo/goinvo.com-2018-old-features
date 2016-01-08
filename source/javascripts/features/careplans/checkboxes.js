$(document).ready(function(){
	$('input[type="checkbox"]').change(function() {
	    var id = $(this).attr("id");
	    if($(window).width()>769) {
	    	if (id == "option0" || id == "option1"){
		    	id = id+$(".tab-pane.active")[0].id;
		    }
		    if (this.checked){
			    addCondition(id);
			}
			else {
				$(".tab-pane.active").find("."+id).remove();
			}
	    }
	    else {
	    	if (id == "option0" || id == "option1"){
		    	id = id+$(".profile-pane.active")[0].id;
		    }
		    if (this.checked){
			    addCondition(id);
			}
			else {
				$(".profile-pane.active").find("."+id).remove();
			}
	    }
	});

	$(".careplan-diagram.mobile .filter .dropdown:first-child ul li").click(function() {
		/* Act on the event */
		var name = $(this).find("a").text();
		var id = $(this).attr("data-id");
		$(".careplan-diagram.mobile .filter .dropdown:first-child .name").text(name);
		$(".profile-pane.active").removeClass("active");
		$(".profile-pane:nth-child("+id+")").addClass('active');
	});

	$(".careplan-diagram.mobile .filter .dropdown:last-child ul input[type='checkbox']").change(function() {
		/* Act on the event */
		var $currentText = $(".careplan-diagram.mobile .filter .dropdown:last-child .selection");
		if (this.checked){
		    var selection = $(this).parent().find("span").text();
		}
		
	});
})

function addCondition (id) {
	$.getJSON("/features/careplans/data/conditions.json", function (data) {
    	var condition = data[0][id];
    	if (condition != undefined) {
    		if($(window).width()>769) {
    			if( $(".tab-pane.active").find('.summary > .'+id).length == 0 ){
			    	$('.active .summary').append("<span class="+id+">"+condition["summary"]+"</span>");
			    }
		    	if( $(".tab-pane.active").find('.care-team > .'+id).length == 0 ){
			    	$('.active .care-team').append("<span class="+id+">"+condition["care team"]+"</span>");
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
    		else {
    			$.each(condition["care plan"], function(component, content) {
		    		component = component.replace(/\s/g, '');
		    		$.each(content, function(key, val){
		    			if (val != "" && $(".profile-pane.active").find('#'+component+' > #'+key+' > .'+id).length == 0) {
		    				$(".profile-pane.active").find("#"+component+" > #"+key).append("<p class="+id+">"+val+"</p>");
		    			}
		    		});
		    	});
    		}
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