<template>
    <svg
        v-if="hasPapers"
        id="info-visualization"
        :viewBox="viewBox"
    ></svg>
    <p
        v-else
        class="information"
    >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea,
        nostrum odio. Dolores, sed accusantium quasi non, voluptas eius illo quas,
        saepe voluptate pariatur in deleniti minus sint. Excepturi.
    </p>
</template>

<script>
    import * as d3 from "d3";

    export default {
        name: "Information",
        data: () => ({
            svg: null,
            width: 0,
            height: 0,
            defaultStrokeOpacity: 0.5,
        }),
        computed: {
            viewBox() {
                return "0 0 " + this.height + " " + this.width;
            },
            minimumReferencedGlobal() {
                return this.$store.state.minimumReferencedGlobal;
            },
            maximumReferencedGlobal() {
                return this.$store.state.maximumReferencedGlobal;
            },
            minimumReferencedLocal() {
                return this.$store.state.minimumReferencedLocal;
            },
            maximumReferencedLocal() {
                return this.$store.state.maximumReferencedLocal;
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
            hasPapers() {
                return this.$store.state.addedPapers.length > 0;
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

                    this.svg = d3.select("svg#info-visualization");
                    this.svg.selectAll("*").remove();

                    this.svg
                        .attr("width", this.width)
                        .attr("height", this.height)
                    ;

                    var averageRadius = this.radiusScale(this.minimumReferencedGlobal + 1) / 2
                        + (this.radiusScale(this.maximumReferencedGlobal + 1) / 2);
                    var averageColor = this.colorScale(this.minimumReferencedLocal / 2
                        + this.maximumReferencedLocal / 2);
                    
                    this.svg
                        .append("circle")
                        .attr("r", averageRadius)
                        .attr("fill", this.colorScale(this.minimumReferencedLocal))
                        .attr("stroke", "black")
                        .attr("stroke-opacity", this.defaultStrokeOpacity)
                        .attr("cx", -100)
                        .attr("cy", averageRadius)
                    ;
                    this.svg
                        .append("circle")
                        .attr("r", averageRadius)
                        .attr("fill", averageColor)
                        .attr("stroke", "black")
                        .attr("stroke-opacity", this.defaultStrokeOpacity)
                        .attr("cx", -100 + averageRadius)
                        .attr("cy", averageRadius)
                    ;
                    this.svg
                        .append("circle")
                        .attr("r", averageRadius)
                        .attr("fill", this.colorScale(this.maximumReferencedLocal))
                        .attr("stroke", "black")
                        .attr("stroke-opacity", this.defaultStrokeOpacity)
                        .attr("cx", -100 + averageRadius * 2)
                        .attr("cy", averageRadius)
                    ;

                    this.svg
                        .append("circle")
                        .attr("r", this.radiusScale(this.minimumReferencedGlobal + 1))
                        .attr("fill", averageColor)
                        .attr("stroke", "black")
                        .attr("stroke-opacity", this.defaultStrokeOpacity)
                        .attr("cx", -100)
                        .attr("cy", averageRadius * 3)
                    ;
                    this.svg
                        .append("circle")
                        .attr("r", averageRadius)
                        .attr("fill", averageColor)
                        .attr("stroke", "black")
                        .attr("stroke-opacity", this.defaultStrokeOpacity)
                        .attr("cx", -100 + averageRadius)
                        .attr("cy", averageRadius * 3)
                    ;
                    this.svg
                        .append("circle")
                        .attr("r", this.radiusScale(this.maximumReferencedGlobal + 1))
                        .attr("fill", averageColor)
                        .attr("stroke", "black")
                        .attr("stroke-opacity", this.defaultStrokeOpacity)
                        .attr("cx", -100 + averageRadius * 3)
                        .attr("cy", averageRadius * 3)
                    ;
                },
                {
                    deep: true
                }
            );
        }
    }
</script>

<style scoped>
    .information {
        padding: 0 20px;
    }
</style>
