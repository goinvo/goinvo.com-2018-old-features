var userListData = [];
var social2 = "";


// Combines all events' html together & pushes it to the web page
function populateSocialMedia(listLength, offset) {
    $.getJSON( 'http://goinvo-api.herokuapp.com/social/events/' + listLength + '/' + offset, function( data ) {
        // Aggregate html for all events to be displayed
        $.each(data, function(){
            var temp = this;
            $.when(getUser(this)).then(function(user2) {social2 += generateEventHTML(user2, temp);}); //Make sure that we have the user before generating html
        });
        $('#the-studio div.content').html(social2);
    
        $( ".social-card.photo, .social-card.tweet, .social-card.github " ).click(function() { window.open(this.dataset.link,'_blank'); }); //Makes all social cards links (open in new tab)
        
    }).done(function() { //Masonry is not initialized until after the events' html is completely loaded ---- Controls the page's grid
            $('#the-studio .content').masonry({
              columnWidth: '.social-card.photo', //The width of the first card sets the column width (note: all .social-card are the same width)
              itemSelector: '.social-card',
              gutter: 0, //Use margins instead. I found that this makes the grid much more consistent
              isFitWidth: true, 
              animate: true
            });
    });
}

//returns the user who the event belongs to
function getUser(data) {
    var username = data.username;
    var type = data.type;
    var name = data;
    $.each(userListData, function() {
        if(type === "twitter") {
           if(this.twitter == username){
                name = this;   
           }
        }
        else if(type == "flickr") {
            if(this.flickr == username){
                name = this;   
           }
        }
        else if (type == "github") {
            if(this.github == username){
                name = this;   
           }
        }
        else if (type == "soundcloud") {
            if(this.soundcloud == username){
                name = this;   
           }
        }
    });
    return name;
}


//Returns the html for an event's social-card
function generateEventHTML(user, data) {
    var social = "";
    var temp = "";
    var start = 0;
    var stop = 0;
    
    if(data.type == "twitter") {
        social += "<div class = 'social-card tweet' data-link = '" + data.url + "'> <p class = 'contents'>" + data.content + "</p><div class = 'avatar' style = 'background-image:url(" + user.avatar + ")'></div></div>";
    }
    else if(data.type == "flickr") {
        temp = data.content_embed;
        start = temp.indexOf("<img src=") +10;
        temp = temp.substring(start);
        stop = temp.indexOf("width") -2;
        temp = temp.substring(0,stop);
        
        social += "<div class = 'social-card photo'  style = 'background-image:url(" + temp + ")' data-link = '" + data.url + "' ><p class = 'caption'>" + data.content + "</p><div class = 'avatar' style = 'background-image:url(" + user.avatar + ")'></div></div>";
    }
    else if(data.type == "github") {
        social += "<div class = 'social-card github' data-link = '" + data.url + "'> <p class = 'contents'>" + data.content + "</p><div class = 'avatar' style = 'background-image:url(" + user.avatar + ")'></div></div>";
    }
    else if(data.type == "soundcloud") {
        social += "<div class = 'social-card soundcloud' >" + data.content_embed + "<p class = 'contents'>" + data.content + "<div class = 'avatar' style = 'background-image:url(" + user.avatar + ")'></div></div>";
    }
    return social;
}

$(document).ready(function() {
    //Get the list of users & save it to a global variable, then populate the social media
    $.getJSON( 'http://goinvo-api.herokuapp.com/users/userlist', function( data ) { userListData = data;}).done(function() {
       populateSocialMedia(25, 0)
    });
});