import Vue from 'vue';
import Router from 'vue-router';

import Demo from '../components/demo.vue';

const Login = () => import(/* webpackChunkName: "login" */'../components/login.vue');

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Demo',
            component: Demo,
            // redirect: '/login'
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
        }
    ]
})
