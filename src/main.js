/** @format */

import './styles/common.scss';

import { createApp } from 'vue';

import store from './stores/index';
import App from './App.vue';
import router from './router';
import { lazyPlugin } from './dirctives';
import { componentPlugin } from './components/idnex.js';

// 引入懒加载指令并注册
const app = createApp(App);
app.use(store);

app.use(componentPlugin);
app.use(router);
app.use(lazyPlugin);
app.mount('#app');
