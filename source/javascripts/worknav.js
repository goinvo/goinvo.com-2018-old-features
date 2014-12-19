// This js file sets up the navigation between case studies by adding navigation to the left & right keys, and by adding an image/link to the bottom of the page for the next case study.
// Currently this is not pulling data from the data file and the projects array is it's own in parallel to the data file. This can lead to mistakes in the future as things change.

$( document ).ready(function() {
	var current = document.URL;
	
	var projects = {
		"healthcare" : {
			"hgraph" : {
				"title" : "hGraph",
				"url" : "/healthcare/hgraph/",
				"image" : "hgraph.jpg",
				"next-id" : "3m"
				
			},
			"3m" : {
				"title" : "3M",
				"url" : "/healthcare/3m/",
				"image" : "3m.jpg",
				"next-id" : "inspired-ehrs"
			},
			"inspired-ehrs" : {
				"title" : "Inspired EHRs: Designing for Clinicians",
				"url" : "/healthcare/inspired-ehrs/",
				"image" : "ehr.jpg",
				"next-id" : "personal-genome-project"
			},
//			"tabeeb" : {
//				"title" : "Tabeeb",
//				"url" : "/healthcare/tabeeb/",
//				"image" : "tabeeb.jpg",
//				"next-id" : "mount-sinai"
//			},
			"personal-genome-project" : {
				"title" : "Personal Genome Project",
				"url" : "/healthcare/personal-genome-project/",
				"image" : "pgp.jpg",
				"next-id" : "mount-sinai"
			},
			"mount-sinai" : {
				"title" : "Mount Sinai: A search for unexpected genetic heroes.",
				"url" : "/healthcare/mount-sinai/",
				"image" : "mount-sinai.jpg",
				"next-id" : "health-axioms"
			},
			
			"health-axioms" : {
				"title" : "Health Axioms",
				"url" : "/healthcare/health-axioms/",
				"image" : "health-axioms.jpg",
				"next-id" : "partners-gene-insight"
			},
			"partners-gene-insight" : {
				"title" : "Partners Gene Insight",
				"url" : "/healthcare/partners-gene-insight/",
				"image" : "pgi.png",
				"next-id" : "numera"
			},
			"numera" : {
				"title" : "Numera",
				"url" : "/healthcare/numera/",
				"image" : "numera.jpg",
				"next-id" : "enterprise"
			},
			"healthcare" : {
				"title" : "Healthcare",
				"url" : "/healthcare/",
				"image" : "hgraph.jpg",
				"next-id" : "enterprise"
			}
		},
		"enterprise" : {
			"affinnova" : {
				"title" : "Affinova",
				"url" : "/enterprise/affinnova/",
				"image" : "affinnova.jpg",
				"next-id" : "dnc"
			},
			"dnc" : {
				"title" : "Democratic National Committee",
				"url" : "/enterprise/dnc/",
				"image" : "dnc.jpg",
				"next-id" : "ruelala"
			},
			"ruelala" : {
				"title" : "Rue La La",
				"url" : "/enterprise/ruelala/",
				"image" : "ruelala.jpg",
				"next-id" : "dataxu"
			},
			"dataxu" : {
				"title" : "DataXu",
				"url" : "/enterprise/dataxu/",
				"image" : "dataxu.jpg",
				"next-id" : "microsoft"
			},
			"microsoft" : {
				"title" : "Microsoft",
				"url" : "/enterprise/microsoft/",
				"image" : "microsoft.jpg",
				"next-id" : "oracle"
			},
			"oracle" : {
				"title" : "Oracle",
				"url" : "/enterprise/oracle/",
				"image" : "oracle.jpg",
				"next-id" : "mcafee"
			},
			"mcafee" : {
				"title" : "McAfee",
				"url" : "/enterprise/mcafee/",
				"image" : "mcafee.jpg",
				"next-id" : "scskcorporation"
			},
			"scskcorporation" : {
				"title" : "SCSKcorporation",
				"url" : "/enterprise/scskcorporation/",
				"image" : "scsk.jpg",
				"next-id" : "healthcare"
			},
			"telerik" : {
				"title" : "Telerik",
				"url" : "/enterprise/telerik/",
				"image" : "telerik.jpg",
				"next-id" : "healthcare"
			},
			"enterprise" : {
				"title" : "Enterprise",
				"url" : "/enterprise/",
				"image" : "dataxu.jpg",
				"next-id" : "products"
			}
		},
		"products" : {
			"hgraph" : {
				"title" : "hGraph",
				"url" : "/products/hgraph/",
				"image" : "hgraph.jpg",
				"next-id" : "visual-government"
				
			},
			"visual-government" : {
				"title" : "Visual Government",
				"url" : "/products/visual-government/",
				"image" : "visual-government.png",
				"next-id" : "health-axioms"
			},
			"health-axioms" : {
				"title" : "Health Axioms",
				"url" : "/products/health-axioms/",
				"image" : "health-axioms.jpg",
				"next-id" : "design-axioms"
			},
//			"the-digital-life" : {
//				"title" : "The Digital Life",
//				"url" : "/products/the-digital-life/",
//				"image" : "digital-life.jpg",
//				"next-id" : "facio"
//			},
//			"facio" : {
//				"title" : "Facio",
//				"url" : "/products/facio/",
//				"image" : "facio.jpg",
//				"next-id" : "design-axioms"
//			},
			"design-axioms" : {
				"title" : "Design Axioms",
				"url" : "/products/design-axioms/",
				"image" : "design-axioms.jpg",
				"next-id" : "staff-plan"
			},
//			"paintrackr" : {
//				"title" : "PainTrackr",
//				"url" : "/products/paintrackr/",
//				"image" : "paintrackr.jpg",
//				"next-id" : "staff-plan"
//			},
			"staff-plan" : {
				"title" : "StaffPlan",
				"url" : "/products/staff-plan/",
				"image" : "staffplan.png",
				"next-id" : "healthcare"
			},
//			"runnan" : {
//				"title" : "Runnan",
//				"url" : "/products/runnan/",
//				"image" : "runnan.jpg",
//				"next-id" : "healthcare"
//			},
			"products" : {
				"title" : "Products",
				"url" : "/products/",
				"image" : "products.jpg",
				"next-id" : "healthcare"
			}
		}
		
	};

	var next = $('#next-project');
	var nextArea = $('div.next-title');
	var nextTitle = $('div.next-title span');

	var imgURL = "";
	
	var nextID = "";
	var currentID = "";
	var currentCat = "";
	
	if(current.indexOf('healthcare') >=0) {
		currentCat = 'healthcare';
	}
	else if(current.indexOf('enterprise') >= 0) {
		currentCat = 'enterprise';	
	}
	else if(current.indexOf('products') >= 0) {
		currentCat = 'products';	
	}
	
	i = current.indexOf(currentCat + '/');
	i = i + currentCat.length + 1;
	currentID = current.substring(i);
	
	i = currentID.indexOf('/');
	if(i >= 0)
		currentID = currentID.substring(0, i);
	
	i = currentID.indexOf('#');
	if(i >= 0)
		currentID = currentID.substring(0, i);
	
	i = currentID.indexOf('?');
	if(i >= 0)
		currentID = currentID.substring(0,i);
	
	i = currentID.indexOf('~');
	if(i >= 0)
		currentID = currentID.substring(0,i);
	
	console.log(currentCat);
	console.log(currentID);
	console.log(projects[currentCat][currentID]);
	nextID = projects[currentCat][currentID]['next-id'];
	
	console.log(nextID);
	
	
	if(nextID != "enterprise" && nextID != "healthcare") {
		imgURL = "../../images/clients/next-case-study/" + projects[currentCat][nextID]['image'];

		next.css({
			"background-image": "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.5) 100%), url(" + imgURL + ")"
		})
		next.on("click", function () {
			   window.location.href =  '../..' + projects[currentCat][nextID]['url'] ;
		});
		nextTitle.html(projects[currentCat][nextID]['title']);
	}
	else {
		next.on("click", function () {
			   window.location.href = '../..' + projects[nextID][nextID]['url'];
		});
		nextArea.html('<span id="next">See our work in ' + projects[nextID][nextID]['title'] + '</span>');
		
		imgURL = "../../images/clients/next-case-study/" + projects[nextID][nextID]['image'];
		
		next.css({
			"background-image": "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.5) 100%), url(" + imgURL + ")"
		})
	}

});
