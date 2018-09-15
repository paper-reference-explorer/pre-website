import 'styles/index.scss';
import * as data from './data.json';
import * as d3 from "d3";

console.log(data.papers);
console.log(data.sections);

var rowHeight = 120;
var nSections = data.sections.length;
var totalHeight = rowHeight * nSections;

var svgSelection = d3.select("#visualization");
svgSelection.attr("height", totalHeight.toString() + "px");

for (var index = 0; index < nSections; index++) {
    // data.sections[index]
    var offset = rowHeight * index;
    svgSelection.append("circle")
        .attr("cx", 25)
        .attr("cy", 25 + offset)
        .attr("r", 25)
        .style("fill", "purple");

    svgSelection.append("line")
        .attr("x1", 0)
        .attr("x2", 100)
        .attr("y1", offset)
        .attr("y2", offset)
}
