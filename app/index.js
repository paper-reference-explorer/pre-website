import 'styles/index.scss';

import Vue from 'vue';
import App from './components/App.vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import store from 'store.js';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {graphPapersExample} from './example-data.js';

Vue.use(Vuetify, {
    theme: {
        primary: '#9C27B0',
        secondary: '#00f00f',
        accent: '#FF9800',
    }
});
var mock = new MockAdapter(axios, {delayResponse: 1000})
    .onGet('/references').reply(200, {papers: graphPapersExample})
    .onAny().passThrough();

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    template: '<App/>',
    components: {App},
});
