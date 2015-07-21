$(document).ready(function(){

  var myWindow = d3.select(window);  
  var w =  document.documentElement.clientWidth * .7;
  var whRatio = 5/9.6;
  var h = whRatio * w;

  var margin = {top: 20, right: 50, bottom: 30, left: 50},
      width = w - margin.left - margin.right,
      height = h - margin.top - margin.bottom;

  var x = d3.scale.linear().range([0, width]);

  var y = d3.scale.linear().range([height, 0]);

  var svg = d3.select("#gdp-vs-capita-chart").append("svg");
  
  svg.attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);
  
  var svgWrapper =  svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  var tooltip = d3.select("#gdp-vs-capita-chart").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);
  
  var xAxisG, xAxisText, yAxisG, yAxisText, points;

  d3.csv("/features/us-healthcare/data/gdpvcapita.csv", function(error, data){
      if (error) throw error;

      data.forEach(function(d) {
          name = name; 
          d.capita = +d.capita;
          d.gdp = +d.gdp;
      });

      x.domain(d3.extent(data, function(d) { return d.gdp; }));
      y.domain(d3.extent(data, function(d) { return d.capita; }));

      xAxisG = svgWrapper.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")");
    
      xAxisG.call(xAxis);
    
      xAxisText = xAxisG.append("text");
    
      xAxisText .attr("x", width)
          .attr("dx", ".71em")
          .attr("dy", "-.71em")
          .style("text-anchor", "end")
          .text("% GDP");

      yAxisG = svgWrapper.append("g")
        .attr("class", "y axis");
    
       yAxisG.call(yAxis);
          
    yAxisText = yAxisG.append("text");
    
    yAxisText.attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("US Dollars per Capita");

      points = svgWrapper.append('g').attr('class', 'points')
        .selectAll("circle")
        .data(data)
        .enter().append("circle");
    
      points.attr("class", "dot")
        .attr("r", 4)
        .attr("cx", function(d){return x(d.gdp)})
        .attr("cy", function(d){return y(d.capita)})
        .attr("fill", "#004363")
        .on("mouseover", function(d){
        
            d3.select(this)
              .style("r", 6)
              .style("fill", "#D9C6E1");
        
            tooltip.transition()
                .duration(200)
                .style("opacity", 1);
        
            tooltip.html("<b>" + d.name + "</b>" + "<br/>" + "US Dollars / Capita: " + d.capita + "<br/>" + "% GDP: " + d.gdp )
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
    
     xAxis.scale(x);
     yAxis.scale(y);
    
    xAxisG.call(xAxis);
    yAxisG.call(yAxis);
    
    xAxisG.attr("transform", "translate(0," + height + ")");
    xAxisText .attr("x", width)
    
    points.attr("cx", function(d){return x(d.gdp)})
      .attr("cy", function(d){return y(d.capita)})
    
  }
  
  myWindow.on('resize.gdpv', initializeSizes );
              

  
  
});