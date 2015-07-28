$( document ).ready(function() {

    
var myWindow = d3.select(window);
    
//var windowW = window.innerWidth;
//var windowH = window.innerHeight;
var elementW = window.innerWidth;
var elementH = window.innerHeight;
var margin = {top: 20, right: 30, bottom: 50, left: 30},
    w = .95*elementW - margin.left,
    h = elementH * .65;


var xScale = d3.scale.ordinal()
    //.domain(d3.range(dataset.length))   // range creates [0, 1,...length(dataset)]
    .rangeRoundBands([30, w], 0.2); // .05 for spacing between bars

var yScale = d3.scale.log()      // Unnecessary
    //.domain([1, d3.max(dataset)])
    .range([h+5, 5]);

var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left")
    .tickFormat(function (d) {
        return yScale.tickFormat(4,d3.format("s"))(d)
    })
    .tickSize(-w);

var tooltip = d3.select('#waste-chart')            // NEW 
  .append('div')
  .attr('class', 'tooltip');

var wasteSVG = d3.select("#waste-chart")
    .append("svg");
    
wasteSVG
    .attr("width", w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom);

function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        wordNumber = 0;
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
    while (word = words.pop()) {
      line.push(word);
        wordNumber++;
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width && wordNumber != 1) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
      }
    }
  });
}
  
  var annotation;
  var rectangles;
  
  var initialTransition = function() {
    rectangles.transition()
      .duration(350)
      .ease('linear')
      .attr("height", function(d) {
        return h - yScale(d.NumberProcedures);
      })
      .attr("y", function(d) {
        return yScale(d.NumberProcedures);
      })
      .style("fill", function(d) {
           if (d.Waste  > 4000000000) {return "rgb(138, 197, 255)"}
           else {return "darken(#E0E0E0,10%)"}
       ;})
  }

d3.csv("/features/us-healthcare/data/data-waste.csv", function(error, data) {
    var maxProcedures = d3.max(data, function(d) {
     return parseInt(d.NumberProcedures);
    });
    var maxWaste = d3.max(data, function(d) {
     return parseInt(d.Waste);
    });
    var maxUnnecessary = d3.max(data, function(d) {
     return parseInt(d.Unnecessary);
    });

    xScale.domain(data.map(function(d) { return d.Procedure;}));
    yScale.domain([1, maxProcedures]);
    

     annotation = d3.select('#waste-chart')
        .data(data).enter()
        .append("div")
        .attr('class','annotation')
        .style("left", function(d) {
          console.log(d);
          console.log("start: " + xScale(d.Procedure))
          return xScale(d.Procedure)+'px';
        })
        .style('bottom', function(d) {
          console.log(d);
          console.log("start: " + yScale(d.NumberProcedures))
          return h - yScale(d.NumberProcedures) - $('#waste-container').position().top + 'px';
        })
        .html("Brand-name statins waste " + "<b>" + "$5 billion" + "</b>" + " annually.")
     
     wasteSVG.append("line")
        .style("stroke", "rgba(159, 184, 206, 0.9)")  // colour the line
        .style("stroke-width", "3")
        .attr("x1", function() {
          return xScale(data[2].Procedure)+ 10+'px';
        })     // x position of the first end of the line
        .attr("y1", function() {
            return yScale(data[2].NumberProcedures)+'px'
        })      // y position of the first end of the line
        .attr("x2", function() {
          return xScale(data[2].Procedure) + 30 +'px';
        })     // x position of the second end of the line
        .attr("y2", 54); 

    wasteSVG.append("g")
        .attr("class", "xaxis")
        .attr("transform", "translate(0," + h + ")")
        .call(xAxis)
        .selectAll(".tick text")
        .call(wrap, xScale.rangeBand());

    var myAxis = wasteSVG.append("g")
        .attr("class", "yaxis")
        .call(yAxis)
        .attr()
        .style("fill", "black")
        .attr('transform', 'translate(30,0)')

    var myPoints = wasteSVG.selectAll(".point")
        .data(data).enter()
        .append("g");

    rectangles = myPoints.append("rect")
        .attr("class", "bar")
        .attr("x", function(d, i) {
           // make sure there are no spaces in the csv file or it won't parse
            return xScale(d.Procedure);
        })
        .attr("width", xScale.rangeBand())
        .attr("y", function(d) {
                return h - 10;
            })
        .attr("height", function(d) {
            return 10;
        });

    rectangles.on('mousemove', function(d) {
        tooltip.style('display', 'block');
        d3.select(this)
                .style("fill", "rgb(138, 197, 255)")
            tooltip.transition()
                .duration(200)
                .style("opacity", 1)
            tooltip.html("<b>" + d.Procedure + "</b>" + "<br>" + "Percent Nonrecommended: "+ d3.format("%")(d.Unnecessary/d.NumberProcedures) + "<br>" + "Dollars Wasted: " + d3.format("$,")(d.Waste))
                .style("top", (event.pageY + 8) + "px")
                .style("left", (event.pageX + 8) + "px");
    });
    rectangles.on('mouseout', function() {
        tooltip.style('display', 'none');
        d3.select(this).style('fill', null);
    });


// Toggle between datasets


    d3.select("#totalProcedures")
    .on("click", function() {
        yScale.domain([1, maxProcedures]);

        rectangles.transition()
            .duration(350)
            .delay(50)
            .ease('sin-in-out')
            .attr("y", function(d, i) {
                return yScale(d.NumberProcedures);
            })
            .attr("height", function(d, i) {
                return h - yScale(d.NumberProcedures);
            });
        wasteSVG.select(".yaxis")
            .transition().duration(350)
            .delay(50)
            .ease('sin-in-out')
            .call(yAxis)
    });

  d3.select("#unnecessaryProcedures")
    .on("click", function() {
        yScale.domain([1, maxUnnecessary]);

        rectangles.transition()
            .duration(350)
            .delay(50)
            .ease('sin-in-out')
            .attr("y", function(d) {
                return yScale(d.Unnecessary);
            })
            .attr("height", function(d) {
                return h - yScale(d.Unnecessary);
            });
        wasteSVG.select(".yaxis")
            .transition().duration(350)
            .delay(50)
            .ease('sin-in-out')
            .call(yAxis)
    });


  d3.select("#dollarsWasted").on("click", function() {
    yScale.domain([1, maxWaste]);

    rectangles.transition()
        .duration(350)
        .delay(50)
        .ease('sin-in-out')
        .attr("y", function(d) {
            return yScale(d.Waste);
        })
        .attr("height", function(d) {
            return h - yScale(d.Waste);
        });
    wasteSVG.select(".yaxis")
        .transition().duration(350)
        .delay(50)
        .ease('sin-in-out')
        .call(yAxis)
    });

});


