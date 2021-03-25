import Vue from 'vue'
import VueRouter from "vue-router"
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Board from '../components/Board.vue'
import Card from '../components/Card.vue'
import NotFound from '../components/NotFound.vue'
import store from '../store'

Vue.use(VueRouter)

const requireAuth = (to, from, next) => {
   const loginPath = `/login?rPath=${encodeURIComponent(to.path)}`
   store.getters.isAuth ? next() : next(loginPath)
}

// 선언된 순서대로 탐
const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/' ,
      component: Home,
      beforeEnter: requireAuth
    },
    {
      path: '/login',
      component: Login
    },
    // 중첩 라우팅 설정
    {
      path: '/b/:bid',
      component: Board,
      beforeEnter: requireAuth ,
      children : [
        {
          path : 'c/:cid',
          component: Card,
          beforeEnter: requireAuth
        }
      ]
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})

export default router
