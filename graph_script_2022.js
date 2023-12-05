
// List of groups
// day,
var allGroup = [
"Julia",
"Max",
"Ian",
"twitch.tv/MaximumCold",
"Никита",
"Jolar",
"Conservative Unicorn (Stella)",
"Eli",
"Alex",
"Kat",
"The Crouch",
"Cad",
"Bard",
"Croaking Closeted Toad",
"251/250"
];
var placings = [1,1,2,3,4,5,6,7,8,8,8,9,10,10,10]
var timeParse = d3.timeParse("%Y/%m/%d");


// set the dimensions and margins of the graph
var margin = {top: 10, right: 100, bottom: 30, left: 30},
    width = $("#scores").width() - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#scores_graph")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("https://luckycharmbowl.github.io/scores_2022.csv",

function(data) {
    console.log("reading the csv!", data);


    // Reformat the data: we need an array of arrays of {x, y} tuples
    var dataReady = allGroup.map(function(grpName) {
        return {
		name : grpName,
		values: data.map(function(d) {
		    return {day: timeParse(d.day),
			    value: +d[grpName]};

		})
	};
    });
    console.log("reformatted data is:", dataReady);

    // A color scale: one color for each group
    var myColor = d3.scaleOrdinal()
      .domain(allGroup)
      .range(d3.schemeSet2.concat(["#de646e", "#58c27d", "#a88c68", "#acbbc0", "#bf7bd2"]));

    // Add X axis --> it is a date format
    var x= d3.scaleTime()
      .range([ 0, width ])
      .domain(d3.extent(data, function(d) { return timeParse(d.day); }));

    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).ticks(7));

    // Add Y axis
    var y = d3.scaleLinear()
      .domain( [0,70])
      .range([ height, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(y));

    // Add the lines
    var line = d3.line()
      .x(function(d) { return x(+d.day) })
      .y(function(d) { return y(+d.value) })
    svg.selectAll("myLines")
      .data(dataReady)
      .enter()
      .append("path")
        .attr("d", function(d){ return line(d.values) } )
        .attr("stroke", function(d){ return myColor(d.name) })
        .style("stroke-width", 4)
        .style("fill", "none")

    // Add the points
    svg
      // First we need to enter in a group
      .selectAll("myDots")
      .data(dataReady)
      .enter()
        .append('g')
        .style("fill", function(d){ return myColor(d.name) })
      // Second we need to enter in the 'values' part of this group
      .selectAll("myPoints")
      .data(function(d){ return d.values; })
      .enter()
      .append("circle")
        .attr("cx", function(d) { return x(d.day); } )
        .attr("cy", function(d) { return y(d.value); } )
        .attr("r", 5)
        .attr("stroke", "white")

    // Add a legend at the end of each line
    svg
      .selectAll("myLabels")
      .data(dataReady)
      .enter()
        .append('g')
        .append("text")
          .attr("x", 12)
          .attr("y", function(d,i){return 12 + i * 25;})
          .text(function(d, i) { return placings[i] + " - " + d.name; })
          .style("fill", function(d){ return myColor(d.name) })
          .style("font-size", 15)

}
)
