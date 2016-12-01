import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './pages/Home.vue'
import Pokemon from './pages/Pokemon.vue'
import NotFound from './pages/NotFound.vue'

Vue.use(VueRouter);

const routes = [
  {path: '/', component: Home},
  {path: '/pokemon/:id', component: Pokemon},
  {path: '*', component: NotFound},
];

export default new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});