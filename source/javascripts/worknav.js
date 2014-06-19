var current = document.URL;
var projects = [
    {
        "title" : "3m",
        "image" : "3m_main.jpg"
    }, 
    {
        "title" : "affinova",
        "image" : "Concept_Studio_Design_v38.png"
    }, 
    {
        "title" : "dataxu",
        "image" : "dataxu-campaign-dashboard-user-interface.png"
    }, 
    {
        "title" : "mcafee",
        "image" : "mcafee-total-protection-desktop-app-design.jpg"
    }, 
    {
        "title" : "numera",
        "image" :  "numera-iphone.jpg"
    }, 
    {
        "title" : "ruelala",
        "image" : "ruelala_calendar_4d.jpg"
    }
];
    
    
var next = $('row#next-project');

var sIndex = current.indexOf("/clients/") + 9;
current = current.substring(9);