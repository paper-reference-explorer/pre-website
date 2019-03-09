import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import exampleData from './example-data';

Vue.config.productionTip = false;

Vue.use(Vuetify, {
  theme: {
    primary: '#9C27B0',
    secondary: '#00f00f',
    accent: '#FF9800',
  },
});

new MockAdapter(axios, { delayResponse: 1000 })
  .onGet('/references').reply(200, { papers: exampleData.graphPapersExample })
  .onAny()
  .passThrough();

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
