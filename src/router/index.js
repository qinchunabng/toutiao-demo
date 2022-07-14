import Vue from 'vue'
import VueRouter from 'vue-router' 
import Vant from 'vant'
import 'vant/lib/index.css'
import Home from '@/views/Home/Home.vue'
import User from '@/views/User/User.vue'

Vue.use(VueRouter)
Vue.use(Vant)

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home },
  { path: '/user', component: User }
]

const router = new VueRouter({
  routes
})

export default router
