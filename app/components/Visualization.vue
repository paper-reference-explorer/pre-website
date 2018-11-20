<template>
    <svg
        id="visualization"
        :viewBox="viewBox"
    ></svg>
</template>

<script>
    import * as d3 from "d3";

    export default {
        name: 'Visualization',
        data: () => ({
            svg: null,
            width: 0,
            height: 0,
            minimumRadius: 20,
            maximumRadius: 50,
            padding: 8,
            colorMin: "white",
            colorMax: "#9C27B0",
            maxTitleLength: 20,
            collisionRadius: 100,
            hoverRadius: 100,
            labelFontSizePixels: 20,
            defaultTextOpacity: 0.85,
            defaultStrokeOpacity: 0.5,
            arrowSize: 4,
            hoverTransitionDuration: 250,
            isDragging: false,
            colorScale: null,
            shadowColorScale: null,
            nodesData: [
                {
                    "key": "A_my",
                    "authors": "A et al.",
                    "title": "My first paper",
                    "date-created": "2018-09-01",
                    "referenced-n-times-global": 0,
                    "referenced-n-times-local": 0,
                    "year": 2
                },
                {
                    "key": "B_friendly",
                    "authors": "B et al.",
                    "title": "Friendly paper",
                    "date-created": "2018-04-23",
                    "referenced-n-times-global": 5,
                    "referenced-n-times-local": 0,
                    "year": 2
                },
                {
                    "key": "F_young",
                    "authors": "F et al.",
                    "title": "Young paper",
                    "date-created": "2016-02-16",
                    "referenced-n-times-global": 37,
                    "referenced-n-times-local": 1,
                    "year": 1
                },
                {
                    "key": "C_another",
                    "authors": "C et al.",
                    "title": "Another friendly paper",
                    "date-created": "2016-12-05",
                    "referenced-n-times-global": 8,
                    "referenced-n-times-local": 0,
                    "year": 1
                },
                {
                    "key": "D_old",
                    "authors": "D et al.",
                    "title": "Old paper",
                    "date-created": "2013-04-01",
                    "referenced-n-times-global": 236,
                    "referenced-n-times-local": 2,
                    "year": 0
                },
                {
                    "key": "E_older",
                    "authors": "E et al.",
                    "title": "Older paper",
                    "date-created": "2012-08-13",
                    "referenced-n-times-global": 412,
                    "referenced-n-times-local": 1,
                    "year": 0
                }
            ],
            linksData: [
                {"source": "A_my", "target": "D_old"},
                {"source": "B_friendly", "target": "D_old"},
                {"source": "B_friendly", "target": "E_older"},
                {"source": "C_another", "target": "F_young"},
            ]
        }),
        computed: {
            viewBox() {
                return "0 0 " + this.height + " " + this.width;
            },
            defs() {
                return this.svg.append("defs");
            }
        },
        methods: {
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
            }
        },
        mounted() {
            this.svg = d3.select("svg");

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

                    var minimumReferencedGlobal = Math.min.apply(Math, this.nodesData.map(p => p["referenced-n-times-global"]));
                    var maximumReferencedGlobal = Math.max.apply(Math, this.nodesData.map(p => p["referenced-n-times-global"]));
                    var minimumReferencedLocal = Math.min.apply(Math, this.nodesData.map(p => p["referenced-n-times-local"]));
                    var maximumReferencedLocal = Math.max.apply(Math, this.nodesData.map(p => p["referenced-n-times-local"]));
                    var nYears = Math.max.apply(Math, this.nodesData.map(p => p["year"])) + 1;

                    var labelFontSizeString = this.labelFontSizePixels + "px",
                        linkOffsetForArrow = this.arrowSize * 4
                    ;

                    var radiusScale = d3.scaleLog()
                        .domain([minimumReferencedGlobal + 1, maximumReferencedGlobal + 1]) // must not be zero => + 1
                        .range([this.minimumRadius, this.maximumRadius]);

                    this.colorScale = d3.scaleLinear()
                        .domain([minimumReferencedLocal, maximumReferencedLocal])
                        .range([this.colorMin, this.colorMax]);

                    this.shadowColorScale = d3.scaleLinear()
                        .domain([minimumReferencedLocal, maximumReferencedLocal])
                        .range(["black", this.colorMax]);

                    this.nodesData.forEach(p => p.radius = radiusScale(p["referenced-n-times-global"] + 1));

                    var yearHeight = this.height / nYears;

                    var force = d3
                        .forceSimulation()
                        .nodes(this.nodesData)
                        .alpha(0.25)
                        .alphaMin(0.05)
                        .on("end", function () {
                            force.force("collision_force", null);
                            force.force("position_force_Y", null);
                            force.force("position_force_X", null);
                            force.force("link_force", null);
                        })
                    ;

                    force
                        .force("collision_force", d3.forceCollide(this.collisionRadius).strength(1))
                        .force("link_force", d3.forceLink(this.linksData).id(d => d.key).strength(0.1))
                        .force("position_force_Y", d3.forceY(d => yearHeight * (d.year + 0.5)).strength(3))
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

                    var arrowSize = this.arrowSize;
                    var that = this;

                    var node = this.svg
                        .append("g")
                        .attr("class", "nodes")
                        .selectAll("circle")
                        .data(this.nodesData)
                        .enter()
                        .append("g")
                        .on("mouseover", fadeNode(0.5, 0.1, 0.5, 0.25, true))
                        .on("mouseout", fadeNode(1.0, 1.0, 1.0, 1.0, false))
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
                        .style("font-size", labelFontSizeString)
                        .style("font", "Roboto")
                        .text(d => d.title.length > this.maxTitleLength ? d.title.substring(0, this.maxTitleLength) + "…" : d.title)
                        .style("opacity", this.defaultTextOpacity)
                    ;

                    var linksData = this.linksData;

                    function isConnected(a, b) {
                        return linksData.some(function (l) {
                            return a.key === b.key
                                || (l.source.key === a.key && l.target.key === b.key)
                                || (l.source.key === b.key && l.target.key === a.key);
                        });
                    }

                    function isPartOfLink(n, l) {
                        return n.key === l.source.key || n.key === l.target.key;
                    }

                    var hoverTransitionDuration = 250;
                    var isDragging = false;

                    var getFilterSelected = this.getFilterSelected;
                    var getFilter = this.getFilter;

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


                    force.on("tick", tickActions);

                    var padding = this.padding;
                    var width = this.width;
                    var labelFontSizePixels = this.labelFontSizePixels;

                    function tickActions() {
                        node
                            .attr("cx", d => d.x = Math.max(d.radius + padding, Math.min(width - d.radius - padding, d.x)))
                            .attr("cy", d => d.y = Math.max(d.radius + padding + yearHeight * d.year,
                                Math.min(yearHeight * (d.year + 1) - d.radius - labelFontSizePixels - 12, d.y)))
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

                    var drag_handler = d3
                        .drag()
                        .on("start", drag_start)
                        .on("drag", drag_drag)
                        .on("end", drag_end);

                    drag_handler(node);

                    function drag_start(d) {
                        if (!d3.event.active) {
                            force.alphaTarget(0.3).restart();
                        }
                        isDragging = true;
                        d.fx = d.x;
                        d.fy = d.y;
                    }

                    function drag_drag(d) {
                        d.fx = d3.event.x;
                        d.fy = d3.event.y;
                    }

                    function drag_end(d) {
                        if (!d3.event.active) {
                            force.alphaTarget(0);
                        }
                        isDragging = false;
                        d.fx = null;
                        d.fy = null;
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
