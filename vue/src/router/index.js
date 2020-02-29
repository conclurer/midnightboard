import Vue from 'vue'
import Router from 'vue-router'

import RouterView from '@/views/RouterView.vue'
import { i18n } from '@/main.js'
import { I18N_LANGUAGES } from '@/lang/index.js'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    component: RouterView, // Empty router object. Do not delete.
    beforeEnter (to, from, next) {
      // Retrieve browser locale
      var lang = window.navigator.userLanguage || window.navigator.language
      // Check if browser locale is supported. Change to 'en-GB' if not.
      if (!I18N_LANGUAGES.includes(lang)) { i18n.locale = 'en-GB' } else {
        if (i18n.locale !== lang) { i18n.locale = lang }
      }
      // alert('lang: ' + lang + '  i18n: ' + i18n.locale);
      return next()
    },

    children: [
      {
        path: 'about',
        name: 'About',
        component: () => import('../views/About.vue')
      },
      {
        path: '',
        name: 'Home',
        component: () => import('../views/NoticeBoard.vue')
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('../views/Login.vue')
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('../views/Register.vue')
      }
    ]

  },
  // Redirect to 404 page if trying to visit invalid path
  {
    path: '*',
    component: () => import('../views/404.vue')
  }
  ]
})