myWindow.on('resize.waste', function() {
    elementW = window.innerWidth;
    elementH = window.innerHeight;
    w = .95*elementW - margin.left,
    h = elementH * .65; 

    xScale.rangeRoundBands([30, w], 0.2);
    yScale.range([h+5, 5]);
    xAxis.scale(xScale);
    yAxis.scale(yScale)
      .tickFormat(function (d) {
        return yScale.tickFormat(4,d3.format("s"))(d)
        })
      .tickSize(-w);

    
    wasteSVG
        .attr("width", w + margin.left + margin.right)
        .attr("height", h + margin.top + margin.bottom)
        
    wasteSVG
        .select('.xaxis')
            .attr("transform", "translate(0," + h + ")")
            .call(xAxis)
        .selectAll(".xaxis .tick text")
            .call(wrap, xScale.rangeBand());
  
    wasteSVG
        .select('.yaxis')
        .call(yAxis)

    
    rectangles
        .attr("width", xScale.rangeBand())
        .attr("x", function(d, i) {
          console.log(xScale(d.Procedure))
          return xScale(d.Procedure);
        })
        .attr("width", xScale.rangeBand())
        .attr("height", function(d) {
        return h - yScale(d.NumberProcedures);
        })
        .attr("y", function(d) {
          return yScale(d.NumberProcedures);
        }); 

    annotation
        .style("left", function(d) {
          console.log("TEST");
          console.log("resize: " + xScale(d.Procedure))
          return xScale(d.Procedure)+'px';
        })
});

  
  var haveWeInitialziedYet = false;
  $(window).on('scroll', function(i) {
    if(!haveWeInitialziedYet) {
      var currentScrollTop = $(this).scrollTop();
      var targetScrollTop = $('#waste-container').position().top;
      if(currentScrollTop > targetScrollTop - 200 && currentScrollTop < targetScrollTop + 200) {
        initialTransition();
        haveWeInitialziedYet  = true;
      }
    }
  });

});
