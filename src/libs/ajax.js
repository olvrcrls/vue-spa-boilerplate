'use strict';
require('../bootstrap');

// spitting the data already on this resolve / reject return of promise


export function get(url, data) {
    return new Promise((resolve, reject) => {
        this.$http.get(url, data)
        .then((res) => {
            return resolve(res.data);
        })
        .catch((err) => {
            return reject(err.response);
        });
    });
}

export function method(method, url, data) {
    return new Promise((resolve, reject) => {
        this.$http(method, url, data)
        .then((res) => {
            return resolve(res.data);
        })
        .catch((err) => {
            return reject(err.response);
        });
    });
}

export function post(url, data) {
    return new Promise((resolve, reject) => {
        this.$http.post(url, data)
        .then((res) => {
            return resolve(res.data);
        })
        .catch((err) => {
            return reject(err.response);
        });
    });
}