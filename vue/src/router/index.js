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
      // Change locale to prefered locale, if available within local storage
      // If not, change to browser locale
      if (window.localStorage.getItem('mnb_lang')) {
        i18n.locale = window.localStorage.getItem('mnb_lang')
      } else {
        var lang = window.navigator.userLanguage || window.navigator.language
        if (!I18N_LANGUAGES.includes(lang)) { i18n.locale = 'en-GB' } else {
          if (i18n.locale !== lang) { i18n.locale = lang }
        }
      }
      return next()
    },

    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/NoticeBoard.vue')
      },
      {
        path: 'boards/:boardId',
        name: 'Board',
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
      },
      {
        path: 'cms',
        name: 'CMS',
        component: () => import('../views/CMS.vue'),
        beforeEnter: (to, from, next) => {
          if (window.localStorage.getItem('mnb_rid') !== '0') { next({ name: 'Login' }) } else next()
        },
        children: [
          {
            path: 'users/list',
            name: 'cms_users_list',
            component: () => import('../components/cms/UserList.vue')
          },
          {
            path: 'users/add',
            name: 'cms_users_add',
            component: () => import('../components/cms/AddUser.vue')
          },
          {
            path: 'users/permissions',
            name: 'cms_users_permissions',
            component: () => import('../components/cms/PermissionPanel.vue')
          },
          {
            path: 'boards/list',
            name: 'cms_boards_list',
            component: () => import('../components/cms/BoardList.vue')
          },
          {
            path: 'boards/add',
            name: 'cms_boards_add',
            component: () => import('../components/cms/AddBoard.vue')
          }
        ]
      },
      {
        path: 'profile/:userId',
        name: 'Profile',
        props: true,
        component: () => import('../views/ProfilePage.vue'),
        beforeEnter: (to, from, next) => {
          if (!window.localStorage.getItem('mnb_atok')) { next({ name: 'Login' }) } else next()
        }
      }

    ]

  },
  // Redirect to 404 page if trying to visit invalid path
  {
    path: '*',
    redirect: { name: 'NotFound' }
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('../views/404.vue')
  }
  ]
})
