$( document ).ready(function() {

    
var myWindow = d3.select(window);
    
//var windowW = window.innerWidth;
//var windowH = window.innerHeight;
var elementW = $('#waste-container').width();
var elementH = $('#waste-container').height();
var margin = {top: 20, right: 0, bottom: 50, left: 10},
    w = elementW - margin.left - margin.right,
    h = 500 - margin.top - margin.bottom;
var barPadding = 1;

var padding = 20;

var xScale = d3.scale.ordinal()
    //.domain(d3.range(dataset.length))   // range creates [0, 1,...length(dataset)]
    .rangeRoundBands([100, w], 0.2); // .05 for spacing between bars

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
      }); 
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
        .attr('transform', 'translate(100,0)')
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -60)
        .attr("x", -h/2)
        .attr("dy", ".71em")
        .style("text-anchor", "middle")
        .text("Number of Procedures");

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
                .style("fill", "#346392")
            tooltip.transition()
                .duration(200)
                .style("opacity", 1)
            tooltip.html("<b>" + d.Procedure + "</b>" + "<br>" + "Percent Nonrecommended: "+ d3.format("%")(d.Unnecessary/d.NumberProcedures) + "<br>" + "Dollars Wasted: " + d3.format("$,")(d.Waste))
                .style("left", (d3.event.pageX - 300) + "px")
                .style("top", (d3.event.pageY - 1300) + "px");
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
    var elementW = $('#waste-container').width();
    w = elementW - margin.left - margin.right,
    h = 500 - margin.top - margin.bottom; 
    console.log('windowW='+elementW+", w="+w);

    xScale.rangeRoundBands([100, w], 0.2);
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
            .call(xAxis)
        .selectAll(".xaxis .tick text")
            .call(wrap, xScale.rangeBand());
    
    wasteSVG
        .select('.yaxis')
        .call(yAxis)

    
    rectangles
        .attr("width", xScale.rangeBand())
        .attr("x", function(d, i) {
        return xScale(d.Procedure);
        })
        .attr("width", xScale.rangeBand())
//        .attr("y", function(d) {
//                return h - 10;
//        });
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
