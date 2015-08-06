$( document ).ready(function() {

  d3.selection.prototype.trigger = function( event ) {
     var e = document.createEvent('Event');
     e.initEvent( event, true, true);
     this.node().dispatchEvent( e );
     return this;
  }

  var myWindow = d3.select(window);

  //var windowW = window.innerWidth;
  //var windowH = window.innerHeight;
  var elementW = window.innerWidth;
  var elementH = window.innerHeight;
  var margin = {top: 20, right: 0, bottom: 50, left: 30},
      w = elementW - margin.left - margin.right,
      h = elementH * .65;


  var xScale = d3.scale.ordinal()
      //.domain(d3.range(dataset.length))   // range creates [0, 1,...length(dataset)]
      .rangeRoundBands([30, w], 0.2); // .05 for spacing between bars

  var yScale = d3.scale.log()     // Unnecessary
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
          return h - yScale(d.Waste);
        })
        .attr("y", function(d) {
          return yScale(d.Waste);
        })
        .style("fill", "#9a9a9a");
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
      yScale.domain([1, maxWaste]);

      wasteSVG.append("g")
          .attr("class", "xaxis")
          .attr("transform", "translate(0," + h + ")")
          .call(xAxis)
          .selectAll(".tick text")
          .call(wrap, xScale.rangeBand())
          .style("opacity", function() {
              if (elementW > 700) { return 1;
              } else { return 0;
              }});

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
          .attr("id", function(d) { return d.Procedure; })
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

      rectangles.on('mouseover', function(d) {        
        var me = d3.select(this);
        me.style("fill", "rgb(142, 175, 208)");
        tooltip.style('opacity', 0);
        
        tooltip.html("<strong>" + d.Procedure + "</strong>" + "<br>" + "<div class = 'tt-important'>"+ d3.format("%")(d.Unnecessary/d.NumberProcedures) + "</div> Nonrecommended <br><div class = 'tt-important'>" + d3.format("$,")(d.Waste) + "</div> Wasted" );
        
        tooltip.style("left", function(d) {
              var x = parseFloat(me.attr('x'));
              var value = x - parseFloat(tooltip.style('width'))/2  + parseFloat(me.attr('width'))/2;
                return value  + "px";
          }) 
          .style("top", parseFloat(me.attr('y')) + 20 + "px");
        
        tooltip.transition()
          .duration(500)
          .style("opacity", 1);

      })
        
        .on('mouseleave', function() {
          tooltip.transition()
            .duration(100).style('opacity', 0);
          d3.select(this).style('fill', '#9a9a9a');
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
      w = elementW - margin.left,
      h = elementH * .65;

      xScale.rangeRoundBands([30, w], 0.2);
      yScale.range([h+5, 5]);
      xAxis.scale(xScale);
      d3.selectAll(".xaxis").selectAll(".tick text")
        .style("opacity", function() {
              if (elementW > 700) { return 1;
              } else { return 0;
              }});
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
            return xScale(d.Procedure);
          })
          .attr("width", xScale.rangeBand())
          .attr("height", function(d) {
          return h - yScale(d.NumberProcedures);
          })
          .attr("y", function(d) {
            return yScale(d.NumberProcedures);
          }); 

  });


    var haveWeInitialziedYet = false;
    $(window).on('scroll', function(i) {
      if(!haveWeInitialziedYet) {
        var currentScrollTop = $(this).scrollTop();
        var targetScrollTop = $('#waste-container').position().top;
        if(currentScrollTop > targetScrollTop - 200 && currentScrollTop < targetScrollTop + 200) {
          initialTransition();
          
          haveWeInitialziedYet  = true;
          setTimeout( function() {
            d3.select('[id="Brand-Name Statins"]').trigger('mouseover');
  }, 1000);
        }
    }
  });

});
