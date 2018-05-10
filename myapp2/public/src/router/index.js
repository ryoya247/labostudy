import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Register from '@/components/Register'
import SignIn from '@/components/SignIn'
import ProfileRegist from '@/components/ProfileRegist'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
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
    },
    {
      path: '/mianpage',
      name: 'MainPage',
      component: MainPage
    }
  ]
})
