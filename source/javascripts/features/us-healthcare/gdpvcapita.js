$(document).ready(function(){

var margin = {top: 20, right: 50, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.linear().range([0, width]);

var y = d3.scale.linear().range([height, 0]);

var svg = d3.select("#gdp-vs-capita-chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
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

d3.csv("/features/us-healthcare/data/gdpvcapita.csv", function(error, data){
	if (error) throw error;

	data.forEach(function(d) {
		name = name; 
		d.capita = +d.capita;
		d.gdp = +d.gdp;
	});
	
	x.domain(d3.extent(data, function(d) { return d.gdp; }));
	y.domain(d3.extent(data, function(d) { return d.capita; }));

	svg.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + height + ")")
	.call(xAxis)
	.append("text")
		.attr("x", width)
		.attr("dx", ".71em")
		.attr("dy", "-.71em")
		.style("text-anchor", "end")
		.text("% GDP");

	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
	    .append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", ".71em")
			.style("text-anchor", "end")
			.text("US Dollars per Capita");

	svg.selectAll("dot")
		.data(data)
		.enter().append("circle")
		.attr("class", "dot")
		.attr("r", 6)
		.attr("cx", function(d){return x(d.gdp)})
		.attr("cy", function(d){return y(d.capita)})
		.attr("fill", "#004363")
		.on("mouseover", function(d){
			d3.selectAll(".dot")
				.style("r", "6")
				.style("fill", "gray")
				.filter(function(p) { return p.name == d.name; })
				.style("r", "10")
				.style("fill", "#D9C6E1")
			tooltip.transition()
				.duration(200)
				.style("opacity", 1)
			tooltip.html("<b>" + d.name + "</b>" + "<br/>" + "US Dollars / Capita: " + d.capita + "<br/>" + "% GDP: " + d.gdp )
				.style("left", (d3.event.pageX + 5) + "px")
				.style("top", (d3.event.pageY + 5) + "px");
		})
		.on("mouseout", function(d) {
			tooltip.transition()
				.duration(500)
				.style("opacity", 0)
			d3.selectAll(".dot")
				.style("r", null)
				.style("fill", null)
				.style("opacity", null)
		})

});
});