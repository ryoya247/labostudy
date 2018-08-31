import Vue from 'vue'
import Router from 'vue-router'
import Full from '@/container/Full'

import Register from '@/views/Register'
import SignIn from '@/views/SignIn'

import SeminerList from '@/views/SeminerList'
import SeminerRegist from '@/views/SeminerRegist'
import SeminerDetail from '@/views/SeminerDetail'

import Profile from '@/views/Profile'
import ProfileRegist from '@/views/ProfileRegist'

import DushBoard from '@/views/DushBoard'

import User from '@/views/User'

import firebaseApp from './../../firebase_setup'

Vue.use(Router)

let router = new Router({
  mode: 'hash',
  linkActiveClass: 'open active',
  routes: [
    {
      path: '/',
      redirect: 'seminer',
      name: 'full',
      component: Full,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: 'seminer',
          redirect: 'seminer/list',
          name: 'Seminer',
          component: {
            render (c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: 'list',
              name: 'SeminerList',
              component: SeminerList
            },
            {
              path: 'regist',
              name: 'SeminerRegist',
              component: SeminerRegist
            },
            {
              path: 'detail',
              name: ':seminerId',
              component: {
                render (c) {
                  return c('router-view')
                }
              },
              children: [
                {
                  path: ':seminerId',
                  name: 'SeminerDetail',
                  component: SeminerDetail
                }
              ]
            }
          ]
        },
        {
          path: 'dushboard',
          name: 'DushBoard',
          component: DushBoard
        },
        {
          path: 'profile',
          name: 'Profile',
          component: Profile
        },
        {
          path: 'user',
          name: ':userId',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: ':userId',
              name: 'User',
              component: User
            }
          ]
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
  } else if (!requiresAuth && currentUser) {
    next()
  } else {
    next()
  }
})
export default router
