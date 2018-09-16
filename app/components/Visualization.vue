<template>
    <div id="wrapper">
        <svg id="visualization" viewBox="0 0 100 100"></svg>
    </div>
</template>

<script>
    import {data, constants} from "./data.js";
    import * as D3ForceBoilerplate from "./d3ForceBoilerplate.js";
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
            // TODO TEMP
            var container = d3.select("#visualization");
            var width = container.width,
                height = container.height;
            d3.json("test.json", function (error, graph) {
                if (error) throw error;

                var link = container.append("graph")
                    .attr("class", "links")
                    .selectAll("line")
                    .data(graph.links)
                    .enter().append("line")
                    .attr("stroke-width", function (d) {
                        return Math.sqrt(d.value);
                    });

                var node = container.append("graph")
                    .attr("class", "nodes")
                    .selectAll("circle")
                    .data(graph.nodes)
                    .enter().append("circle")
                    .attr("r", 5)
                    .attr("fill", function (d) {
                        return color(d.group);
                    })
                    .call(d3.drag()
                        .on("start", D3ForceBoilerplate.dragstarted)
                        .on("drag", D3ForceBoilerplate.dragged)
                        .on("end", D3ForceBoilerplate.dragended));
            });

            var nodes = [{index: 0, x: width / 2, y: 50}];
            var simulation = d3.forceSimulation(nodes);
            container.append(simulation);
            console.log("" + width + " " + height + " >" + nodes);
            // TODO END TODO

            /*var svgSelection = d3.select("#visualization");
            var div = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);
            var wrapperSelection = d3.select("#wrapper");
            wrapperSelection.attr("height", "1001px");

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
                                            + "<br />Submitted to arXiv on " + p["date-created"] + "."
                                            + "<br />Referenced " + p["referenced-n-times-global"].toString() + " times on arXiv."
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
            }*/
        }
    }
</script>
