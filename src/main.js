import Vue from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';
import './styles/styles.styl';
import '@fortawesome/fontawesome-free/css/all.css';

Vue.config.productionTip = false;
window.axios = require('axios');

new Vue({
  router,
  store,
  axios,
  render: h => h(App),
}).$mount('#app');
