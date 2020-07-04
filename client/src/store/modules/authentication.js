import HTTP from '../../http';
import router from '../../router';

export default {
  namespaced: true,
  state: {
    //! Remember to change the values in reset() function when updating these default values
    signUpEmail: null,
    signUpPassword: null,
    signUpUsername: null,
    signUpError: null,
    signUpSuccess: null,

    signInEmail: null,
    signInPassword: null,
    signInError: null,
    token: null,
    captcha: null,

    // Social login
    socialProvider: null,
    socialToken: null,

    loading: false,
  },

  actions: {
    register({
      commit,
      state
    }) {
      commit('setSignUpError', null);
      commit('setLoading', true);
      return HTTP().post('/auth/register', {
          email: state.signUpEmail,
          password: state.signUpPassword,
          username: state.signUpUsername,
          captcha: state.captcha,
        })
        .then(({
          data
        }) => {
          commit('setLoading', false);
          commit('setSignUpSuccess', data.message);
        })
        .catch((error) => {
          if (error.response.data.message) {
            commit('setSignUpError', error.response.data.message);
          } else if (error.response.status == '429') {
            commit('setSignUpError', 'Too many attempts, wait 60s');
          } else {
            commit('setSignUpError', error.response.data[0].message); // message from response body
          }
          commit('setLoading', false);
        });
    },

    signIn({
      commit,
      state
    }) {
      commit('setSignInError', null);
      commit('setLoading', true);
      return HTTP().post('/auth/login', {
          email: state.signInEmail,
          password: state.signInPassword,
          captcha: state.captcha,
        })
        .then(({
          data
        }) => {
          commit('setToken', data.token);
          commit('setSignInError', null);
          commit('setLoading', false);
          router.push('/');
        })
        .catch((error) => {
          commit('setLoading', false);
          if (error.response.status == '404') {
            commit('setSignInError', error.response.data.message);
          } else if (error.response.status == '429') {
            commit('setSignInError', 'Too many attempts, wait 60s');
          } else {
            commit('setSignInError', error.response.data[0].message); // message from response body
          }
        });
    },
    signOut({
      commit
    }) {
      commit('setToken', null);
      router.push('/sign-in');
    },

    socialSignIn({ commit, state }) {
      return HTTP().post(`/auth/social/${state.socialProvider}`, {
        token: state.socialToken,
        discordRedirectUri: process.env.VUE_APP_DISCORD_REDIRECT_URI
      })
      .then(({
        data
      }) => {
        commit('setToken', data.token);
        commit('setSignInError', null);
        router.push('/');
      })
      .catch((error) => {
        if (error.response.status == '404') {
          commit('setSignInError', error.response.data.message);
        } else if (error.response.status == '429') {
          commit('setSignInError', 'Too many attempts, wait 60s');
        } else {
          commit('setSignInError', error.response.data[0].message);
        }
      });
    }
  },
  getters: {
    isSignedIn(state) {
      return !!state.token;
    },
  },
  mutations: {
    reset(state) {
      state.signUpEmail = null;
      state.signUpPassword = null;
      state.signUpUsername = null;
      state.signUpError = null;
      state.signUpSuccess = null;

      state.signInEmail = null;
      state.signInPassword = null;
      state.signInError = null;
      state.token = null;
      state.captcha = null;

      state.loading = false;
    },
    resetSignUp(state) {
      state.signUpEmail = null;
      state.signUpPassword = null;
      state.signUpUsername = null;
      state.signUpError = null;
      state.signUpSuccess = null;
    },
    setSignUpEmail(state, email) {
      state.signUpEmail = email;
    },
    setSignUpPassword(state, password) {
      state.signUpPassword = password;
    },
    setSignUpUsername(state, username) {
      state.signUpUsername = username;
    },
    setSignUpError(state, error) {
      state.signUpError = error;
      state.signUpSuccess = null;
    },
    setSignUpSuccess(state, success) {
      state.signUpSuccess = success;
      state.signUpError = null;
    },
    setSignInEmail(state, email) {
      state.signInEmail = email;
    },
    setSignInPassword(state, password) {
      state.signInPassword = password;
    },
    setSignInError(state, error) {
      state.signInError = error;
    },
    setToken(state, token) {
      state.token = token;
    },
    setCaptcha(state, captcha) {
      state.captcha = captcha;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    setSocialProvider(state, provider) {
      state.socialProvider = provider;
    },
    setSocialToken(state, token) {
      state.socialToken = token;
    },
  },
};
