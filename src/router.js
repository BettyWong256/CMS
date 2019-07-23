import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: 'detail-*',
      name: 'detail',
      component: () => import(/* webpackChunkName: "common" */ './views/Detail.vue')
    },
    {
      path: '*',
      name: 'common',
      component: () => import(/* webpackChunkName: "common" */ './views/Common.vue')
    }
  ]
})
