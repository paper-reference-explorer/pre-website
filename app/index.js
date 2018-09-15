import 'styles/index.scss';
import * as data from './data.json';
import * as d3 from "d3";

console.log(data.papers);
console.log(data.sections);

var nSections = data.sections.length;

var svgSelection = d3.select("#visualization");

for (var index = 0; index < nSections; index++) {
    var sectionHeight = 100.0 / nSections;
    var offset = sectionHeight * index;

    svgSelection.append("line")
        .attr("x1", 0)
        .attr("x2", 100)
        .attr("y1", offset + 0.25)
        .attr("y2", offset + 0.25);

    svgSelection.append("text")
        .attr("class", "section")
        .attr("x", 0)
        .attr("y", offset + 5)
        .text(data.sections[index]);

    var g = svgSelection.append("g");

    g.append("circle")
        .attr("cx", "50%")
        .attr("cy", offset + sectionHeight / 2)
        .attr("r", 5)
        .style("fill", "purple");

    g.append("text")
        .attr("class", "paper-label")
        .attr("x", "50%")
        .attr("y", offset + sectionHeight / 2)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .text(data.sections[index]);
}
