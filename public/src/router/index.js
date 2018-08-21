import Vue from 'vue'
import Router from 'vue-router'
import Full from '@/container/Full'
import Register from '@/views/Register'
import SignIn from '@/views/SignIn'
import SeminerRegist from '@/views/SeminerRegist'
import SeminerMyList from '@/views/SeminerMyList'
import ProfileRegist from '@/views/ProfileRegist'
import Profile from '@/views/Profile'
import DushBoard from '@/views/DushBoard'
import SeminerDetail from '@/views/SeminerDetail'
import MainPage from '@/views/MainPage'

import firebaseApp from './../../firebase_setup'

Vue.use(Router)

let router = new Router({
  mode: 'hash',
  linkActiveClass: 'open active',
  routes: [
    {
      path: '/',
      name: 'full',
      component: Full,
      meta: {
        requiresAuth: true
      },
      redirect: 'mainpage',
      children: [
        {
          path: 'mainpage',
          name: 'MainPage',
          component: MainPage
        },
        {
          path: 'seminer-regist',
          name: 'SeminerRegist',
          component: SeminerRegist
        },
        {
          path: 'seminer-my-list',
          name: 'SeminerMyList',
          component: SeminerMyList
        },
        {
          path: 'dush-board',
          name: 'DushBoard',
          component: DushBoard
        },
        {
          path: 'profile',
          name: 'Profile',
          component: Profile
        },
        {
          path: 'seminer-detail',
          name: 'SeminerDetail',
          component: SeminerDetail
        }
      ]
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/profileregist',
      name: 'ProfileRegist',
      component: ProfileRegist
    }
  ]
})

router.beforeEach((to, from, next) => {
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  let currentUser = firebaseApp.auth().currentUser
  console.log('currentUser::::', currentUser)
  console.log('requireAuth::::', requiresAuth)
  if (requiresAuth && !currentUser) {
    next({ name: 'SignIn' })
  // } else if (currentUser && !currentUser.displayName) {
  //   next({ name: 'ProfileRegist' })
  } else if (!requiresAuth && currentUser) {
    next()
  } else {
    next()
  }
})
export default router
