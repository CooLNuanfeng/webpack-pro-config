import Vue from 'vue';
import App from './app.vue';
// 非 .vue中的文件
import '#/common.css';
import '#/common.js';

import router from './router'

new Vue({
    el : '#app',
    router,
    components: { App },
    template: '<App/>'
});
