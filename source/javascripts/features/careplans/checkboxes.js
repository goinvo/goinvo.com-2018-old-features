$('input[type="checkbox"]').change(function() {
    var id = $(this).attr("id");
    if (this.checked){
	    $.getJSON("/features/careplans/data/conditions.json", function (data) {
	    	var condition = data[0][id];
	    	$.each(condition["care plan"], function(component, content) {
	    		component = component.replace(/\s/g, '');
	    		$.each(content, function(key, val){
	    			if (val != "") {
	    				$("#"+component+" > #"+key).append("<span class="+id+">"+val+"</span>");
	    			}
	    		});
	    	});
	    });
	}
	else {
		$("."+id).remove();
	}
});