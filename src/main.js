import { createApp } from 'vue';
import * as VueRouter from 'vue-router';

import App from './App.vue';
import Main from './Main.vue';
import Home from './views/Home.vue';
import TopBar from './views/components/NavBarTop.vue';
import Project from './views/Project.vue';
import PartList from './views/Part/PartList.vue';
import PartDetail from './views/Part/PartDetail.vue';
import Error from './views/Error.vue';
import ModelOverlay from './views/ModelOverlay.vue';

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: Main,
      children: [
        {
          path: "/project/:projectNumber",
          components: {
            default: Project,
            TopBar
          },
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
        {
          path: "",
          components: {
            TopBar,
            default: Home
          }
        },
      ]
    },
    {
      path: '/model/:projectNumber/:partNumber',
      component: ModelOverlay,
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: Error },
  ]
});

const app = createApp(App);
app.config.unwrapInjectedRef = true;
app.use(router).mount('#app');
