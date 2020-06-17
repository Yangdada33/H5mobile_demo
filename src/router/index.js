import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/hellow',
      name: 'Hellow',
      component: resolve => require(['@/components/HelloWorld.vue'], resolve)
    },
    {
      path: '/index',
      name: 'Index',
      component: resolve => require(['@/page/Index.vue'], resolve)
    },
    {
      path: '/authentication',
      name: 'Authentication',
      component: resolve => require(['@/page/Authentication.vue'], resolve)
    }

  ]
})

export default router
