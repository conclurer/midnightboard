import Vue from 'vue';
import Router from 'vue-router';

import RouterView from '@/views/RouterView.vue';
import { i18n } from '@/main.js';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    //check for language prefix (i.e /en/ or /de/). Default to /en/ if no valid prefix was found
    path: '/:lang/',
    component: RouterView, //empty router object. Do not delete.
    beforeEnter(to,from,next){
      const lang = to.params.lang;
      //redirect to empty /en page
      //TODO replace '/en' with usefull language info or 404 page
      if (!['en', 'de'].includes(lang)) { return next('/en'); }
      if (i18n.locale !== lang) {
        i18n.locale = lang;
      }
      return next();
    },

    children: [
      {
        path: 'about',
        name: 'About',
        component: () => import ('../views/About.vue')
      },
      {
        path: 'home',
        name: 'Home',
        component: () => import ('../views/NoticeBoard.vue')
      }
    ]

  },
  //Redirect to 404 page if trying to visit invalid path
  {
    path: '*',
    //redirect: '/en/home'
    component: () => import ('../views/404.vue')
  }
  ]
});
