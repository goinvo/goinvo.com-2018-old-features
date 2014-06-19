$( document ).ready(function() {
    
    var current = document.URL;
    var projects = [
        {
            "title" : "3M",
            "image" : "3m_main.jpg"
        }, 
        {
            "title" : "Affinnova",
            "image" : "Concept_Studio_Design_v38.png"
        }, 
        {
            "title" : "Dataxu",
            "image" : "dataxu-campaign-dashboard-user-interface.png"
        }, 
        {
            "title" : "McAfee",
            "image" : "mcafee-total-protection-desktop-app-design.jpg"
        }, 
        {
            "title" : "Numera",
            "image" :  "numera-iphone.jpg"
        }, 
        {
            "title" : "Ruelala",
            "image" : "ruelala_calendar_4d.jpg"
        }
    ];


    var next = $('#next-project');
    var nextTitle = $('div.next-title span');

    var index = 0;
    var imgURL = "";
    console.log(current);
    
    if(current.indexOf("3m") >= 0) {
        index = 1;
    }
    else if(current.indexOf("affinnova") >= 0) {
       index = 2;
    }
    else if(current.indexOf("dataxu") >= 0) {
        index = 3;
    }
    else if(current.indexOf("mcafee") >= 0) {
        index = 4;
    }
    else if(current.indexOf("numera") >= 0) {
        index = 5;
    }
    else {
        index = -1; 
    }
    
    if(index > 0) {
        console.log(index);
        imgURL = "/goinvo-temp/images/clients/" + projects[index].title.toLowerCase() + "/" + projects[index].image;
        
        next.css("background", "linear-gradient(to bottom, rgba(2,0,0,0.32) 0%,rgba(2,0,0,0.32) 12%,rgba(0,0,0,0.32) 100%), url(" + imgURL + ")");
        next.css("background-size", "cover");
        next.on("click", function () {
               window.location.href ="http://code.goinvo.com/goinvo-temp/clients/" + projects[index].title.toLowerCase();
        });
        nextTitle.html(projects[index].title);
    }
    else {
        next.html("");   
    }
    
    
    Mousetrap.bind('left', function () {
        var l = getIndex();
        if(l >= 0 && l <= 5){
            l = l -1;   
        }
        if(l >= 0 && l <= 5){
            var url = "http://code.goinvo.com/goinvo-temp/clients/" + projects[l].title.toLowerCase();
            window.location.href = url;
        }
    });

    Mousetrap.bind('right', function () {
        var l = getIndex();
        if(l >= 0 && l <= 5){
            l = l +1;   
        }
        if(l >= 0 && l <= 5){
            var url = "http://code.goinvo.com/goinvo-temp/clients/" + projects[l].title.toLowerCase();
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
    else if(current.indexOf("affinnova") >= 0) {
       index2 = 1;
    }
    else if(current.indexOf("dataxu") >= 0) {
        index2 = 2;
    }
    else if(current.indexOf("mcafee") >= 0) {
        index2 = 3;
    }
    else if(current.indexOf("numera") >= 0) {
        index2 = 4;
    }
    else if(current.indexOf("ruelala") >= 0) {
        index2 = 5;
    }
    else {
        index2 = -1; 
    }
    
    return index2;
}