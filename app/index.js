import 'styles/index.scss';

import Vue from 'vue';
import App from './App.vue';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';

Vue.use(VueMaterial);
/* eslint-disable no-new */
new Vue({
    el: '#app',
    template: '<App/>',
    components: {App},
});
