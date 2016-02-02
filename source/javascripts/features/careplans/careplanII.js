// careplans II
$(document).ready(function(){
	setCircle7Position();
	
	$('[data-toggle="popover"]').popover(); 
});

$(window).resize(function(event) {
	/* Act on the event */
	var processBox7Height = $(".process-box7").height() + 25 + "px";
	$(".circle7").css("bottom","calc(1% + "+processBox7Height+")");
});

function setCircle7Position() {
	var processBox7Height = $(".process-box7").height() + 25 + "px";
	$(".circle7").css("bottom","calc(1% + "+processBox7Height+")");
}