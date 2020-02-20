import Vue from 'vue';
import Router from 'vue-router';
import SignIn from './views/SignIn.vue';
import SignUp from './views/SignUp.vue';
import CreateLoadout from './views/CreateLoadout.vue';
import MyLoadouts from './views/MyLoadouts.vue';
import EditLoadout from './views/EditLoadout.vue';
import SearchLoadouts from './views/SearchLoadouts.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'search',
      component: SearchLoadouts,
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: SignIn,
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: SignUp,
    },
    {
      path: '/create-loadout',
      name: 'create-loadout',
      component: CreateLoadout,
    },
    {
      path: '/my-loadouts',
      name: 'my-loadouts',
      component: MyLoadouts,
    },
    {
      path: '/my-loadouts/edit/:id',
      name: 'my-loadouts-edit',
      component: EditLoadout,
    },
  ],
});
