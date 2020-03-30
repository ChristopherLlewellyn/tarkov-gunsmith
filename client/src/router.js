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
import TreeTest from './views/TreeTest.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/treetest',
      name: 'treetest',
      component: TreeTest,
      meta: { title: 'treetest - TarkovArmory' },
    },
    {
      path: '/',
      name: 'search',
      component: SearchLoadouts,
      meta: { title: 'Search - TarkovArmory' },
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: SignIn,
      meta: { title: 'Sign In - TarkovArmory' },
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: SignUp,
      meta: { title: 'Sign Up - TarkovArmory' },
    },
    {
      path: '/confirm-email/:token',
      name: 'confirm-email',
      component: ConfirmEmail,
      meta: { title: 'Confirm Email - TarkovArmory' },
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: ResetPassword,
      meta: { title: 'Reset Password - TarkovArmory' },
    },
    {
      path: '/confirm-password-reset/:token',
      name: 'confirm-password-reset',
      component: ConfirmPasswordReset,
      meta: { title: 'Confirm - TarkovArmory' },
    },
    {
      path: '/loadout/:id',
      name: 'view-loadout',
      component: ViewLoadout,
      meta: { title: 'Loadout - TarkovArmory' },
    },
    {
      path: '/create-loadout',
      name: 'create-loadout',
      component: CreateLoadout,
      meta: { title: 'Create Loadout - TarkovArmory' },
    },
    {
      path: '/my-loadouts',
      name: 'my-loadouts',
      component: MyLoadouts,
      meta: { title: 'My Loadouts - TarkovArmory' },
    },
    {
      path: '/my-loadouts/edit/:id',
      name: 'my-loadouts-edit',
      component: EditLoadout,
      meta: { title: 'Edit Loadout - TarkovArmory' },
    },
  ],
});
