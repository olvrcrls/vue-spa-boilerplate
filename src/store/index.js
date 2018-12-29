'use strict';
require('../bootstrap');
import auth from './modules/auth';

const store = new Vuex.Store({
    state: {
        loading: false,
        error: null,
        message: null,
    },

    modules: {
        auth
    }
});

export default store;