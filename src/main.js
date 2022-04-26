import { createApp } from 'vue';
import * as VueRouter from 'vue-router';

import App from './App.vue';
import Home from './views/Home.vue';
import Project from './views/Project.vue';

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/project/:projectNumber', component: Project },
    { path: '/part', component: Home },
  ]
});

createApp(App).use(router).mount('#app');
