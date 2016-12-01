import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Home from './pages/Home.vue'
import Pokemon from './pages/Pokemon.vue'

Vue.use(VueRouter);

const routes = [
  {path: '/', component: Home},
  {path: '/pokemon/:id', component: Pokemon},
];

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});

new Vue({ // eslint-disable-line no-new
  el: '#app',
  render: (h) => h(App),
  router,
})
