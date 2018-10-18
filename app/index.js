import 'styles/index.scss';

import Vue from 'vue';
import App from './components/App.vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import store from 'store.js';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {graphPapersExample} from './example-data.js';

Vue.use(Vuetify);
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
