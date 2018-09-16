import 'styles/index.scss';
import {data, constants} from './data.js';
import * as d3 from "d3";
import palette from "google-palette";

console.log(data);

var nSections = data.length;
var svgSelection = d3.select("#visualization");

function getMeta() {
    var meta = {
        "maximumReferencedGlobal": 0,
        "maximumReferencedLocal": 0
    };
    for (var sectionIndex = 0; sectionIndex < nSections; sectionIndex++) {
        var sectionWrapper = data[sectionIndex];
        for (var sectionKey in sectionWrapper) {
            if (sectionWrapper.hasOwnProperty(sectionKey)) {
                var section = sectionWrapper[sectionKey];
                for (var paperKey in section) {
                    if (section.hasOwnProperty(paperKey)) {
                        var paper = section[paperKey];
                        if (paper["referenced-n-times-global"] > meta['maximumReferencedGlobal']) {
                            meta['maximumReferencedGlobal'] = paper["referenced-n-times-global"];
                        }
                        if (paper["referenced-n-times-local"] > meta['maximumReferencedLocal']) {
                            meta['maximumReferencedLocal'] = paper["referenced-n-times-local"];
                        }
                    }
                }
            }
        }
    }
    return meta;
}

function len(o) {
    var count = 0;
    for (var key in o) {
        if (o.hasOwnProperty(key)) {
            count++;
        }
    }
    return count
}

// https://stackoverflow.com/questions/846221/logarithmic-slider
function logslider(position, nElements) {
    // position will be between 0 and 100
    var minp = 0;
    var maxp = nElements;

    var minv = Math.log(constants.minimumSize);
    var maxv = Math.log(constants.maximumSize);

    // calculate adjustment factor
    var scale = (maxv - minv) / (maxp - minp);

    return Math.exp(minv + scale * (position - minp));
}

var meta = getMeta();
var colorPalette = palette('tol-sq', meta["maximumReferencedLocal"] + 1);

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
                    var y = offset + sectionHeight / 2;
                    var radius = logslider(paper["referenced-n-times-global"], meta["maximumReferencedGlobal"]);
                    var backgroundColor = colorPalette[paper["referenced-n-times-local"]];

                    g.append("circle")
                        .attr("cx", x)
                        .attr("cy", y)
                        .attr("r", radius)
                        .style("fill", backgroundColor);

                    g.append("text")
                        .attr("class", "paper-label")
                        .attr("x", x)
                        .attr("y", y)
                        .attr("text-anchor", "middle")
                        .attr("dominant-baseline", "middle")
                        .text(paperKey);

                    paperIndex++;
                }
            }
        }
    }
}
