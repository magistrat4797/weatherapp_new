import Vue from 'vue';
import Router from 'vue-router';
import FrontPage from './views/FrontPage.vue';
import Weather from './components/Weather.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'FrontPage',
      component: FrontPage,
    },
    {
      path: '/weather',
      name: 'Weather',
      component: Weather,
      props: true,
    },
  ],
});
