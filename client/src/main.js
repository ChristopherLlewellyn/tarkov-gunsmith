import Vue from 'vue';
import Vuetify from 'vuetify';
import { sync } from 'vuex-router-sync';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import { TiptapVuetifyPlugin } from 'tiptap-vuetify'
import VueAnalytics from 'vue-analytics';

Vue.config.productionTip = false;

Vue.use(Vuetify);

Vue.use(TiptapVuetifyPlugin, {
  // the next line is important! You need to provide the Vuetify Object to this place.
  vuetify, // same as "vuetify: vuetify"
  // optional
  iconsGroup: 'mdi'
})

Vue.use(VueAnalytics, {
  id: 'UA-169217097-1',
  router
});

sync(store, router);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
