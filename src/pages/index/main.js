import Vue from 'vue';
import App from './app.vue';

import '#/common.css';
import '#/common.js';


import '../../assets/sass/style.scss';

new Vue({
    el : '#app',
    components : {
        'v-app': App
    }
});
