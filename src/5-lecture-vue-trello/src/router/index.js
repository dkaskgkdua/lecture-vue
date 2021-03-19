import Vue from 'vue'
import VueRouter from "vue-router"
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import NotFound from '../components/NotFound.vue'

Vue.use(VueRouter)

// 선언된 순서대로 탐
const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/' , component: Home },
    { path: '/login', component: Login },
    { path: '*', component: NotFound }
  ]
})

export default router
