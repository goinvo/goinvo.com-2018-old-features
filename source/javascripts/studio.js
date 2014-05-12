var offsetNumber = 0;
var numEvents = 0;

// Combines all events' html together & pushes it to the web page
function populateSocialMedia(listLength, offset) {
    $.getJSON( 'http://goinvo-api.herokuapp.com/v1/social/events/' + listLength + '/' + offset, function( data ) {
        
        // Aggregate html for all events to be displayed
        $.each(data, function(){
            numEvents++;
            var temp = this;
            $.when(getUser(this)).then(function(user2) {
                $('#the-studio div.content').append(generateEventHTML(temp));
            }); //Make sure that we have the user before generating html
        });
        $( ".social-card.photo, .social-card.tweet, .social-card.github " ).click(function() { window.open(this.dataset.link,'_blank'); }); //Makes all social cards links (open in new tab)
        
    }).done(function() { //Masonry is not initialized until after the events' html is completely loaded ---- Controls the page's grid
            
        $('#the-studio .content').masonry({
              columnWidth: '.social-card', //The width of the first card sets the column width (note: all .social-card are the same width)
              itemSelector: '.social-card',
              gutter: 0, //Use margins instead. I found that this makes the grid much more consistent
              isFitWidth: true, 
              animate: true
            });
        $('#the-studio .content').masonry( 'reloadItems' );
        $('#the-studio .content').masonry( 'layout' );
    });
}

//returns the user who the event belongs to
function getUser(data) {
    var username = data.username;
    var type = data.type;
    var name = data;
  
    return data.user.name;
}


//Returns the html for an event's social-card
function generateEventHTML( data) {
    var social = "";
    var temp = "";
    var start = 0;
    var stop = 0;
    
    if(data.type == "twitter") {
        social += "<div class = 'social-card tweet' data-link = '" + data.url + "'> <p class = 'contents'>" + data.content + "</p><div class = 'avatar' style = 'background-image:url(" + data.user.avatar + ")'></div></div>";
    }
    else if(data.type == "flickr") {
        temp = data.content_embed;
        start = temp.indexOf("<img src=") +10;
        temp = temp.substring(start);
        stop = temp.indexOf("width") -2;
        temp = temp.substring(0,stop);
        social += "<div class = 'social-card photo'  style = 'background-image:url(" + temp + ")' data-link = '" + data.url + "' ><p class = 'caption'>" + data.content + "</p><div class = 'avatar' style = 'background-image:url(" + data.user.avatar + ")'></div></div>";
    }
    else if(data.type == "github") {
        social += "<div class = 'social-card github' data-link = '" + data.url + "'> <p class = 'contents'>" + data.content + "</p><div class = 'avatar' style = 'background-image:url(" + data.user.avatar + ")'></div></div>";
    }
    else if(data.type == "soundcloud") {
        social += "<div class = 'social-card soundcloud' >" + data.content_embed + "<p class = 'contents'>" + data.content + "<div class = 'avatar' style = 'background-image:url(" + data.user.avatar + ")'></div></div>";
    }
    return social;
}

$(document).ready(function() {
    //Get the list of users & save it to a global variable, then populate the social media
    $.getJSON( 'http://goinvo-api.herokuapp.com/v1/users/userlist', function( data ) { }).done(function() {
       populateSocialMedia(25, offsetNumber)
    });
});

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