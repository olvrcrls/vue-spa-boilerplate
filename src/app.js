'use strict';
require('./bootstrap');

import router from './routes';
import store from './store';
import App from './App';

const app = new Vue({
    component: App,
    store,
    router,
    mounted() {
        console.log("Application loaded.");
    }
}).$mount('#app');
