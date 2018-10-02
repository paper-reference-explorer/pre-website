import Vue from 'vue';
import Vuex from "vuex";
import axios from 'axios';

Vue.use(Vuex);

var store = new Vuex.Store({
    state: {
        graphPapers: [],
        addedPapers: [
            {"key": "A_my", "authors": "A et al.", "title": "My first paper", "year": "2018"},
            {"key": "B_friendly", "authors": "B et al.", "title": "Friendly paper", "year": "2018"},
            {"key": "C_another", "authors": "C et al.", "title": "Another friendly paper", "year": "2016"}
        ],
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
            let keys = state.addedPapers.map(p => p.key);
            axios.get('/references', {params: {papers: keys}})
                .then((response) => {
                    let graphPapers = response.data.papers;
                    commit("SET_GRAPH_PAPERS", graphPapers);
                })
                .catch((error) => {
                    console.log(error);
                })
                .then(() => {
                });
        },
        removePaper({commit}, index) {
            commit("REMOVE_PAPER", index);
        },
        removeAllPapers({commit}) {
            commit("REMOVE_ALL_PAPERS");
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
