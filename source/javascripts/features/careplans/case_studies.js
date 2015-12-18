var nursing = $('#nursing_popup');
$('#nursing_span').click(function(){
	$(this).toggleClass('selected_span');
	if($(nursing).is(':visible')){
		nursing.fadeOut(100);
	} else {
		nursing.fadeIn(100);
	}
});

var life_care_planning = $('#life_care_planning_popup');
$('#life_care_planning_span').click(function(){
	$(this).toggleClass('selected_span');
	if($(life_care_planning).is(':visible')){
		life_care_planning.fadeOut(100);
	} else {
		life_care_planning.fadeIn(100);
	}
});

var EAB = $('#EAB_popup');
$('#EAB_span').click(function(){
	$(this).toggleClass('selected_span');
	if($(EAB).is(':visible')){
		EAB.fadeOut(100);
	} else {
		EAB.fadeIn(100);
	}
});

var developmental_psychology = $('#developmental_psychology_popup');
$('#developmental_psychology_span').click(function(){
	$(this).toggleClass('selected_span');
	if($(developmental_psychology).is(':visible')){
		developmental_psychology.fadeOut(100);
	} else {
		developmental_psychology.fadeIn(100);
	}
});

var case_management = $('#case_management_popup');
$('#case_management_span').click(function(){
	$(this).toggleClass('selected_span');
	if($(case_management).is(':visible')){
		case_management.fadeOut(100);
	} else {
		case_management.fadeIn(100);
	}
});

var litigation = $('#litigation_popup');
$('#litigation_span').click(function(){
	$(this).toggleClass('selected_span');
	if($(litigation).is(':visible')){
		litigation.fadeOut(100);
	} else {
		litigation.fadeIn(100);
	}
});
