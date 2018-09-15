import 'styles/index.scss';
import * as data from './data.json';
import * as d3 from "d3";

console.log(data.papers);
console.log(data.sections);

var svgSelection = d3.select("#visualization");

for (var section in data.sections) {
    svgSelection.append("circle")
        .attr("cx", 25)
        .attr("cy", 25)
        .attr("r", 25)
        .style("fill", "purple");
}
