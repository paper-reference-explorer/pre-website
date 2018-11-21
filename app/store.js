import Vue from 'vue';
import Vuex from "vuex";
import axios from 'axios';
import {addedPapersExample, graphPapersExample, nodesData, linksData} from './example-data.js';
import {constants} from "./config";
import * as d3 from "d3";

Vue.use(Vuex);

function updateReferences(addedPapers, successFunction, errorFunction, finalFunction) {
    let keys = addedPapers.map(p => p.key);
    axios.get('/references', {params: {papers: keys}})
        .then((response) => {
            successFunction(response);
        })
        .catch((error) => {
            console.log(error);
            errorFunction(error);
        })
        .then(() => {
            finalFunction();
        });
}

function updateReferencedNumbers(state) {
    var globalNumbers = state.nodesData.map(p => p["referenced-n-times-global"]);
    var localNumbers = state.nodesData.map(p => p["referenced-n-times-local"]);
    state.minimumReferencedGlobal = Math.min.apply(Math, globalNumbers);
    state.maximumReferencedGlobal = Math.max.apply(Math, globalNumbers);
    state.minimumReferencedLocal = Math.min.apply(Math, localNumbers);
    state.maximumReferencedLocal = Math.max.apply(Math, localNumbers);
    console.log(globalNumbers);
    // must not be zero => + 1
    state.radiusScale = d3.scaleLog()
        .domain([state.minimumReferencedGlobal + 1, state.maximumReferencedGlobal + 1])
        .range([constants.minimumRadius, constants.maximumRadius]);
    console.log(state.radiusScale);
    state.colorScale = d3.scaleLinear()
        .domain([state.minimumReferencedLocal, state.maximumReferencedLocal])
        .range([constants.colorMin, constants.colorMax]);
    state.shadowColorScale = d3.scaleLinear()
        .domain([state.minimumReferencedLocal, state.maximumReferencedLocal])
        .range([constants.colorShadowMin, constants.colorMax]);
}

var store = new Vuex.Store({
    state: {
        graphPapers: [],
        addedPapers: [],
        isDrawerOpen: true,
        isAboutVisible: false,
        isWaitingForGraph: false,
        nodesData: [],
        linksData: [],
        hoveredPapers: [],
        minimumReferencedGlobal: -1,
        maximumReferencedGlobal: -1,
        minimumReferencedLocal: -1,
        maximumReferencedLocal: -1,
        radiusScale: [],
        colorScale: [],
        shadowColorScale: [],
    },
    mutations: {
        ADD_PAPER(state, paper) {
            state.addedPapers.push(paper);
        },
        REMOVE_PAPER(state, index) {
            state.addedPapers.splice(index, 1);
        },
        REMOVE_ALL_PAPERS(state) {
            state.addedPapers = [];
        },
        SET_ADDED_PAPERS(state, addedPapers) {
            state.addedPapers = addedPapers;
        },
        SET_GRAPH_PAPERS(state, graphPapers) {
            state.graphPapers = graphPapers;
            state.nodesData = nodesData;
            state.linksData = linksData;
            updateReferencedNumbers(state);
        },
        SET_DRAWER_STATUS(state, value) {
            state.isDrawerOpen = value;
        },
        SET_ABOUT_STATUS(state, value) {
            state.isAboutVisible = value;
        },
        SET_WAITING_FOR_GRAPH(state, value) {
            state.isWaitingForGraph = value;
        },
        SET_HOVER(state, key) {
            if (!state.hoveredPapers.includes(key)) {
                state.hoveredPapers.push(key);
            }
        },
        REMOVE_HOVER(state, key) {
            for (var index = 0; index < state.hoveredPapers.length; index++) {
                if (state.hoveredPapers[index] === key) {
                    state.hoveredPapers.splice(index, 1);
                }
            }
        }
    },
    actions: {
        addPaper({commit, state}, paper) {
            commit("ADD_PAPER", paper);
            commit("SET_WAITING_FOR_GRAPH", true);
            updateReferences(state.addedPapers,
                (response) => {
                    let graphPapers = response.data.papers;
                    commit("SET_GRAPH_PAPERS", graphPapers);
                },
                (error) => {
                },
                () => {
                    commit("SET_WAITING_FOR_GRAPH", false);
                }
            );
        },
        removePaper({commit, state}, index) {
            commit("REMOVE_PAPER", index);
            if (state.addedPapers.length === 0) {
                commit("SET_GRAPH_PAPERS", []);
            } else {
                commit("SET_WAITING_FOR_GRAPH", true);
                updateReferences(state.addedPapers,
                    (response) => {
                        let graphPapers = response.data.papers;
                        commit("SET_GRAPH_PAPERS", graphPapers);
                    },
                    (error) => {
                    },
                    () => {
                        commit("SET_WAITING_FOR_GRAPH", false);
                    }
                );
            }
        },
        removeAllPapers({commit}) {
            commit("REMOVE_ALL_PAPERS");
            commit("SET_GRAPH_PAPERS", []);
        },
        setDrawerStatus({commit}, value) {
            commit("SET_DRAWER_STATUS", value);
        },
        toggleDrawerStatus({commit, state}) {
            let oldValue = state.isDrawerOpen;
            let newValue = !oldValue;
            commit("SET_DRAWER_STATUS", newValue);
        },
        setAboutStatus({commit}, value) {
            commit("SET_ABOUT_STATUS", value);
        },
        openAbout({commit}) {
            commit("SET_ABOUT_STATUS", true);
        },
        loadExample({commit}) {
            commit("SET_ADDED_PAPERS", addedPapersExample);
            commit("SET_GRAPH_PAPERS", graphPapersExample);
        },
        setHover({commit}, key) {
            commit("SET_HOVER", key);
        },
        removeHover({commit}, key) {
            // receive the key as well in case the next hover is triggered before remove is called
            commit("REMOVE_HOVER", key);
        }
    }
});

export default store;
