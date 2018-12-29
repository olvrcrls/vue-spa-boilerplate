'use strict';
require('./bootstrap.js');

import Home from './views/Home';

const routes = [
    {
        path: '/',
        component: Home,
        name: 'home'
    },

];

const router = new VueRouter({
    mode: 'history',
    routes
});


export default router;