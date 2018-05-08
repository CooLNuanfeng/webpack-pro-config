import Vue from 'vue';
import App from './app.vue';

// 非 .vue中的文件
import '#/common.css';
import '#/common.js';


new Vue({
    el : '#app',
    components : {
        'v-app': App
    }
});
