import Vue from 'vue'
import Router from 'vue-router'
import Active from './views/Active.vue'
import History from './views/History.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/', name: 'active', component: Active},
    {path: '/history', name: 'history', component: History},
  ],
})
