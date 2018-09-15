import 'styles/index.scss';
import {data} from './data.js';
import * as d3 from "d3";

console.log(data);

function len(o) {
    var count = 0;
    for (var key in o) {
        if (o.hasOwnProperty(key)) {
            count++;
        }
    }
    return count
}

var nSections = data.length;
var svgSelection = d3.select("#visualization");

for (var sectionIndex = 0; sectionIndex < nSections; sectionIndex++) {
    var sectionWrapper = data[sectionIndex];
    for (var sectionKey in sectionWrapper) {
        if (sectionWrapper.hasOwnProperty(sectionKey)) {
            var section = sectionWrapper[sectionKey];
            var sectionHeight = 100.0 / nSections;
            var offset = sectionHeight * sectionIndex;

            svgSelection.append("line")
                .attr("x1", 0)
                .attr("x2", 100)
                .attr("y1", offset + 0.25)
                .attr("y2", offset + 0.25);

            svgSelection.append("text")
                .attr("class", "section")
                .attr("x", 0)
                .attr("y", offset + 5)
                .text(sectionKey);

            var nPapersInSection = len(section);
            var paperIndex = 0;
            for (var paperKey in section) {
                if (section.hasOwnProperty(paperKey)) {
                    var paper = section[paperKey];

                    var g = svgSelection.append("g");
                    var x = ((paperIndex + 1) / (nPapersInSection + 1) * 100).toString() + "%";
                    g.append("circle")
                        .attr("cx", x)
                        .attr("cy", offset + sectionHeight / 2)
                        .attr("r", 5)
                        .style("fill", "purple");

                    g.append("text")
                        .attr("class", "paper-label")
                        .attr("x", x)
                        .attr("y", offset + sectionHeight / 2)
                        .attr("text-anchor", "middle")
                        .attr("dominant-baseline", "middle")
                        .text(paperKey);

                    paperIndex++;
                }
            }
        }
    }
}
