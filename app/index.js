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
        {"authors": "A et al.", "title": "My first paper", "date-created": "2018-09-01"},
        {"authors": "B et al.", "title": "Friendly paper", "date-created": "2018-04-23"},
        {"authors": "C et al.", "title": "Another friendly paper", "date-created": "2016-12-05"},
        {"authors": "D et al.", "title": "Old paper", "date-created": "2013"},
        {"authors": "E et al.", "title": "Older paper", "date-created": "2012"},
        {"authors": "F et al.", "title": "Young paper", "date-created": "2016-02-16"}
    ]
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    template: '<App/>',
    components: {App},
});
