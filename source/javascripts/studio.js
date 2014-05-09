var userListData = [];
var social2 = "";




// Fill table with data
function populateSocialMedia() {
    // jQuery AJAX call for JSON
    $.getJSON( 'http://goinvo-api.herokuapp.com/social/events/25/0', function( data ) {
        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            var name = "";
            var temp = this;

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
            
            $.when(getName(this)).then(function(name2) {
                console.log(name2);
                social2 += generateTableData(name2, temp);
            });
        });
        $('#the-studio div.content').html(social2);
        $( ".social-card" ).click(function() {
            window.open(this.dataset.link,'_blank');
        });
    }).done(function() {
        $('.social-card').click(function(){
              window.location = $(this).data('link');
            });

            $('#the-studio .content').masonry({
              columnWidth: '.social-card.photo',
              itemSelector: '.social-card',
              gutter: 0,
              isFitWidth: true, 
              animate: true
            });
    });
}

function getName(data) {
    var username = data.username;
    var type = data.type;
    var name = data;
    console.log(userListData);
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



function generateTableData(user, data) {
      // Empty content string
    var social = "";
    var temp = "";
    var start = 0;
    var stop = 0;
    console.log(user);
    if(data.type == "twitter") {
        social += "<div class = 'social-card tweet' data-link = '" + data.url + "'> <p class = 'contents'>" + data.content + "</p><div class = 'avatar'>" + user.avatar+  "<br> " + data.date + "</div></div>";
    }
    else if(data.type == "flickr") {
        temp = data.content_embed;
        start = temp.indexOf("<img");
        temp = temp.substring(start);
        stop = temp.indexOf(">")+1;
        temp = temp.substring(0,stop);
        social += "<div class = 'social-card photo' data-link = '" + data.url + "'>" + temp + "<p class = 'caption'>" + data.content + "</p><div class = 'avatar'>"+ user.avatar +"<br>" + data.date + "</div></div>";
    }
    else if(data.type == "github") {
        social += "<div class = 'social-card github' data-link = '" + data.url + "'> <p class = 'contents'>" + data.content + "</p><div class = 'avatar'>" + user.avatar+"<br>" + data.date +"</div></div>";
    }
    else if(this.type === "soundcloud") {
        social += "<div class = 'social-card soundcloud' data-link = '" + data.url + "'>" + data.content_embed + "<p class = 'caption'>" + data.content +" " + data.date + "<div class = 'avatar'>"+ user.avatar + "<br>" + data.date +"</div></div>";
    }
    return social;
   
}

$(document).ready(function() {
    console.log("document  ready");
     // jQuery AJAX call for JSON
    
    $.getJSON( 'http://goinvo-api.herokuapp.com/users/userlist', function( data ) { userListData = data;}).done(function() {
       populateSocialMedia(25, 0)
    });
});