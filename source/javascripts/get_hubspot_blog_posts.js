$.ajax({
  // Maybe make this better soon
  url      : "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%20%3D%20'http%3A%2F%2Fyes.goinvo.com%2Farticles%2Frss.xml'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",
  dataType : 'json',
  success  : function (data) {
    if (data['query'] && data['query']['results']) {
      // Wow
      $.each(data['query']['results']['rss']['channel']['item'], function (i, e) {
        posts.push(e);
      });
    }

    // Grabs the first image in the blog post
    var currentString = posts[0].encoded;
    var sIndex = currentString.indexOf('<img');
    currentString = currentString.substr(sIndex + 4);
    sIndex = currentString.indexOf('src=');
    currentString = currentString.substr(sIndex + 5);
    sIndex = currentString.indexOf('"');
    currentString = currentString.substr(0, sIndex);

    // Set the recent blog post section
    $('#oracle').removeClass('bar').addClass('half');
    $('.recent-blog-post.dynamic').append('<a href="' + posts[0].link + '" id="blog" class="block bar"><div class = "photo-container"></div><div class="title"><h5 class="tag">Latest Blog Post</h5><h2>' + posts[0].title + '</h2></div></a>');
    $('#blog .photo-container').css('background-image', 'url(' + currentString + ')');

  },
  error: function(a,b,c) {
    console.log(a);
    console.log(b);
    console.log(c);
  }
});
