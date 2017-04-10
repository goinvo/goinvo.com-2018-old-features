function getHubspotBlogPosts(callback) {
  $.ajax({
    dataType : 'xml',
    url      : 'http://yes.goinvo.com/articles/rss.xml',
    success  : function (data) {
      var posts = [];

      $(data).find('item').each(function(i, post) {
        posts.push({
          title: $(post).find('title').text(),
          link: $(post).find('guid').text(), // For some reason the 'link' tag won't cooperate here, guid seems to be the same
          imageUrl: findFirstBlogPostImage(post)
        });
      });
      callback(posts);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
    }
  });
}
function findFirstBlogPostImage(post) {
  var currentString = $(post).text();
  var sIndex = currentString.indexOf('<img');
  currentString = currentString.substr(sIndex + 4);
  sIndex = currentString.indexOf('src=');
  currentString = currentString.substr(sIndex + 5);
  sIndex = currentString.indexOf('"');
  currentString = currentString.substr(0, sIndex);
  return currentString;
}
