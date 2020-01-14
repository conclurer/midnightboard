import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

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
  render: h => h(App)
}).$mount('#app');
