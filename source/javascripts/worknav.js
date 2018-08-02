// This js file sets up the navigation between case studies by adding navigation to the left & right keys, and by adding an image/link to the bottom of the page for the next case study.
// Currently this is not pulling data from the data file and the projects array is it's own in parallel to the data file. This can lead to mistakes in the future as things change.

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

$( document ).ready(function() {
	var current = document.URL;

	var projects = {
		"healthcare" : {
			"title" : "Healthcare",
			"url" : "/healthcare/",
			"image" : "hgraph.jpg",
			"next-id" : "products"
		},
		"3m" : {
			"title" : "3M",
			"url" : "/healthcare/3m/",
			"image" : "3m.jpg",
			"next-id" : "snap"
		},
		"snap" : {
			"title" : "SNAP",
			"url" : "/healthcare/snap/",
			"image" : "snap.jpg",
			"next-id" : "wuxi"
		},
		"wuxi" : {
			"title" : "WuXi NextCODE",
			"url" : "/healthcare/wuxi/",
			"image" : "wuxi.jpg",
			"next-id" : "mount-sinai"
		},
		"mount-sinai" : {
			"title" : "Mount Sinai: A search for unexpected genetic heroes.",
			"url" : "/healthcare/mount-sinai/",
			"image" : "mount-sinai.jpg",
			"next-id" : "partners-gene-insight"
		},
		"partners-gene-insight" : {
			"title" : "Partners Gene Insight",
			"url" : "/healthcare/partners-gene-insight/",
			"image" : "partners-gene-insight.png",
			"next-id" : "personal-genome-project"
		},
		"personal-genome-project" : {
			"title" : "Personal Genome Project",
			"url" : "/healthcare/personal-genome-project/",
			"image" : "personal-genome-project.jpg",
			"next-id" : "inspired-ehrs"
		},
		"inspired-ehrs" : {
			"title" : "Inspired EHRs: Designing for Clinicians",
			"url" : "/healthcare/inspired-ehrs/",
			"image" : "inspired-ehrs.jpg",
			"next-id" : "segterra"
		},
		"segterra" : {
			"title" : "InsideTracker",
			"url" : "/healthcare/segterra/",
			"image" : "segterra.png",
			"next-id" : "care-cards"
		},
		"numera" : {
			"title" : "Numera",
			"url" : "/healthcare/numera/",
			"image" : "numera.jpg",
			"next-id" : "tabeeb"
		},
		"tabeeb" : {
			"title" : "Tabeeb",
			"url" : "/healthcare/tabeeb/",
			"image" : "tabeeb.jpg",
			"next-id" : "diabetes"
		},
		"diabetes" : {
			"title" : "Type I and Type II Diabetes",
			"url" : "/healthcare/diabetes/",
			"image" : "diabetes.jpg",
			"next-id" : "infobionic"
		},
		"infobionic" : {
			"title" : "Infobionic",
			"url" : "/healthcare/infobionic/",
			"image" : "infobionic.jpg",
			"next-id" : "products"
		},
		"enterprise" : {
			"title" : "Enterprise",
			"url" : "/enterprise/",
			"image" : "dataxu.jpg",
			"next-id" : "healthcare"
		},
		"nielsen" : {
			"title" : "Nielsen",
			"url" : "/enterprise/nielsen/",
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
			"image" : "scskcorporation.jpg",
			"next-id" : "telerik"
		},
		"telerik" : {
			"title" : "Telerik",
			"url" : "/enterprise/telerik/",
			"image" : "telerik.jpg",
			"next-id" : "healthcare"
		},
		"products" : {
			"title" : "Products",
			"url" : "/products/",
			"image" : "care-cards.jpg",
			"next-id" : "enterprise"
		},
		"hgraph" : {
			"title" : "hGraph",
			"url" : "/products/hgraph/",
			"image" : "hgraph.jpg",
			"next-id" : "visual-government",
			"healthcare-next-id" : "3m"
		},
		"visual-government" : {
			"title" : "Visual Government",
			"url" : "/products/visual-government/",
			"image" : "visual-government.png",
			"next-id" : "care-cards"
		},
		"care-cards" : {
			"title" : "Care Cards",
			"url" : "/products/care-cards/",
			"image" : "care-cards.jpg",
			"next-id" : "design-axioms",
			"healthcare-next-id" : "numera"
		},
		"design-axioms" : {
			"title" : "Design Axioms",
			"url" : "/products/design-axioms/",
			"image" : "design-axioms.jpg",
			"next-id" : "staff-plan"
		},
		"staff-plan" : {
			"title" : "StaffPlan",
			"url" : "/products/staff-plan/",
			"image" : "staff-plan.png",
			"next-id" : "paintrackr"
		},
		"paintrackr" : {
			"title" : "PainTrackr",
			"url" : "/products/paintrackr/",
			"image" : "paintrackr.jpg",
			"next-id" : "enterprise"
		}
	};

	var next = $('#next-project');
	var nextArea = $('div.next-title');
	var nextTitle = $('#next');

	var fromQuery = getUrlParameter('from');

	var pathPieces = window.location.pathname.split('/');
	var currentCat = pathPieces[1];
	var currentID = pathPieces[2];

	var nextID = fromQuery === 'healthcare' ? projects[currentID]['healthcare-next-id'] : projects[currentID]['next-id'];
	var imgURL = "../../images/clients/next-case-study/" + projects[nextID].image;

	next.css({
		"background-image": "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.5) 100%), url(" + imgURL + ")"
	});

	if(nextID === "enterprise" || nextID === "healthcare") {
		nextArea.html('See our work in <h1>' + projects[nextID].title + '</h1>');
	} else if (nextID === "products") {
		nextArea.html('See our <h1>' + projects[nextID].title + '</h1>');
	} else {
		nextTitle.html(projects[nextID].title);
	}

	next.on("click", function () {
	   window.location.href =  '../..' + projects[nextID].url;
	});

});
