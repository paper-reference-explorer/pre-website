<template>
    <svg id="visualization" viewBox="0 0 100 100"></svg>
</template>

<script>
    import {data, constants} from './data.js';
    import * as d3 from "d3";
    import palette from "google-palette";

    var nSections = data.length;

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

    for (var colorIndex = 0; colorIndex < colorPalette.length; colorIndex++) {
        colorPalette[colorIndex] = "#" + colorPalette[colorIndex];
    }

    var transitionTime = 1000;
    var startRadius = 0;
    var startFontSize = 0;
    var startColor = colorPalette[0];
    console.log(colorPalette);

    export default {
        name: 'non-vue-line-chart',
        mounted() {
            var svgSelection = d3.select("#visualization");
            var div = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

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
                                var x = ((paperIndex + 1) / (nPapersInSection + 1) * 100).toString() + "%";
                                var y = offset + sectionHeight / 2;

                                var g = svgSelection.append("g")
                                    .data([paper])
                                    .on("mouseover", function (p) {
                                        div.transition()
                                            .duration(200)
                                            .style("opacity", .9);
                                        div.html(
                                            p["authors"] + " \"" + p["title"] + "\""
                                            + "<br />Submitted to arxiv on " + p["date-created"] + "."
                                            + "<br />Referenced " + p["referenced-n-times-global"].toString() + " times on arxiv."
                                            + "<br />Referenced by " + p["referenced-n-times-local"].toString() + " of your papers."
                                        )
                                            .style("left", (d3.event.pageX) + "px")
                                            .style("top", (d3.event.pageY - 28) + "px");
                                    })
                                    .on("mouseout", function (d) {
                                        div.transition()
                                            .duration(500)
                                            .style("opacity", 0);
                                    });

                                g.append("circle")
                                    .attr("cx", x)
                                    .attr("cy", y)
                                    .attr("r", startRadius)
                                    .style("fill", startColor)
                                    .transition()
                                    .duration(transitionTime)
                                    .attr("r", function (p) {
                                        return logslider(p["referenced-n-times-global"], meta["maximumReferencedGlobal"])
                                    })
                                    .style("fill", function (p) {
                                        return colorPalette[p["referenced-n-times-local"]];
                                    });

                                g.append("text")
                                    .attr("class", "paper-label")
                                    .attr("x", x)
                                    .attr("y", y)
                                    .attr("text-anchor", "middle")
                                    .attr("dominant-baseline", "middle")
                                    .text(paperKey)
                                    .style("font-size", startFontSize)
                                    .transition()
                                    .duration(transitionTime)
                                    .style("font-size", "1.5px");

                                paperIndex++;
                            }
                        }
                    }
                }
            }
        }
    }
</script>

<style>
    #visualization {
        height: 100%;
        width: 100%;
    }
</style>
