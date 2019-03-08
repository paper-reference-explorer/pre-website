<template>
    <svg
        id="visualization"
        :viewBox="viewBox"
    ></svg>
</template>

<script>
    import {mapState} from 'vuex'
    import * as d3 from "d3";

    export default {
        name: 'Visualization',
        data: () => ({
            svg: null,
            width: 0,
            height: 0,
            padding: 8,
            maxTitleLength: 20,
            collisionRadius: 100,
            hoverRadius: 100,
            labelFontSizePixels: 20,
            defaultTextOpacity: 0.85,
            defaultStrokeOpacity: 0.5,
            arrowSize: 4,
            hoverTransitionDuration: 250,
            isDragging: false,
            force: null,
        }),
        watch: {
            force: {
                handler: function (after, before) {
                    console.log(after);
                },
                deep: true,
            }
        },
        computed: {
            // ...mapState(["nodesData", "linksData", "radiusScale", "shadowColorScale", "shadowColorScale"])
            nodesData() {
                return this.$store.state.nodesData;
            },
            linksData() {
                return this.$store.state.linksData;
            },
            radiusScale() {
                return this.$store.state.radiusScale;
            },
            colorScale() {
                return this.$store.state.colorScale;
            },
            shadowColorScale() {
                return this.$store.state.shadowColorScale;
            },
            viewBox() {
                return "0 0 " + this.height + " " + this.width;
            },
            defs() {
                return this.svg.append("defs");
            },
            labelFontSizeString() {
                return this.labelFontSizePixels + "px";
            },
            linkOffsetForArrow() {
                return this.arrowSize * 4;
            },
            yearHeight() {
                return this.height / this.nYears;
            }
        },
        methods: {
            forceEnd: function () {
                this.force.force("collision_force", null);
                this.force.force("position_force_Y", null);
                this.force.force("position_force_X", null);
                this.force.force("link_force", null);
            },
            getFilter: function (d) {
                return this.makeFilter("drop-shadow-" + parseInt(d["referenced-n-times-local"]), false);
            },
            getFilterSelected: function (d) {
                return this.makeFilter("drop-shadow-" + parseInt(d["referenced-n-times-local"]) + "-selected", true);
            },
            makeFilter: function (id, isSelected) {
                // https://stackoverflow.com/questions/33878292/d3-set-filter-flood-color-based-on-data
                if (this.defs.selectAll("#" + id).empty()) {
                    var filter = this.defs
                        .append("filter")
                        .attr("id", id)
                        .attr("height", "200%")
                    ;

                    filter
                        .append("feGaussianBlur")
                        .attr("in", "SourceAlpha")
                        .attr("stdDeviation", isSelected ? 3 : 1)
                        .attr("result", "blur")
                    ;

                    filter
                        .append("feOffset")
                        .attr("in", "blur")
                        .attr("result", "offsetBlur")
                    ;

                    filter
                        .append("feFlood")
                        .attr("in", "offsetBlur")
                        .attr("flood-color", isSelected ? this.colorScale(100) : this.shadowColorScale(0))
                        .attr("flood-opacity", "1")
                        .attr("result", "offsetColor")
                    ;

                    filter
                        .append("feComposite")
                        .attr("in", "offsetColor")
                        .attr("in2", "offsetBlur")
                        .attr("operator", "in")
                        .attr("result", "offsetBlur")
                    ;

                    var feMerge = filter.append("feMerge");
                    feMerge.append("feMergeNode").attr("in", "offsetBlur");
                    feMerge.append("feMergeNode").attr("in", "SourceGraphic");
                }
                return "url(#" + id + ")"
            },
            getArrowSelected: function (l) {
                return this.makeArrow("end-arrow-" + parseInt(l.target.radius) + "-selected", l.target.radius, true);
            },
            makeArrow: function (id, radius, isSelected) {
                if (this.defs.selectAll("#" + id).empty()) {
                    this.defs
                        .append("marker")
                        .attr("id", id)
                        .attr("viewBox", "0 -5 10 10")
                        .attr("refX", 0)
                        .attr("markerWidth", this.arrowSize)
                        .attr("markerHeight", this.arrowSize)
                        .attr("orient", "auto")
                        .append("path")
                        .attr("d", "M0,-5L10,0L0,5")
                        .attr("fill", this.colorScale(1))
                        .attr("opacity", isSelected ? 1.0 : 0.25)
                }
                return "url(#" + id + ")"
            },
            isConnected: function (a, b) {
                return this.linksData.some(function (l) {
                    return a.key === b.key
                        || (l.source.key === a.key && l.target.key === b.key)
                        || (l.source.key === b.key && l.target.key === a.key);
                });
            },
            isPartOfLink: function (n, l) {
                return n.key === l.source.key || n.key === l.target.key;
            },
            dragStart: function (d) {
                if (!d3.event.active) {
                    this.force.alphaTarget(0.3).restart();
                }
                this.isDragging = true;
                d.fx = d.x;
                d.fy = d.y;
            },
            dragDrag: function (d) {
                d.fx = d3.event.x;
                d.fy = d3.event.y;
            },
            dragEnd: function (d) {
                if (!d3.event.active) {
                    this.force.alphaTarget(0);
                }
                this.isDragging = false;
                d.fx = null;
                d.fy = null;
            }
        },
        mounted() {
            this.$store.watch(
                (state) => {
                    return this.$store.state.graphPapers;
                },
                (newValue, oldValue) => {
                    const rect = this.$el.getBoundingClientRect();
                    this.width = rect.width;
                    this.height = rect.height;
                    if (this.width === 0 || this.height === 0) {
                        return;
                    }

                    this.svg = d3.select("svg#visualization");
                    this.svg.selectAll("*").remove();

                    this.nodesData.forEach(p => p.radius = this.radiusScale(p["referenced-n-times-global"] + 1));
                    var minYear = Math.min.apply(Math, this.nodesData.map(p => p["year"]));
                    var maxYear = Math.max.apply(Math, this.nodesData.map(p => p["year"]));
                    this.nYears = maxYear - minYear + 1;
                    this.nodesData.forEach(p => p.yearIndex = maxYear - p["year"]);

                    this.force = d3
                        .forceSimulation()
                        .nodes(this.nodesData)
                        .alpha(0.25)
                        .alphaMin(0.05)
                        .on("end", this.forceEnd)
                        .on("tick", tickActions)
                    ;

                    this.force
                        .force("collision_force", d3.forceCollide(this.collisionRadius).strength(1))
                        .force("link_force", d3.forceLink(this.linksData).id(d => d.key).strength(0.1))
                        .force("position_force_Y", d3.forceY(d => this.yearHeight * (d.yearIndex + 0.5)).strength(3))
                        .force("position_force_X", d3.forceX(this.width / 2).strength(0.2))
                    ;

                    var link = this.svg
                        .append("g")
                        .attr("class", "links")
                        .selectAll("line")
                        .data(this.linksData)
                        .enter()
                        .append("g")
                        .on("mouseover", fadeLink(0.5, 0.1, 0.5, 0.25, true))
                        .on("mouseout", fadeLink(1.0, 1.0, 1.0, 1.0, false))
                    ;

                    var visibleLink = link
                        .append("line")
                        .attr("stroke-width", 4)
                        .style("stroke", this.colorScale(1))
                        .style("marker-end", this.getArrowSelected)
                    ;

                    var hoverLink = link
                        .append("line")
                        .attr("stroke-width", 48)
                        .style("stroke", "transparent")
                    ;

                    var node = this.svg
                        .append("g")
                        .attr("class", "nodes")
                        .selectAll("circle")
                        .data(this.nodesData)
                        .enter()
                        .append("g")
                        .on("mouseover", fadeNode(0.5, 0.1, 0.5, 0.25, true))
                        .on("mouseout", fadeNode(1.0, 1.0, 1.0, 1.0, false))
                        .call(d3.drag()
                            .on("start", this.dragStart)
                            .on("drag", this.dragDrag)
                            .on("end", this.dragEnd))
                    ;

                    node
                        .append("circle")
                        .attr("r", p => p.radius)
                        .attr("fill", d => this.colorScale(d["referenced-n-times-local"]))
                        .attr("stroke", "black")
                        .attr("stroke-opacity", this.defaultStrokeOpacity)
                        .style("filter", this.getFilter)
                    ;

                    node
                        .append("circle")
                        .attr("r", this.hoverRadius)
                        .attr("fill-opacity", 0)
                        .attr("stroke-opacity", 0)
                    ;

                    node
                        .append("text")
                        .attr("dx", 0)
                        .attr("dy", d => d.radius + this.labelFontSizePixels + 4)
                        .style("text-anchor", "middle")
                        .style("font-size", this.labelFontSizeString)
                        .style("font", "Roboto")
                        .text(d => d.title.length > this.maxTitleLength ? d.title.substring(0, this.maxTitleLength) + "…" : d.title)
                        .style("opacity", this.defaultTextOpacity)
                    ;


                    this.$store.watch(
                        (state) => {
                            return this.$store.state.hoveredPapers;
                        },
                        (newValue, oldValue) => {
                            if (newValue.length === 0) {
                                node.dispatch("mouseout")
                            }
                            node
                                .filter(function (d, i) {
                                    for (var index = 0; index < newValue.length; index++) {
                                        if (newValue[index] === d.key) {
                                            return true;
                                        }
                                    }
                                    return false;
                                })
                                .dispatch("mouseover");
                        },
                        {
                            deep: true
                        }
                    );

                    var hoverTransitionDuration = this.hoverTransitionDuration;
                    var isDragging = isDragging;

                    var getFilterSelected = this.getFilterSelected;
                    var getFilter = this.getFilter;
                    var isConnected = this.isConnected;
                    var isPartOfLink = this.isPartOfLink;

                    function fadeNode(fillOpacity, strokeOpacity, textOpacity, linkOpacity, isHoverMode) {
                        // http://bl.ocks.org/martinjc/396926c15afa2ab0127322a01d97b5f4
                        return function (d) {
                            if (isDragging) {
                                return;
                            }

                            node
                                .select("circle")
                                .transition("fade")
                                .duration(hoverTransitionDuration)
                                .style("stroke-opacity", o => isConnected(d, o) ? 1 : strokeOpacity)
                                .style("fill-opacity", o => isConnected(d, o) ? 1 : fillOpacity)
                                .style("filter", function (o) {
                                    if (isHoverMode) {
                                        if (o.key === d.key) {
                                            return getFilterSelected(o)
                                        } else {
                                            return isConnected(d, o) ? getFilter(o) : "";
                                        }
                                    } else {
                                        return getFilter(o);
                                    }
                                })
                            ;
                            node
                                .select("text")
                                .transition("fade")
                                .duration(hoverTransitionDuration)
                                .style("opacity", o => isConnected(d, o) ? 1 : strokeOpacity)
                            ;
                            link
                                .transition("fade")
                                .duration(hoverTransitionDuration)
                                .style("opacity", l => isPartOfLink(d, l) ? 1 : linkOpacity)
                            ;
                        };
                    }

                    function fadeLink(fillOpacity, strokeOpacity, textOpacity, linkOpacity, isHoverMode) {
                        return function (l) {
                            if (isDragging) {
                                return;
                            }

                            node
                                .select("circle")
                                .transition("fade")
                                .duration(hoverTransitionDuration)
                                .style("stroke-opacity", o => isPartOfLink(o, l) ? 1 : strokeOpacity)
                                .style("fill-opacity", o => isPartOfLink(o, l) ? 1 : fillOpacity)
                                .style("filter", function (o) {
                                    if (isHoverMode) {
                                        return isPartOfLink(o, l) ? getFilterSelected(o) : "";
                                    } else {
                                        return getFilter(o);
                                    }
                                })
                            ;
                            node
                                .select("text")
                                .transition("fade")
                                .duration(hoverTransitionDuration)
                                .style("opacity", o => isPartOfLink(o, l) ? 1 : strokeOpacity)
                            ;
                            link
                                .transition("fade")
                                .duration(hoverTransitionDuration)
                                .style("opacity", l2 => isPartOfLink(l2.source, l) && isPartOfLink(l2.target, l) ? 1 : linkOpacity)
                            ;
                        };
                    }

                    var padding = this.padding;
                    var width = this.width;
                    var labelFontSizePixels = this.labelFontSizePixels;
                    var linkOffsetForArrow = this.linkOffsetForArrow;
                    var yearHeight = this.yearHeight;

                    function tickActions() {
                        node
                            .attr("cx", d => d.x = Math.max(d.radius + padding, Math.min(width - d.radius - padding, d.x)))
                            .attr("cy", d => d.y = Math.max(d.radius + padding + yearHeight * d.yearIndex,
                                Math.min(yearHeight * (d.yearIndex + 1) - d.radius - labelFontSizePixels - 12, d.y)))
                            .attr("transform", d => "translate(" + d.x + "," + d.y + ")")
                        ;

                        function tickLink(l) {
                            function getPathLength(d) {
                                var diffX = d.target.x - d.source.x,
                                    diffY = d.target.y - d.source.y;
                                return [diffX, diffY, Math.sqrt((diffX * diffX) + (diffY * diffY))];
                            }

                            l
                                .attr("x1", function (d) {
                                    var temp = getPathLength(d);
                                    var diffX = temp[0],
                                        diffY = temp[1],
                                        pathLength = temp[2];
                                    var offsetX = diffX * d.source.radius / pathLength;
                                    return d.source.x + offsetX;
                                })
                                .attr("y1", function (d) {
                                    var temp = getPathLength(d);
                                    var diffX = temp[0],
                                        diffY = temp[1],
                                        pathLength = temp[2];
                                    var offsetY = diffY * d.source.radius / pathLength;
                                    return d.source.y + offsetY;
                                })
                                .attr("x2", function (d) {
                                    var temp = getPathLength(d);
                                    var diffX = temp[0],
                                        diffY = temp[1],
                                        pathLength = temp[2];
                                    var offsetX = diffX * (d.target.radius + linkOffsetForArrow) / pathLength;
                                    return d.target.x - offsetX;
                                })
                                .attr("y2", function (d) {
                                    var temp = getPathLength(d);
                                    var diffX = temp[0],
                                        diffY = temp[1],
                                        pathLength = temp[2];
                                    var offsetY = diffY * (d.target.radius + linkOffsetForArrow) / pathLength;
                                    return d.target.y - offsetY;
                                })
                        }

                        tickLink(visibleLink);
                        tickLink(hoverLink);
                    }
                },
                {
                    deep: true
                }
            );
        }
    }
</script>

<style>
    #visualization {
        height: 100%;
        width: 100%;
    }
</style>
