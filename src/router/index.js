import Vue from 'vue'
import VueRouter from 'vue-router' 
import Home from '@/views/Home/Home.vue'
import User from '@/views/User/User.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home , meta: { isRecord: true, top: 0 }},
  { path: '/user', component: User }
]

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savePosition){
    if(savePosition){
      return savePosition
    }else{
      return { x: 0, y: to.meta.top || 0 }
    }
  }
})

export default router
