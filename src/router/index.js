/** @format */

import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login/index.vue';
import Layout from '@/views/Layout/index.vue';
import Home from '@/views/Home/index.vue';
import Category from '@/views/Category/index.vue';
import SubCategory from '@/views/SubCategory/index.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Layout,
      children: [
        {
          // 设置为空 默认
          path: '',
          name: 'home',
          component: Home,
        },
        {
          path: 'category/:id',
          name: 'category',
          component: Category,
        },
        {
          path: 'category/sub/:id',
          name: 'sub',
          component: SubCategory,
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    // {
    //   path: '/login',
    //   name: 'login',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ],
  // 路由滚动行为定制
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
