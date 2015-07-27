$(document).ready(function(){

var myWindow = d3.select(window);
var w = document.documentElement.clientWidth * .7;
var whRatio = 5/9.6;
var h = whRatio * w;

var margin = {top: 20, right: 0, bottom: 50, left: 10},
    width = w - margin.left-margin.right,
    height = h;
                                                                         
var svg = d3.select( "#cost-comparison-boston-chart" )
  .append( "svg" )
  .attr( "width", width )
  .attr( "height", height );

var tooltip = d3.select("#cost-comparison-boston-chart").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

var g = svg.append( "g" );

var albersProjection = d3.geo.albers()
  .scale( width * 215 )
  .rotate( [71.057,0] )
  .center( [0, 42.313] )
  .translate( [width/2,height/2] );

var geoPath = d3.geo.path()
    .projection( albersProjection );

var neighborhoods, hospitals;

d3.json("/features/us-healthcare/data/neighborhoods.json", function(error, neighborhoods) {
  if (error) throw error;
  
  g.selectAll("path")
    .data(neighborhoods.features)
    .enter()
    .append("path")
    .attr("fill", "#E0E0E0")
    .attr("stroke", "white")
    .attr("stroke-width", "0.75px")
    .attr("d", geoPath);

      d3.csv("/features/us-healthcare/data/boston_hospitals.csv", function(data){

        hospitals = svg.selectAll("circle")
          .data(data)
          .enter().append("circle");

          hospitals.attr("class", "hospitals")
            .attr("cx", function(d){
              return albersProjection([d.lon, d.lat])[0];
            })
            .attr("cy", function(d){
              return albersProjection([d.lon, d.lat])[1];
            })
            .attr("r", 4)
            .attr("fill", "#004363")
            .on("mouseover", function(d){

              d3.select(this)
                .attr("fill", "D9C6E1")
                .attr("r", 6)

              tooltip.transition()
                .duration(200)
                .style("opacity",1)
              tooltip.html("<b>" + d.name + "</b>" + "<br/>" + "Echocardiogram Price: " + d3.format("$,")(d.price))
                .style("left", (d3.event.pageX + 5) + "px")
                .style("top", (d3.event.pageY + 5) + "px");
            })

            .on("mouseout", function(){
              d3.select(this)
                .attr("fill", "#004363")
                .attr("r", 4)
              tooltip.transition()
                .duration(500)
                .style("opacity", 0);
            });
      });
  
});
    
var initializeSizes = function(){
    w =  document.documentElement.clientWidth * .7;
    width = w - margin.left - margin.right;
    height = whRatio * w;

    svg.attr("width", width)
       .attr("height", height);
    
    albersProjection.translate([width/2,height/2])
        .scale(width * 215);
    
    g.selectAll("path").attr("d", geoPath);
    
    hospitals.attr("cx", function(d){
              return albersProjection([d.lon, d.lat])[0];
            })
            .attr("cy", function(d){
              return albersProjection([d.lon, d.lat])[1];
            })
}

myWindow.on('resize.cost', initializeSizes );
});
