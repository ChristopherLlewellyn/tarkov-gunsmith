import Vue from 'vue';
import Router from 'vue-router';
import SignIn from './views/SignIn.vue';
import SignUp from './views/SignUp.vue';
import CreateLoadout from './views/CreateLoadout.vue';
import MyLoadouts from './views/MyLoadouts.vue';
import EditLoadout from './views/EditLoadout.vue';
import SearchLoadouts from './views/SearchLoadouts.vue';
import ViewLoadout from './views/ViewLoadout.vue';
import ResetPassword from './views/ResetPassword.vue';
import ConfirmPasswordReset from './views/ConfirmPasswordReset.vue';
import ConfirmEmail from './views/ConfirmEmail.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'search',
      component: SearchLoadouts,
      meta: { title: 'Search - Tarkov Armory' },
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: SignIn,
      meta: { title: 'Sign In - Tarkov Armory' },
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: SignUp,
      meta: { title: 'Sign Up - Tarkov Armory' },
    },
    {
      path: '/confirm-email/:token',
      name: 'confirm-email',
      component: ConfirmEmail,
      meta: { title: 'Confirm Email - Tarkov Armory' },
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: ResetPassword,
      meta: { title: 'Reset Password - Tarkov Armory' },
    },
    {
      path: '/confirm-password-reset/:token',
      name: 'confirm-password-reset',
      component: ConfirmPasswordReset,
      meta: { title: 'Confirm - Tarkov Armory' },
    },
    {
      path: '/loadout/:id',
      name: 'view-loadout',
      component: ViewLoadout,
      meta: { title: 'Loadout - Tarkov Armory' },
    },
    {
      path: '/create-loadout',
      name: 'create-loadout',
      component: CreateLoadout,
      meta: { title: 'Create Loadout - Tarkov Armory' },
    },
    {
      path: '/my-loadouts',
      name: 'my-loadouts',
      component: MyLoadouts,
      meta: { title: 'My Loadouts - Tarkov Armory' },
    },
    {
      path: '/my-loadouts/edit/:id',
      name: 'my-loadouts-edit',
      component: EditLoadout,
      meta: { title: 'Edit Loadout - Tarkov Armory' },
    },
  ],
});
