import Vue from 'vue';
import Vuetify from 'vuetify';
import { sync } from 'vuex-router-sync';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

Vue.use(Vuetify);
sync(store, router);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');