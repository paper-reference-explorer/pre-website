import 'styles/index.scss';

import Vue from 'vue';
import App from './components/App.vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import store from 'store.js';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {graphPapersExample, allPapersMock} from './example-data.js';

Vue.use(Vuetify);
var mock = new MockAdapter(axios, {delayResponse: 1000});

mock.onGet('/search').reply(200, {papers: allPapersMock});
mock.onGet('/references').reply(200, {papers: graphPapersExample});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    template: '<App/>',
    components: {App},
});
