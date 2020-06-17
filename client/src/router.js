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
import DiscordRedirect from './views/DiscordRedirect.vue';
import Account from './views/Account.vue';
import PrivacyPolicy from './views/PrivacyPolicy.vue';
import VirionsLoadouts from './views/VirionsLoadouts.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'search',
      component: SearchLoadouts,
      meta: {
        title: 'Search - Tarkov Gunsmith'
      },
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: SignIn,
      meta: {
        title: 'Sign In - Tarkov Gunsmith'
      },
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: SignUp,
      meta: {
        title: 'Sign Up - Tarkov Gunsmith'
      },
    },
    {
      path: '/confirm-email/:token',
      name: 'confirm-email',
      component: ConfirmEmail,
      meta: {
        title: 'Confirm Email - Tarkov Gunsmith'
      },
    },
    {
      path: '/discord-redirect',
      name: 'discord-redirect',
      component: DiscordRedirect,
      meta: {
        title: 'Discord Auth - Tarkov Gunsmith'
      },
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: ResetPassword,
      meta: {
        title: 'Reset Password - Tarkov Gunsmith'
      },
    },
    {
      path: '/confirm-password-reset/:token',
      name: 'confirm-password-reset',
      component: ConfirmPasswordReset,
      meta: {
        title: 'Confirm - Tarkov Gunsmith'
      },
    },
    {
      path: '/privacy-policy',
      name: 'privacy-policy',
      component: PrivacyPolicy,
      meta: {
        title: 'Privacy Policy - Tarkov Gunsmith'
      },
    },
    {
      path: '/account',
      name: 'account',
      component: Account,
      meta: {
        title: 'Account - Tarkov Gunsmith'
      },
    },
    {
      path: '/loadout/:id',
      name: 'view-loadout',
      component: ViewLoadout,
      meta: {
        title: 'Loadout - Tarkov Gunsmith'
      },
    },
    {
      path: '/create-loadout',
      name: 'create-loadout',
      component: CreateLoadout,
      meta: {
        title: 'Create Loadout - Tarkov Gunsmith'
      },
    },
    {
      path: '/my-loadouts',
      name: 'my-loadouts',
      component: MyLoadouts,
      meta: {
        title: 'My Loadouts - Tarkov Gunsmith'
      },
    },
    {
      path: '/my-loadouts/edit/:id',
      name: 'my-loadouts-edit',
      component: EditLoadout,
      meta: {
        title: 'Edit Loadout - Tarkov Gunsmith'
      },
    },
    {
      path: '/user/virion',
      name: 'virions-loadouts',
      component: VirionsLoadouts,
      meta: {
        title: "Virion's Loadouts - Tarkov Gunsmith"
      },
    },
  ],
});
