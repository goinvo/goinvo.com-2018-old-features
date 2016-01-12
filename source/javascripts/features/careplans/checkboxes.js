$(document).ready(function(){
	$('input[type="checkbox"]').change(function() {
	    var id = $(this).attr("id");
	    if($(window).width()>769) {
	    	if (id == "option0" || id == "option1"){
		    	id = id+$(".tab-pane.active")[0].id;
		    }
		    if (this.checked){
			    addCondition(id);
			    if (id == "obesity") {
			    	if($(".tab-pane.active").attr("id") == "1")
			    		$(".tab-pane.active .profile.desktop .row:first-child img").attr("src", "../../../images/careplans/isabella_obese.png");
			    	if($(".tab-pane.active").attr("id") == "2")
			    		$(".tab-pane.active .profile.desktop .row:first-child img").attr("src", "../../../images/careplans/reggie_obese.png");
			    	if($(".tab-pane.active").attr("id") == "3")
			    		$(".tab-pane.active .profile.desktop .row:first-child img").attr("src", "../../../images/careplans/donna_obese.png");
			    }
			}
			else {
				$(".tab-pane.active table").find("."+id).remove();
				$(".tab-pane.active .right").find("."+id).remove();
				$(".tab-pane.active .summary").find("."+id).remove();
				if (id == "obesity") {
			    	if($(".tab-pane.active").attr("id") == "1")
			    		$(".tab-pane.active .profile.desktop .row:first-child img").attr("src", "../../../images/careplans/isabella_norm.png");
			    	if($(".tab-pane.active").attr("id") == "2")
			    		$(".tab-pane.active .profile.desktop .row:first-child img").attr("src", "../../../images/careplans/reggie_norm.png");
			    	if($(".tab-pane.active").attr("id") == "3")
			    		$(".tab-pane.active .profile.desktop .row:first-child img").attr("src", "../../../images/careplans/donna_norm.png");
			    }
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
				$(".profile-pane.active .content-table").find("."+id).remove();
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
		    			if (val != "" && $(".tab-pane.active table").find('#'+component+' > #'+key+' > .'+id).length == 0) {
		    				$(".tab-pane.active table").find("#"+component+" > #"+key).append("<p class="+id+">"+val+"</p>");
		    			}
		    		});
		    	});
    		}
    		else {
    			$.each(condition["care plan"], function(component, content) {
		    		component = component.replace(/\s/g, '');
		    		$.each(content, function(key, val){
		    			if (val != "" && $(".profile-pane.active .content-table#"+component+" > #"+key+" > ."+id).length == 0) {
		    				$(".profile-pane.active .content-table#"+component+" > #"+key).append("<p class="+id+">"+val+"</p>");
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