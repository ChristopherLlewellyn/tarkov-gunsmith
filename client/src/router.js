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
      path: '/confirm-email/:token',
      name: 'confirm-email',
      component: ConfirmEmail,
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: ResetPassword,
    },
    {
      path: '/confirm-password-reset/:token',
      name: 'confirm-password-reset',
      component: ConfirmPasswordReset,
    },
    {
      path: '/loadout/:id',
      name: 'view-loadout',
      component: ViewLoadout,
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
