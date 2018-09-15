import 'styles/index.scss';
import * as data from './data.json';
import * as d3 from "d3";

console.log(data.papers);
console.log(data.sections);

var rowHeight = 120;
var nSections = data.sections.length;
var totalHeight = rowHeight * nSections;

var divSelection = d3.select(".visualization");
//divSelection.style("height", totalHeight.toString() + "px");

var svgSelection = d3.select("#visualization");

for (var index = 0; index < nSections; index++) {
    var sectionHeight = 100.0 / nSections;
    console.log(sectionHeight);
    var offset = sectionHeight * index;

    svgSelection.append("line")
        .attr("x1", 0)
        .attr("x2", 100)
        .attr("y1", offset + 0.25)
        .attr("y2", offset + 0.25);

    svgSelection.append("text")
        .attr("x", 0)
        .attr("y", offset + 5)
        .text(data.sections[index]);

    svgSelection.append("circle")
        .attr("cx", "50%")
        .attr("cy", offset + sectionHeight / 2)
        .attr("r", 5)
        .style("fill", "purple");
}
