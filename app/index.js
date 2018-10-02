import 'styles/index.scss';

import Vue from 'vue';
import App from './components/App.vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import store from 'store.js';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

Vue.use(Vuetify);
var mock = new MockAdapter(axios, {delayResponse: 500});

mock.onGet('/search').reply(200, {
    papers: [
        {"key": "A_my", "authors": "A et al.", "title": "My first paper", "year": "2018"},
        {"key": "B_friendly", "authors": "B et al.", "title": "Friendly paper", "year": "2018"},
        {"key": "C_another", "authors": "C et al.", "title": "Another friendly paper", "year": "2016"},
        {"key": "D_old", "authors": "D et al.", "title": "Old paper", "year": "2013"},
        {"key": "E_older", "authors": "E et al.", "title": "Older paper", "year": "2012"},
        {"key": "F_young", "authors": "F et al.", "title": "Young paper", "year": "2016"}
    ]
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    template: '<App/>',
    components: {App},
});
