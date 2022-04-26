import { createApp } from 'vue';
import * as VueRouter from 'vue-router';

import App from './App.vue';
import Home from './views/Home.vue';
import Project from './views/Project.vue';
import PartList from './views/Part/PartList.vue';
import PartDetail from './views/Part/PartDetail.vue';

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes: [
    { path: '/', component: Home },
    {
      path: '/project/:projectNumber', 
      component: Project,
      children: [
        {
          path: "part/:partNumber",
          component: PartDetail,
        },
        {
          path: "",
          component: PartList,
        }
      ],
    },
    // { path: '/:pathMatch(.*)*', name: 'NotFound', component: Home },
  ]
});

const app = createApp(App);
app.config.unwrapInjectedRef = true;
app.use(router).mount('#app');
