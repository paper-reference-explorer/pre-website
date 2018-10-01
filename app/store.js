import Vue from 'vue';
import Vuex from "vuex";

Vue.use(Vuex);

var store = new Vuex.Store({
    state: {
        graphPapers: null,
        addedPapers: [
            {"authors": "A et al.", "title": "My first paper", "date-created": "2018-09-01"},
            {"authors": "B et al.", "title": "Friendly paper", "date-created": "2018-04-23"},
            {"authors": "C et al.", "title": "Another friendly paper", "date-created": "2016-12-05"}
        ],
        isDrawerOpen: true,
        isAboutVisible: false
    },
    mutations: {
        REMOVE_PAPER(state, index) {
            state.addedPapers.splice(index, 1);
        },
        SET_DRAWER_STATUS(state, value) {
            state.isDrawerOpen = value;
        },
        SET_ABOUT_STATUS(state, value) {
            state.isAboutVisible = value;
        }
    },
    actions: {
        removePaper({commit}, index) {
            commit("REMOVE_PAPER", index);
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
