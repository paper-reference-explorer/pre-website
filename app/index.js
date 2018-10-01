import 'styles/index.scss';

import Vue from 'vue';
import App from './components/App.vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import Vuex from 'vuex';
import 'es6-promise/auto';

Vue.use(Vuetify);
Vue.use(Vuex);

var store = new Vuex.Store({
    state: {},
    getters : {},
    mutations: {},
    actions : {}
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    template: '<App/>',
    components: {App},
});
