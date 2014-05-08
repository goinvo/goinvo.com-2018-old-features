var userListData = [];
var social2 = "";

$(document).ready(function() {
    console.log("document  ready");
     // jQuery AJAX call for JSON
    $.getJSON( 'http://goinvo-api.herokuapp.com/users/userlist', function( data ) {
        userListData = data;
    });
    // Populate the user table on initial page load
    populateSocialMedia(25, 0);
});





// Fill table with data
function populateSocialMedia() {
    // jQuery AJAX call for JSON
    $.getJSON( 'http://goinvo-api.herokuapp.com/social/events/25/0', function( data ) {
        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            var name = "";
            var temp = this;
            var link = 'http://goinvo-api.heroku.com/social/username/' + this.username + "/" + this.type;
          
            console.log(getName(this));
            social2 += generateTableData(name, temp);
            $('#social-media').html(social2);
            $( ".social-card" ).click(function() {
                window.open(this.dataset.link,'_blank');
            });
        });
    });
}

// Fill table with data
function populateSocialMedia(listLength, offset) {
    // jQuery AJAX call for JSON
    $.getJSON( 'http://goinvo-api.herokuapp.com/social/events/' + listLength + '/' + offset, function( data ) {
        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            var name = "";
            var temp = this;
            var link = 'http://goinvo-api.herokuapp.com/social/username/' + this.username + "/" + this.type;
            
            $.when(getName(this)).then(function(name2) {
                console.log(name2);
                social2 += generateTableData(name2, temp);
            });
        });
        $('#the-studio div.content').html(social2);
        $( ".social-card" ).click(function() {
            window.open(this.dataset.link,'_blank');
        });
    });
}

function getName(data) {
    var username = data.username;
    var type = data.type;
    var name = "";
    $.each(userListData, function() {
        if(type === "twitter") {
           if(this.twitter == username){
                name = this.name;   
           }
        }
        else if(type == "flickr") {
            if(this.flickr == username){
                name = this.name;   
           }
        }
        else if (type == "github") {
            if(this.github == username){
                name = this.name;   
           }
        }
        else if (type == "soundcloud") {
            if(this.soundcloud == username){
                name = this.name;   
           }
        }
    });
    return name;
}



function generateTableData(name, data) {
      // Empty content string
    var social = "";
    var temp = "";
    var start = 0;
    var stop = 0;
    
    if(data.type == "twitter") {
        social += "<div class = 'social-card tweet' data-link = '" + data.url + "'> <p class = 'contents'>" + data.content + "</p><div class = 'avatar'>" + name+  "<br> " + data.date + "</div></div>";
    }
    else if(data.type == "flickr") {
        temp = data.content_embed;
        start = temp.indexOf("<img");
        temp = temp.substring(start);
        stop = temp.indexOf(">")+1;
        temp = temp.substring(0,stop);
        social += "<div class = 'social-card photo' data-link = '" + data.url + "'>" + temp + "<p class = 'caption'>" + data.content + "</p><div class = 'avatar'>"+ name +"<br>" + data.date + "</div></div>";
    }
    else if(data.type == "github") {
        social += "<div class = 'social-card github' data-link = '" + data.url + "'> <p class = 'contents'>" + data.content + "</p><div class = 'avatar'>" + name+"<br>" + data.date +"</div></div>";
    }
    else if(this.type === "soundcloud") {
        social += "<div class = 'social-card soundcloud' data-link = '" + data.url + "'>" + data.content_embed + "<p class = 'caption'>" + data.content +" " + data.date + "<div class = 'avatar'>"+ name + "<br>" + data.date +"</div></div>";
    }
    return social;
   
}