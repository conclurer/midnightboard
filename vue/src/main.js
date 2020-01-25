import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

//import i18n
import VueI18n from 'vue-i18n';
import messages from './lang';

Vue.use(VueI18n);
export const i18n = new VueI18n({
  locale: 'en',
  fallbacklocale: 'en',
  messages
});

// import Font Awesome icons
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faFileMedical, faUserCircle, faCog } from '@fortawesome/free-solid-svg-icons';
library.add(faPlus);
library.add(faFileMedical);
library.add(faUserCircle);
library.add(faCog);

Vue.component('font-awesome-icon', FontAwesomeIcon);

// import ES6 style
import {VueMasonryPlugin} from 'vue-masonry';
Vue.use(VueMasonryPlugin);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
