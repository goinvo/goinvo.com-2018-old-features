$(document).ready(function () {

  d3.selection.prototype.trigger = function (event) {
    try {
      var e = document.createEvent('Event');
      e.initEvent(event, true, true);
      this.node().dispatchEvent(e);
    } catch (e) {
      console.log(e);
    }
    return this;
  }

  var myWindow = d3.select(window);
  var w = window.innerWidth * 1;
  var whRatio = 5 / 9.6;
  var h = window.innerHeight * .75;

  var margin = {
      top: 20,
      right: 10,
      bottom: 50,
      left: 10
    },
    width = w - margin.left - margin.right,
    height = h;

  var svg = d3.select("#cost-comparison-boston-chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  var tooltip = d3.select("#cost-comparison-boston-chart")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  var g = svg.append("g");

  var albersProjection = d3.geo.albers()
    .scale(width * 215)
    .rotate([71.057, 0])
    .center([0, 42.313])
    .translate([width / 2, height / 2]);

  var geoPath = d3.geo.path()
    .projection(albersProjection);

  var rScale = d3.scale.linear().range([.0001, .0005]);

  var neighborhoods, hospitals;

  d3.json("/features/us-healthcare/data/neighborhoods.json", function (error, neighborhoods) {
    if (error) throw error;

    g.selectAll("path")
      .data(neighborhoods.features)
      .enter()
      .append("path")
      .attr("fill", "#dedede")
      .attr("stroke", "white")
      .attr("stroke-width", "0.75px")
      .attr("d", geoPath);

    d3.csv("/features/us-healthcare/data/boston_hospitals.csv", function (data) {

      hospitals = svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle");

      hospitals.attr("class", "hospitals")
        .attr("id", function (d) {
          return d.name
        })
        .attr("cx", function (d) {
          return albersProjection([d.lon, d.lat])[0];
        })
        .attr("cy", function (d) {
          return albersProjection([d.lon, d.lat])[1];
        })
        .attr("r", function (d) {
          return rScale(d.price_pneumonia)
        })
        .attr("fill", "#9a9a9a")
        .on("mouseover", function (d) {
          var circle = d3.select(this);
          var diameterOffset = rScale(d.price_pneumonia) + margin.top;
          var ttWidth = parseFloat(tooltip.style('width')) / 2;
          var ttHeight = parseFloat(tooltip.style('height'));
          var newX = parseFloat(circle.attr('cx')) - ttWidth + margin.left;
          var newY = parseFloat(circle.attr('cy')) + diameterOffset;
          var ttHTML = "<strong>" + d.name + "</strong>" + "<br>" + "<div class = 'tt-important'>" + d3.format("$,")(d.price_visit) + "</div>Clinic Visit <br><div class = 'tt-important'>" + d3.format("$,")(d.price_imaging) + "</div>MRI Without Contrast <br><div class = 'tt-important'>" + d3.format("$,")(d.price_pneumonia) + "</div>Pneumonia Treatment";

          // If on the bottom half of the chart, make the tooltip go above point
          if (newY > h / 2) {
            newY = newY - (2 * diameterOffset) - ttHeight;
          }

          // Are we too far to the right or the left? Fix it.
          if (newX + ttWidth * 2 > w) {
            newX = newX - ttWidth;
          } else if (newX - ttWidth < margin.left) {
            newX = newX + ttWidth + 2;
          }

          svg.selectAll("circle")
            .transition()
            .duration(250)
            .attr("r", function (d) {
              return rScale(d.price_pneumonia)
            })
            .style("fill", "#9a9a9a");

          circle.transition()
            .duration(250)
            .attr("r", function (d) {
              return rScale(d.price_pneumonia) + 5
            })
            .style("fill", "rgb(133, 137, 186)");

          tooltip.transition()
            .duration(200)
            .style("opacity", 1);

          tooltip.html(ttHTML)
            .style("left", newX + "px")
            .style("top", newY + "px");


        })
        .on("mouseout", function () {
          svg.selectAll("circle")
            .transition()
            .duration(250)
            .attr("r", function (d) {
              return rScale(d.price_pneumonia)
            })
            .style("fill", "#9a9a9a");

          tooltip.transition()
            .duration(500)
            .style("opacity", 0);
        });
    });

  });

  var initializeSizes = function () {
    w = window.innerWidth * 1;
    width = w - margin.left - margin.right;
    height = window.innerHeight * .75;

    svg.attr("width", width)
      .attr("height", height);

    albersProjection.translate([width / 2, height / 2])
      .scale(width * 215);

    g.selectAll("path").attr("d", geoPath);

    hospitals.attr("cx", function (d) {
        return albersProjection([d.lon, d.lat])[0];
      })
      .attr("cy", function (d) {
        return albersProjection([d.lon, d.lat])[1];
      })
  }

  myWindow.on('resize.cost', initializeSizes);

  setTimeout(function () {
    d3.select('[id="St Elizabeth\'s Medical Center"]').trigger('mouseover');
    d3.select('[id="Massachusetts General Hospital"]').trigger('mouseover');
  }, 1000);

});