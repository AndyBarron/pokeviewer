import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './pages/Home.vue'
import Pokemon from './pages/Pokemon.vue'
import NotFound from './pages/NotFound.vue'
import dex from './pokedex';

Vue.use(VueRouter);

const routes = [
  {path: '/', component: Home},
  {path: '/pokemon/:id', component: Pokemon},
  {path: '*', component: NotFound},
];

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});

router.beforeEach((to, from, next) => {
  dex.queue.length = 0;
  next();
});

export default router;