$(document).ready(function(){

    d3.selection.prototype.trigger = function( event ) {
       var e = document.createEvent('Event');
       e.initEvent( event, true, true);
       this.node().dispatchEvent( e );
       return this;
    }
    
    var myWindow = d3.select(window);
    var w = window.innerWidth;
    var whRatio = 5/9.6;
    var h = window.innerHeight * .6;

    var margin = {top: 10, right: 20, bottom: 30, left: 60},
        width = w - margin.left - margin.right,
        height = h - margin.top - margin.bottom;

    var parseDate = d3.time.format("%Y").parse;

    var formatDate = d3.time.format("%Y");

    var x = d3.time.scale()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var color = d3.scale.category10();
    var country, point;

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickSize(-(height+margin.top*2));

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickSize(-width);

    var line = d3.svg.line()
        .interpolate("cardinal")
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.capita); })
        .defined(function(d) { return d.capita != null;});
    
    // EXTREMELY BAD VARIABLE NAME. DIV TELLS ME ABOSOLUTELY NOTHING ABOUT WHAT THIS CONTAINS AND IT CAN BE CONFUSED WITH SELECTORS *******
    var div = d3.select("#spending-capita-chart").append("div")   
        .attr("class", "tooltip")
        .style("opacity", 0)
        .style("left", width - (width/2) + "px")
        .style("top", height - (height/2)  -30 + "px");

    var svg = d3.select("#spending-capita-chart").append("svg");
    
    svg.attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    
    var svgWrapper = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var xAxisG, yAxisG, yAxisText, country, countries, path;
    
    d3.csv("/features/us-healthcare/data/data_capita.csv", function(error, data) {
      if (error) throw error;

      color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));

      data.forEach(function(d) {
        d.date = parseDate(d.date);
      });


      var countries = color.domain().map(function(name) {
        return {
          name: name,
          values: data.map(function(d) {
            return {name: name, date: d.date, capita: +d[name] || null };
          })
        };
      });

//      x.domain(d3.extent(data, function(d) { 
//        return d.date; }));
      x.domain([d3.min(data, function(d) { return d.date; }), d3.max(data, function(d) { return d.date;})]);


      y.domain([
        d3.min(countries, function(c) { 
          return d3.min(c.values, function(v) { 
            return v.capita; }); }),
        d3.max(countries, function(c) { return d3.max(c.values, function(v) { return v.capita; }); })
      ]);
        

      
      xAxisG = svgWrapper.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + (height + 10) + ")");
    
      xAxisG.call(xAxis);

      yAxisG = svgWrapper.append("g")
          .attr("class", "y axis");
      
      yAxisG.call(yAxis);
        
      yAxisText = yAxisG.append("text");
        
      yAxisText.attr("transform", "rotate(-90)")
          .attr("y", "-50")
          .attr("x", -height/2)
          .attr("dy", ".71em")
          .style("text-anchor", "middle")
          .text("Dollars per Capita");

      country = svgWrapper.selectAll(".country")
          .data(countries)
        .enter().append("g")
          .attr("class", "country")

      country.append("path")
          .attr("class", "line")
          .attr("d", function(d) { return line(d.values); })
          .style("stroke", "#9a9a9a");

      country.append("path")
          .attr("class", "invisible hover")
          .attr("d", function(d) { return line(d.values); });
		
//	  svg.append("text")
//	  	  .attr("x", function(d) {
//			  return 50;
//	  	  })
//	  	  .attr("y", 50)
//	      .text("TEST TEST");
		
      point = country.append("g")
        .attr("class", "linepoint")

      point.selectAll("circle")
		  .data(function(d) { return d.values })
		  .enter().append("circle")
      .attr("id", function(d) { return d.name })
      .attr("id", function(d) { return d.date })
		  .attr("cx", function(d) { return x(d.date)})
		  .attr("cy", function(d) { return y(d.capita)})
		  .attr("r", function(d) { return d.capita == null ? 0: 3})
		  .style("fill", "#9a9a9a")
      
      .on("mouseover", function(d) {
        var me = d3.select(this);
        me.attr("r", 10)
          .style("fill", "rgb(133, 137, 186)");
        
        d3.selectAll(".linepoint")
          .style("opacity", 0)
          .filter(function(p) { return p.name == d.name; })
          .style("opacity", 1)
        d3.selectAll(".line")
          .style("opacity", 0.3)
          .filter(function(p) { return p.name == d.name; })
          .style("opacity", 1)
          .style("stroke-width", 3)
        
      
        //tooltip
        d3.select(this)
        var circle = $(this)
        div.transition()
          .duration(200)
          .style("opacity", 1);
        div.html("<strong>" + d.name + "</strong><br>" + formatDate(d.date) + "<div class = 'tt-important'>" + d3.format("$,")(d.capita) + "</div>per capita" )
          .style("left", parseFloat(circle.attr('cx')) - 40 + "px")
          .style("top", parseFloat(circle.attr('cy')) + 25 + "px");
      })
      
      .on("mouseout", function(d) {
        var me = d3.select(this);
        me.attr("r", 3)
          .style("fill", "#9a9a9a");
        div.transition()
          .duration(500)
          .style("opacity", 0)
      });
      

      country.selectAll(".hover")
        .data(function(d) { return d.values})
        .on("mouseover", function(d) {
          d3.selectAll(".linepoint")
            .style("opacity", 0)
            .filter(function(p) { return p.name == d.name; })
            .style("opacity", 1)
          d3.selectAll(".line")
            .style("opacity", 0.3)
            .filter(function(p) { return p.name == d.name; })
            .style("opacity", 1)
            .style("stroke-width", 3)
//          div.transition()
//            .duration(200)
//            .style("opacity", 1);
//          div.html(d.name)
//            .style("left", (d3.event.pageX + 5) + "px")
//            .style("top", (d3.event.pageY + 5) + "px");

        })
        .on("mouseout", function(d){
          d3.selectAll(".line")
            .style("opacity", 1)
            .style("stroke-width", null)
          d3.selectAll(".linepoint")
            .style("opacity", 0)
//          div.transition()
//            .duration(500)
//            .style("opacity", 0)
        })
    });
    
  var initializeSizes = function() {
     w = window.innerWidth;
     h = window.innerHeight * .6;
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
    
    xAxisG.attr("transform", "translate(0," + height + ")");
    yAxisText.attr("x", -height/2);
    country.selectAll('.line').attr("d", function(d) { return line(d.values); })
    point.selectAll('circle').attr("cx", function(d) { return x(d.date)})
      .attr("cy", function(d) { return y(d.capita)})
      .attr("r", function(d) { return d.capita == null ? 0: 3})
  }

  myWindow.on('resize.capita', initializeSizes );
  setTimeout( function() {
    
    // Why are you doing this? You should probably not be doing this... this also causes the tooltip to be 
    // visible when the graph loads.
    d3.select('[id="Tue Jan 01 2013 00:00:00 GMT-0500 (EST)"]').trigger('mouseover');  }, 1000);
    
    

});
