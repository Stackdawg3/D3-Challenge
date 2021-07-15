var svgWidth = 900;
var svgHeight = 900;

// Define the chat's margins as an oject
var chartMargin = {
    top: 60,
    right: 60,
    bottom: 60,
    left: 60
};

var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// create svg container
var svg = d3.select('#scatter').append('svg')
    .attr('height', svgHeight)
    .attr('width', svgWidth);

// append group area and set its margins
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


// Load data from data.csv
d3.csv('./assets/data/data.csv').then(function(journalData) {
    console.log(journalData);

    journalData.forEach(function(data){
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
    });
    
    // Configure a time scale
    var xLinearScale = d3.scaleLinear()
        .domain([0, d3.max(stateData, data => data.poverty)])
        .range([chartWidth, 0]);
    chartGroup.append('g')
        .call(d3.axisBottom(xLinearScale).ticks(10));

    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(stateData, data => data.healthcare)])
        .range([0, chartHeight]);
    chartGroup.append('g')
        .call(d3.axisLeft(yLinearScale).ticks(10));
    
    chartGroup.selectAll("circle")
        .data(journalData)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.poverty))
        .attr("cy", d => yScale(d.healthcare))
        .attr("r", "10")
        .attr("fill", "lightblue")
        .attr("opacity", "1");
            
        
    chartGroup.selectAll("text")
        .data(journalData)
        .enter()
        .append("text")
        .text(d=>d.abbr)
        .attr("x", (d=>xScale(d.poverty)))
        .attr("y", (d=>yScale(d.healthcare -0.1)))
        .style("text-anchor", "middle")
        .attr("font-size", 10)
        .attr("stroke", "white");

    
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Lacks Healthcare (%)");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("In Poverty (%)");

}).catch(function(error){
    console.log(error)
});

