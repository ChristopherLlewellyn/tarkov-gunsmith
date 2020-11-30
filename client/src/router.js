import Vue from "vue";
import Router from "vue-router";
import Meta from "vue-meta";
import SignIn from "./views/SignIn.vue";
import SignUp from "./views/SignUp.vue";
import CreateLoadout from "./views/CreateLoadout.vue";
import MyLoadouts from "./views/MyLoadouts.vue";
import EditLoadout from "./views/EditLoadout.vue";
import SearchLoadouts from "./views/SearchLoadouts.vue";
import ViewLoadout from "./views/ViewLoadout.vue";
import ResetPassword from "./views/ResetPassword.vue";
import ConfirmPasswordReset from "./views/ConfirmPasswordReset.vue";
import ConfirmEmail from "./views/ConfirmEmail.vue";
import DiscordRedirect from "./views/DiscordRedirect.vue";
import Account from "./views/Account.vue";
import PrivacyPolicy from "./views/PrivacyPolicy.vue";
import VirionsLoadouts from "./views/VirionsLoadouts.vue";

Vue.use(Router);
Vue.use(Meta);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "search",
      component: SearchLoadouts
    },
    {
      path: "/sign-in",
      name: "sign-in",
      component: SignIn
    },
    {
      path: "/sign-up",
      name: "sign-up",
      component: SignUp
    },
    {
      path: "/confirm-email/:token",
      name: "confirm-email",
      component: ConfirmEmail
    },
    {
      path: "/discord-redirect",
      name: "discord-redirect",
      component: DiscordRedirect
    },
    {
      path: "/reset-password",
      name: "reset-password",
      component: ResetPassword
    },
    {
      path: "/confirm-password-reset/:token",
      name: "confirm-password-reset",
      component: ConfirmPasswordReset
    },
    {
      path: "/privacy-policy",
      name: "privacy-policy",
      component: PrivacyPolicy
    },
    {
      path: "/account",
      name: "account",
      component: Account
    },
    {
      path: "/loadout/:id",
      name: "view-loadout",
      component: ViewLoadout
    },
    {
      path: "/create-loadout",
      name: "create-loadout",
      component: CreateLoadout
    },
    {
      path: "/my-loadouts",
      name: "my-loadouts",
      component: MyLoadouts
    },
    {
      path: "/my-loadouts/edit/:id",
      name: "my-loadouts-edit",
      component: EditLoadout
    },
    {
      path: "/user/virion",
      name: "virions-loadouts",
      component: VirionsLoadouts
    }
  ]
});
