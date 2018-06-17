import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Register from '@/components/Register'
import SignIn from '@/components/SignIn'
import SeminerRegist from '@/components/SeminerRegist'
import ProfileRegist from '@/views/ProfileRegist'
import MainPage from '@/views/MainPage'
import Full from '@/container/Full'

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
          path: 'seminerregist',
          name: 'SeminerRegist',
          component: SeminerRegist
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
// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'SignIn',
//       component: SignIn
//     },
//     {
//       path: '/register',
//       name: 'Register',
//       component: Register
//     },
//     {
//       path: '/profileregist',
//       name: 'ProfileRegist',
//       component: ProfileRegist
//     },
//     {
//       path: '/mianpage',
//       name: 'MainPage',
//       component: MainPage
//     }
//   ]
// })
