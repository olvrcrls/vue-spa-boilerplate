'use strict';
import { localUser, login, refresh, logout, user } from '../../libs/auth';

let token = JSON.parse(localStorage.getItem('__token'));
let loggedInUser = JSON.parse(localStorage.getItem('__user'));
const auth = {
    state: {
        authenticated: !!localUser(),
        token,
        user: loggedInUser,
    }, // state

    getters: {
        fullName(state) {
            if (state.authenticated)
            {
                if (!state.user.nickname) { return `${state.user.first_name} ${state.user.last_name}`; }
                else { return `${state.user.nickname} ${state.user.last_name}`; }
            } else { return null; }
        },

        avatar(state) {
            if (state.authenticated)
            {
                return state.user.avatar;
            } else { return null; }
        }
    }, //getters

    mutations: {
        /**
         * Attempting to login
         * @param state 
         * @param rootState 
         * @param credentials 
         */
        attemptLogin(state, rootState, credentials) {
            rootState.loading = true;
            login(credentials)
            .then((response) => {
                let { user } = response.results;
                state.user = user;
                rootState.loading = false;
                rootState.message = "Successfully logged in.";
                return user;
            })
            .catch((err) => {
                let { error_description } = err.data.results;
                rootState.error = error_description;
                rootState.loading = false;
            });
        }, // attemptLogin

        attemptLogout(state, rootState, token) {
            rootState.loading = true;
            // checks first if there is a logged in user.
            if (state.authenticated) {
                logout(token)
                .then((response) => {
                    let { status } = response.results;
                    if (status) { state.user = null; }
                    rootState.message = "Successfully logged out.";
                    rootState.loading = false;
                })
                .catch((err) => {
                    let { error_description } = err.data.results;
                    rootState.error = error_description;
                    rootState.loading = false;
                });
            } else {
                state.user = null;
                rootState.loading = false;
                rootState.error = "Unauthenticated.";
                rootState.message = "There is no one logged in right now.";
            }
        }, // attemptLogout

        refresh(state, rootState, token) {
            rootState.loading = true;
            if (state.authenticated) {
                refresh(token)
                .then((response) => {
                    let { user, token } = response.results;
                    state.token = token;
                    state.user = user;
                    rootState.loading = false;
                })
                .catch((err) => {
                    let { error_description } = err.data.results;
                    state.error = error_description;
                    rootState.loading = false;
                });
            } else {
                rootState.loading = false;
                return { message: "Please login to continue." }
            }
        }, // refresh

        currentUser(state, rootState, token) {
            rootState.loading = true;
            user(token)
            .then((response) => {
                let { status } = response.results;
                if (status) {
                    let { user } = response.results;
                    state.user = user;
                    rootState.loading = false;
                }
            })
            .catch((err) => {
                let { error_description } = err.data.results;
                rootState.error = error_description;
            });
        },

    }, // mutations

    actions: {
        attemptLogin(ctx, credentials) {
            ctx.commit('attemptLogin', credentials);
        },

        attemptLogout(ctx, token) {
            ctx.commit('attemptLogout', token);
        },

        currentUser(ctx, token) {
            ctx.commit('currentUser', token);
        },

        refresh(ctx, token) {
            ctx.commit('refresh', token);
        }


    }, // actions
}

export default auth;