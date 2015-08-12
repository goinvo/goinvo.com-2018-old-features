$(document).ready(function(){

  d3.selection.prototype.trigger = function( event ) {
     var e = document.createEvent('Event');
     e.initEvent( event, true, true);
     this.node().dispatchEvent( e );
     return this;
  }
  
  var myWindow = d3.select(window);  
  var w =  window.innerWidth;
  var whRatio = 5/9.6;
  var h = window.innerHeight * .6;

  var margin = {top: 20, right: 10, bottom: 60, left: 50},
      width = w - margin.left - margin.right,
      height = h - margin.top - margin.bottom;

  var x = d3.scale.linear().range([0, width]);

  var y = d3.scale.linear().range([0, height]);
  
  var rScale = d3.scale.linear().range([5,20]);

  var svg = d3.select("#quality-vs-capita-chart").append("svg");
  
  svg.attr("width", w)
      .attr("height", h);
  
  var svgWrapper =  svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .tickSize(-(height+margin.top*2))
      .outerTickSize(0);

  var yAxis = d3.svg.axis()
      .scale(y)
      .tickSize(-(width))
      .orient("left");

  var tooltip = d3.select("#quality-vs-capita-chart").append("div")
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

  d3.csv("/features/us-healthcare/data/qualityvcapita.csv", function(error, data){
      if (error) throw error;

      data.forEach(function(d) {
          name = name; 
          d.capita = +d.capita;
          d.quality = +d.quality_ranking;
          d.population = +d.population;
      });

//      x.domain(d3.extent(data, function(d) { return d.capita; }));
      x.domain([d3.min(data, function(d) { return d.capita - 400; }), d3.max(data, function(d) { return d.capita + 400;})]);
      y.domain(d3.extent(data, function(d) { return d.quality; }));
      rScale.domain(d3.extent(data, function(d) { return d.population;}));

      xAxisG = svgWrapper.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height + 20) + ")"); //adds padding for x axis
    
      xAxisG.call(xAxis);
    
      xAxisText = xAxisG.append("text");
    
      xAxisText
          .attr("x", width/2)
          .attr("y", "40")
          .attr("dx", ".71em")
          .attr("dy", "-.71em")
          .style("text-anchor", "middle")
          .text("Dollars per Capita");

      yAxisG = svgWrapper.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(-10,0)"); //adds padding for y axis
    
       yAxisG.call(yAxis);
          
    yAxisText = yAxisG.append("text");
    
    yAxisText.attr("transform", "rotate(-90)")
      .attr("dx",".71em")
      .attr("dy", ".71em")
      .attr("x", -height/2)
      .attr("y", "-30")
      .style("text-anchor", "middle")
      .text("Overall Quality Ranking");

      points = svgWrapper.append('g').attr('class', 'points')
        .selectAll("circle")
        .data(data)
        .enter().append("circle");
    
      points.attr("class", "dotQ")
        .attr("id", function(d) {return d.name})
        .attr("r", 0)
        .attr("cx", function(d){return x(d.capita)})
        .attr("cy", function(d){return y(d.quality)})
        .attr("fill", "#9a9a9a")
        .on("mouseover", function(d){
          var circle = d3.select(this);
          var diameterOffset = 5+rScale(d.population) + margin.top + 5;
          var newX = parseFloat(circle.attr('cx')) - 30;
          var newY = parseFloat(circle.attr('cy'))  + diameterOffset;
          var ttHTML = "<strong>" + d.name + "</strong></b>" + "<div class = 'tt-important'>" + d3.format("$,")(d.capita) + "</div>per capita<br>" + "<div class = 'tt-important'>" + (d.quality) + "<sup>th</sup>" + "</div>quality rank<br>" + "<div class = 'tt-important'>"  + d3.format(",")(d.population) + "</div>population";
                
          if(newY > h/2) { // If on the bottom half of the chart, make the tooltip go above point
            newY = newY - (2*diameterOffset) - 150 - 10; 
          }
        
          circle.transition()
            .duration(250)
            .attr("r", (5+rScale(d.population)))
            .style("fill", "rgb(133, 137, 186)");
        
          tooltip.transition()
              .duration(200)
              .style("opacity", 1);
        
          tooltip.html(ttHTML)
              .style("left", newX + "px")
              .style("top", newY + "px");
        })
      
        .on("mouseout", function(d) {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
             
            points.transition()
                .duration(250)
                .attr("r", function(d,i) { return rScale(d.population); })
                .style("fill", null)
                .style("opacity", null);
          })
  });
  
    
  var initializeSizes = function() {
     w = window.innerWidth;
     h = window.innerHeight * .6;
     width = w - margin.left - margin.right;
     height = h - margin.top - margin.bottom;
    
    svg.attr("width", w)
      .attr("height", h);
      
     x.range([0, width]);
     y.range([0,height]);
    
     xAxis.scale(x).tickSize(-(height+margin.top*2));
     yAxis.scale(y).tickSize(-width);
    
    xAxisG.call(xAxis);
    yAxisG.call(yAxis);
    
    xAxisG.attr("transform", "translate(0," + (height + 25) + ")");
    xAxisText.attr("x", width/2)
    yAxisText.attr("x", -height/2)


    points.attr("cx", function(d){return x(d.capita)})
      .attr("cy", function(d){return y(d.quality)})
    
  }
  
  myWindow.on('resize.qvc', initializeSizes );
 
  
  $('.tab-link[data-tab="tab-2"]').click(function() {
    points.attr("r", 0);
  });
  $('.tab-link[data-tab="tab-1"]').click(function() {
    points.attr("r", 0);
  });
  $('.tab-link[data-tab="tab-3"]').click(function() {
    d3.select('[id="United States"].dotQ').trigger('mouseover');
    initialTransition();
    haveWeInitializedYet = true;
  });
  
});