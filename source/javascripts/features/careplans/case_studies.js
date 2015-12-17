
var nurse = $('#nurse_popup');
$('#nursing_span').click(function(){
	if($(nurse).is(':visible')){
		nurse.fadeOut(100);
	} else {
		nurse.fadeIn(100);
	}
});

var life_care_planning = $('#life_care_planning_popup');
$('#life_care_planning_span').click(function(){
	if($(life_care_planning).is(':visible')){
		life_care_planning.fadeOut(100);
	} else {
		life_care_planning.fadeIn(100);
	}
});

var EAB = $('#EAB_popup');
$('#EAB_span').click(function(){
	if($(EAB).is(':visible')){
		EAB.fadeOut(100);
	} else {
		EAB.fadeIn(100);
	}
});

var developmental_psychology = $('#developmental_psychology_popup');
$('#developmental_psychology_span').click(function(){
	if($(developmental_psychology).is(':visible')){
		developmental_psychology.fadeOut(100);
	} else {
		developmental_psychology.fadeIn(100);
	}
});

var case_management = $('#case_management_popup');
$('#case_management_span').click(function(){
	if($(case_management).is(':visible')){
		case_management.fadeOut(100);
	} else {
		case_management.fadeIn(100);
	}
});

var litigation = $('#litigation_popup');
$('#litigation_span').click(function(){
	if($(litigation).is(':visible')){
		litigation.fadeOut(100);
	} else {
		litigation.fadeIn(100);
	}
});
