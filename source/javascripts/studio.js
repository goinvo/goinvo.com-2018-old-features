// This js file calls our social media api and gets our social media 25 at a time. 
// Scroll to the bottom to load the next 25 until there are none left.

var offsetNumber = 0;
var numEvents = 0;

// Combines all events' html together & pushes it to the web page
function populateSocialMedia(listLength, offset) {
    // Retrieve events & push their html to the studio page
    $.getJSON( 'http://goinvo-api.herokuapp.com/v1/social/events/' + listLength + '/' + offset, function( data ) {
        $.each(data, function(){
            numEvents++;
            $('#the-studio div.content').append(generateEventHTML(this));
        });
        $( ".social-card.photo " ).click(function() { window.open(this.dataset.link,'_blank'); }); //Makes flickr social cards links (open in new tab)
    }).done(function() { // Masonry is not initialized until after the events' html is completely loaded ---- Controls the page's grid
            $('#the-studio .content').masonry( 'reloadItems' );$('#the-studio .content').masonry( 'layout' );
            setTimeout( function() { $('#the-studio .content').masonry( 'reloadItems' );$('#the-studio .content').masonry( 'layout' );}, 100);  // I don't like doing this but I'm waiting xxxms after and then reloading the grid. This is to (hopefully ensure that the newest batch of images has been loaded [and therefore masonry can get its width and height].
    });
}

// Returns the html for an event's social-card
function generateEventHTML( data) {
    var social = "";
    var temp = "";
    var start = 0;
    var stop = 0;
    try {
    if(data.type == "twitter") {
        if(data.media_url.length > 0) {
            social += "<div class = 'social-card tweet' data-link = '" + data.url + "'> <p class = 'contents'>" + data.content + "<a href = '" + data.url + "'><img class = 'twitter-photo' src = '" + data.media_url + "'></a></p><div class = 'social-links'><img src = '../images/twitter_foot.svg'></div> <a href = '" + data.url + "' target = '_blank' class = 'social-handle'>" + "&#64;" + data.username + "<br>" +  new Date(data.date).toLocaleDateString("en-US")  + "</a><a href ='" + data.url + "'><div class = 'avatar' style = 'background-image:url(" + data.user.avatar + ")'></div></a></div>";
        }
        else {
            social += "<div class = 'social-card tweet' data-link = '" + data.url + "'> <p class = 'contents'>" + data.content + "</p><div class = 'social-links'><img src = '../images/twitter_foot.svg'></div> <a href = '" + data.url + "' target = '_blank' class = 'social-handle'>" + "&#64;" + data.username + "<br>" +  new Date(data.date).toLocaleDateString("en-US")  + "</a><a href ='" + data.url + "'><div class = 'avatar' style = 'background-image:url(" + data.user.avatar + ")'></div></a></div>";
        } 
    }
    else if(data.type == "flickr") {
        temp = data.content_embed;
        start = temp.indexOf("<img src=") +10;
        temp = temp.substring(start);
        stop = temp.indexOf("width") -2;
        temp = temp.substring(0,stop); // Remove flickr's generated html so I can do my own
        social += "<div class = 'social-card photo' data-link = '" + data.url + "' ><img class = 'flickr-photo' src = '" + temp + "' width = '100%' height = 'auto'><p class = 'caption'>" + data.content + "</p><div class = 'social-links'><img src = '../images/flickr.svg' width = '25px' height = 'auto'></div> <a href = '" + data.url + "' target = '_blank' class = 'social-handle'>&#64;" + data.username  + "<br>" +  new Date(data.date).toLocaleDateString("en-US") + "</a><a href ='" + data.url + "'><div class = 'avatar' style = 'background-image:url(" + data.user.avatar + ")'></div></a></div>";
    }
    else if(data.type == "github") {
        social += "<div class = 'social-card github' data-link = '" + data.url + "'> <p class = 'contents'>" + data.content + "</p><div class = 'social-links'><img src = '../images/github_foot.svg' width = '25px' height = 'auto'></div> <a href = '" + data.url + "' target = '_blank' class = 'social-handle'>&#64;" + data.username + "<br>" +  new Date(data.date).toLocaleDateString("en-US")  + "</a><a href ='" + data.url + "'><div class = 'avatar' style = 'background-image:url(" + data.user.avatar + ")'></div></a></div>";
    }
    else if(data.type == "soundcloud") {
        social += "<div class = 'social-card soundcloud' >" + data.content_embed + "<p class = 'contents'>" + data.content + "</p><div class = 'social-links'><img src = '../images/soundcloud_foot.svg' width = '35px' height = 'auto'></div><a href = '" + data.url + "' class = 'social-handle'>" + data.username + "<br>" + new Date(data.date).toLocaleDateString("en-US") + "</a><a href ='" + data.url + "'><div class = 'avatar' style = 'background-image:url(" + data.user.avatar + ")'></div></a></div>";
    }
    }
    catch(err){
        console.log("-------");
        console.log("Error: The following event object is throwing an error when trying to access its contents. The most likely cause is that the event was added to the event database before the event's user was added to the user database. (Note: just adding a user to the twitter list or zapier is not enough when adding a new employee. You must also add the user to the user database. If there are event objects that do not contain a user object, you must either delete the event object or add a user object following the same syntax as other events.");
        console.log(data);   
        console.log("-------");
    }
    return social;
}

$(document).ready(function() {
    // Initialize the grid
    $('#the-studio .content').masonry({
              columnWidth: '.social-card', // The width of the first card sets the column width (note: all .social-card are the same width)
              itemSelector: '.social-card',
              gutter: 0, // Use margins instead. I found that this makes the grid much more consistent
              isFitWidth: true, 
              animate: true
    });
    populateSocialMedia(25, offsetNumber);
});

// Probably doens't actually do anything. But Just a catch to make sure that the grid is reloaded after the images are
$(window).load(function() {            
    $('#the-studio .content').masonry( 'reloadItems' );
    $('#the-studio .content').masonry( 'layout' );
    $('div.loading').css("display", "none");  
    $('div.bottom').css("display", "block");
});

// Scroll all the way to the bottom and load more events!
$(function(){  
   $(window).scroll(function(){
       if($(document).height()==$(window).scrollTop()+$(window).height()){
           offsetNumber += 25;
           populateSocialMedia(25, offsetNumber);
           if(numEvents%25 != 0) {
                $('.bottom').html("You've reached the end!");   
           }
       }
   });
});