import Vue from 'vue';
import Vuex from "vuex";
import axios from 'axios';
import {addedPapersExample, graphPapersExample} from './example-data.js';

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

var store = new Vuex.Store({
    state: {
        graphPapers: [],
        addedPapers: [],
        isDrawerOpen: true,
        isAboutVisible: false
    },
    mutations: {
        ADD_PAPER(state, paper) {
            state.addedPapers.push(paper);
        },
        SET_GRAPH_PAPERS(state, graphPapers) {
            state.graphPapers = graphPapers;
        },
        REMOVE_PAPER(state, index) {
            state.addedPapers.splice(index, 1);
        },
        REMOVE_ALL_PAPERS(state) {
            state.addedPapers = [];
        },
        SET_DRAWER_STATUS(state, value) {
            state.isDrawerOpen = value;
        },
        SET_ABOUT_STATUS(state, value) {
            state.isAboutVisible = value;
        }
    },
    actions: {
        addPaper({commit, state}, paper) {
            commit("ADD_PAPER", paper);
            updateReferences(state.addedPapers,
                (response) => {
                    let graphPapers = response.data.papers;
                    commit("SET_GRAPH_PAPERS", graphPapers);
                },
                (error) => {
                },
                () => {
                }
            );
        },
        removePaper({commit, state}, index) {
            commit("REMOVE_PAPER", index);
            if (state.addedPapers.length === 0) {
                commit("SET_GRAPH_PAPERS", []);
            } else {
                updateReferences(state.addedPapers,
                    (response) => {
                        let graphPapers = response.data.papers;
                        commit("SET_GRAPH_PAPERS", graphPapers);
                    },
                    (error) => {
                    },
                    () => {
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
        }
    }
});

export default store;
