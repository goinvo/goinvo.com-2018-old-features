$(document).ready(function(){

  var myWindow = d3.select(window);  
  var w =  document.documentElement.clientWidth * .7;
  var whRatio = 5/9.6;
  var h = whRatio * w;

  var margin = {top: 20, right: 50, bottom: 60, left: 70},
      width = w - margin.left - margin.right,
      height = h - margin.top - margin.bottom;

  var x = d3.scale.linear().range([0, width]);

  var y = d3.scale.linear().range([height, 0]);
  
  var rScale = d3.scale.linear().range([3,15]);

  var svg = d3.select("#gdp-vs-capita-chart").append("svg");
  
  svg.attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);
  
  var svgWrapper =  svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .tickSize(-(height+margin.top*2))
      .outerTickSize(0);

  var yAxis = d3.svg.axis()
      .scale(y)
      .tickSize(-width)
      .orient("left");

  var tooltip = d3.select("#gdp-vs-capita-chart").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);
  
  var xAxisG, xAxisText, yAxisG, yAxisText, points;

  var initialTransition = function() {
    points.transition()
      .duration(350)
      .ease('radial')
      .attr("r", function(d) {
        return rScale(d.population);
      });
  }

  d3.csv("/features/us-healthcare/data/gdpvcapita.csv", function(error, data){
      if (error) throw error;

      data.forEach(function(d) {
          name = name; 
          d.capita = +d.capita;
          d.gdp = +d.gdp;
          d.population = +d.population;
      });

      x.domain(d3.extent(data, function(d) { return d.gdp; }));
      y.domain(d3.extent(data, function(d) { return d.capita; }));
      rScale.domain(d3.extent(data, function(d) { return d.population;}));

      xAxisG = svgWrapper.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height + 20) + ")"); //adds padding for x axis
    
      xAxisG.call(xAxis);
    
      xAxisText = xAxisG.append("text");
    
      xAxisText.attr("x", width/2)
          .attr("y","40")
          .attr("dx", ".71em")
          .attr("dy", "-.71em")
          .style("text-anchor", "middle")
          .text("% GDP");

      yAxisG = svgWrapper.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(-10,0)"); //adds padding for y axis
    
       yAxisG.call(yAxis);
          
    yAxisText = yAxisG.append("text");
    
    yAxisText.attr("transform", "rotate(-90)")
      .attr("y", "-50")
      .attr("x", -height/2)
      .attr("dy", ".71em")
      .style("text-anchor", "middle")
      .text("US Dollars per Capita");

      points = svgWrapper.append('g').attr('class', 'points')
        .selectAll("circle")
        .data(data)
        .enter().append("circle");
    
      points.attr("class", "dot")
        .attr("r", 0)
        .attr("cx", function(d){return x(d.gdp)})
        .attr("cy", function(d){return y(d.capita)})
        .attr("fill", "#004363")
        .on("mouseover", function(d){
        
            d3.select(this)
              .style("r", (2+rScale(d.population)))
              .style("fill", "#D9C6E1");
        
            tooltip.transition()
                .duration(200)
                .style("opacity", 1);
        
            tooltip.html("<b>" + d.name + "</b>" + "<br/>" + "US Dollars / Capita: " + d.capita + "<br/>" + "% GDP: " + d.gdp + "<br/>" + "Population: " + d3.format(",")(d.population))
                .style("left", (d3.event.pageX + 5) + "px")
                .style("top", (d3.event.pageY + 5) + "px");
        })
      
        .on("mouseout", function(d) {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
             
            points.style("r", null)
                .style("fill", null)
                .style("opacity", null);
          })
  });
    
  var initializeSizes = function() {
     w =  document.documentElement.clientWidth * .7;
     h = whRatio * w;
     width = w - margin.left - margin.right;
     height = h - margin.top - margin.bottom;
    
    svg.attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);
      
     x.range([0, width]);
     y.range([height, 0]);
    
     xAxis.scale(x).tickSize(-(height+margin.top*2));
     yAxis.scale(y).tickSize(-width);
    
    xAxisG.call(xAxis);
    yAxisG.call(yAxis);
    
    xAxisG.attr("transform", "translate(0," + (height + 25) + ")");
    xAxisText.attr("x", width/2)
    yAxisText.attr("x", -height/2)

    points.attr("cx", function(d){return x(d.gdp)})
      .attr("cy", function(d){return y(d.capita)})
    
  }
  
  myWindow.on('resize.gdpv', initializeSizes );
 
  
  $('li[data-tab="tab-2"]').click(function() {
    initialTransition();
    haveWeInitializedYet = true;
  });
  $('li[data-tab="tab-1"]').click(function() {
    points.attr("r", 0);
  });
  $('li[data-tab="tab-3"]').click(function() {
    points.attr("r", 0);
  });
//  var haveWeInitializedYet = false;
//  $(window).on('scroll', function(i) {
//    if(!haveWeInitializedYet) {
//      var currentScrollTop = $(this).scrollTop();
//      var targetScrollTop = $('#gdp-vs-capita-chart').position().top;
//      if(currentScrollTop > targetScrollTop - 200 && currentScrollTop < targetScrollTop + 200) {
//        initialTransition();
//        haveWeInitializedYet  = true;
//      }
//    }
//  });
//  
  
});