function getHubspotBlogPosts(callback) {
  $.ajax({
    // Perhaps we can move away from this yahoo api at some point
    url      : "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%20%3D%20'http%3A%2F%2Fyes.goinvo.com%2Farticles%2Frss.xml'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",
    dataType : 'json',
    success  : function (data) {
      if (data && data.query && data.query.results) {
        callback(data.query.results.rss.channel.item);
      } else {
        callback(null);
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
    }
  });
}
