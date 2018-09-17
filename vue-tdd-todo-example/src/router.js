import Vue from 'vue'
import Router from 'vue-router'
import Active from './views/Active.vue'
import History from './views/History.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/', redirect: '/vue-tdd-todo-example'},
    {path: '/vue-tdd-todo-example', name: 'active', component: Active},
    {path: '/vue-tdd-todo-example/history', name: 'history', component: History},
  ],
})
