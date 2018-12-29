'use strict';
import { post } from './ajax';

const loginUrl = "/api/v1/auth/login";
const logoutUrl = "api/v1/auth/logout";
const currentUserUrl = "api/v1/auth/user";
const refreshTokenUrl = "api/v1/auth/refresh";


/**
 * Attempt Login to the system
 * @param JSON credentials
 * @return Promise
 */
export function login(credentials) {
    return new Promise((resolve, reject) => {
        post(loginUrl, credentials)
        .then((res) => {
            let user = res.results.user;
            // if there is a user retrieved
            // then we update the local storage's user.
            if (user) { localStorage.setItem('__user', JSON.stringify(user)); }
            return resolve(res);
        })
        .cathc((err) => {
            return reject(err.response);
        });
    });
}

/**
 * Attempt Logout from the system
 * @param JSON token
 * @return Promise
 */
export function logout(token) {
    return new Promise((resolve, reject) => {
        post(logoutUrl, token)
        .then((res) => {
            let status = res.results.status;
            // removing the locally stored user and token if the logout is successful.
            if (status) { 
                localStorage.removeItem('__user');
                localStorage.removeItem('__token');
            }
            return resolve(res);
        })
        .cathc((err) => {
            return reject(err.response);
        });
    });
}

/**
 * Get the current user by providing the token
 * @param JSON token
 * @return Promise
 */

 export function user(token) {
     return new Promise((resolve, reject) => {
        post(currentUserUrl, token)
        .then((res) => {
            return resolve(res);
        })
        .catch((err) => {
            return reject(err.response);
        });
     });
 }

/**
 * Refresh the token of the current user.
 * @param JSON token
 * @return Promise
 */

export function refresh(token) {
    return new Promise((resolve, reject) => {
        post(refreshTokenUrl, token)
        .then((res) => {
            let token = res.results.token;
            // if there is a token retrieved
            // then we update the local storage's token.
            if (token) { localStorage.setItem('__token', JSON.stringify(token)); }
            return resolve(res);
        })
        .catch((err) => {
            return reject(err.response);
        })
    });
}


 export function localUser() {
     let user = localStorage.getItem('_user');
     return !!user ? JSON.parse(user) : null;
 }