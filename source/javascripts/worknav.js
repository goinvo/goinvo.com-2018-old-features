// This js file sets up the navigation between case studies by adding navigation to the left & right keys, and by adding an image/link to the bottom of the page for the next case study.
// Currently this is not pulling data from the data file and the projects array is it's own in parallel to the data file. This can lead to mistakes in the future as things change.

$( document ).ready(function() {
	var current = document.URL;
	var projects = [
		{
			"title" : "3M",
			"image" : "3m_main.jpg"
		},
		{
			"title" : "hGraph",
			"image" : "hgraph_ipad_physical.jpg"
		},
		{
			"title" : "Affinnova",
			"image" : "concept-studio-product-blueprint-stickies.jpg"
		}, 
		{
			"title" : "Dataxu",
			"image" : "dataxu-campaign-dashboard-user-interface-tablet.jpg"
		}, 
		{
			"title" : "McAfee",
			"image" : "mcafee-total-protection-desktop-app-design.jpg"
		}, 
		{
			"title" : "Numera",
			"image" :  "numera-whiteboard-ui-sketch.jpg"
		}, 
		{
			"title" : "Ruelala",
			"image" : "ruelala-current-workflow-documentation.jpg"
		}
	];


	var next = $('#next-project');
	var nextTitle = $('div.next-title span');

	var index = 0;
	var imgURL = "";
	
	if(current.indexOf("3m") >= 0) {
		index = 1;
	}
	else if(current.indexOf("hgraph") >= 0) {
		index = 2;
	}
	else if(current.indexOf("affinnova") >= 0) {
	   index = 3;
	}
	else if(current.indexOf("dataxu") >= 0) {
		index = 4;
	}
	else if(current.indexOf("mcafee") >= 0) {
		index = 5;
	}
	else if(current.indexOf("numera") >= 0) {
		index = 6;
	}
	else {
		index = -1; 
	}
	
	if(index > 0) {
		imgURL = "../../images/clients/" + projects[index].title.toLowerCase() + "/" + projects[index].image;  //note the '/v01/' .. this is hardcoded so it works when we upload to the server
		
		next.css({
			"background": "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.5) 100%), url(" + imgURL + ")",
			"background-size": "cover",
			"background-position": "center"
		})
		next.on("click", function () {
			   window.location.href = projects[index].title.toLowerCase(); //note the '/v01/'
		});
		nextTitle.html(projects[index].title);
	}
	else {
		next.css("display", "none");   
	}
	
	
	Mousetrap.bind('left', function () {
		var l = getIndex();
		if(l >= 0 && l <= 5){
			l = l -1;   
		}
		if(l >= 0 && l <= 5){
			var url = projects[l].title.toLowerCase(); //note the '/v01/'
			window.location.href = url;
		}
	});

	Mousetrap.bind('right', function () {
		var l = getIndex();
		if(l >= 0 && l <= 5){
			l = l +1;   
		}
		if(l >= 0 && l <= 5){
			var url = projects[l].title.toLowerCase(); //note the '/v01/'
			window.location.href = url;
		}
	});
});

function getIndex() {
	var index2 = 0;
	var current = document.URL;
	
	if(current.indexOf("3m") >= 0) {
		index2 = 0;
	}
	else if(current.indexOf("hgraph") >= 0) {
		index2 = 1;
	}
	else if(current.indexOf("affinnova") >= 0) {
	   index2 = 2;
	}
	else if(current.indexOf("dataxu") >= 0) {
		index2 = 3;
	}
	else if(current.indexOf("mcafee") >= 0) {
		index2 = 4;
	}
	else if(current.indexOf("numera") >= 0) {
		index2 = 5;
	}
	else if(current.indexOf("ruelala") >= 0) {
		index2 = 6;
	}
	else {
		index2 = -1; 
	}
	
	return index2;
}