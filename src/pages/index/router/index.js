import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '@/utils/get-page-title';
import store from '@/store';
import { getAuthority, removeAuthority } from '@/utils';

NProgress.configure({ showSpinner: false }) // NProgress Configuration

/**
 * 静态路由
 */
export const staticRouter = [
  {
    path: '/login',
    component: () => import('@/pages/index/views/login/index'),
    hidden: true
  },
  {
    path: '/403',
    component: () => import('@/error/403'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/pages/index/views/dashboard/index'),
        meta: { title: '首页', affix: true, icon: 'el-icon-odometer' }
      },
      {
        path: '/Page403',
        name: 'Page403',
        component: () => import('@/error/Page403'),
        meta: { title: '403' },
        hidden: true
      },
      {
        path: '/Page404',
        name: 'Page404',
        component: () => import('@/error/404'),
        meta: { title: '404' },
        hidden: true
      },
    ]
  },
  {
    path: '/iframe/pageOne',
    component: Layout,
    redirect: '/iframe/pageOne/list',
    meta: { title: '页面一', icon: 'el-icon-notebook-1' },
    children: [
      {
        path: '/iframe/pageOne/list',
        name: 'pageOne',
        component: () => import('@/components/Iframe/index'),
        meta: { title: '列表1', additionUrl: '/list' }
      },
      {
        path: '/iframe/pageOne/menu',
        name: 'pageOneMenu',
        component: () => import('@/components/Iframe/index'),
        meta: { title: '菜单1', additionUrl: '/menu' }
      },
    ],
  },
  {
    path: '/iframe/pageTwo',
    component: Layout,
    redirect: '/iframe/pageTwo/list',
    meta: { title: '页面二', icon: 'el-icon-notebook-2' },
    children: [
      {
        path: '/iframe/pageTwo/list',
        name: 'pageTwo',
        component: () => import('@/components/Iframe/index'),
        meta: { title: '列表2', additionUrl: '/list' }
      },
      {
        path: '/iframe/pageTwo/menu',
        name: 'pageTwoMenu',
        component: () => import('@/components/Iframe/index'),
        meta: { title: '菜单2', additionUrl: '/menu' }
      },
    ],
  },
  {
    path: '*',
    component: () => import('@/error/404'),
    hidden: true
  }
];

/**
 * 动态路由
 * 路由的name属性会用于判断
 */
export const dynamicRoutes = [
];

// 路由初始化
const router = new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: [...staticRouter]
});

// 白名单
const whiteList = ['/login'];

router.$addRoutes = (params) => {
  router.matcher = new Router({
    routes: [...staticRouter],
  }).matcher;
  router.addRoutes(params)
}
// 用于判断是否需要更新路由
let isRouterNeedUpdate = true;
// 路由初始化
router.beforeEach(async(to, from, next) => {
  NProgress.start();
  document.title = getPageTitle(to.meta.title);
  const hasToken = getAuthority();
  if (isRouterNeedUpdate) {
    isRouterNeedUpdate = false;
    store.dispatch('tagsView/generateRoutes', [...staticRouter, ...dynamicRoutes]);
  }
  // 判断是否已登录（存在token）
  if (hasToken) {
    if (from.path == '/login' || (to.path !== '/login')) {
      // 处理token失效
      if (!hasToken) {
        next('/login');
      }
      next();
    } else {
      if (to.matched.length === 0) {
        console.error('No Permission Router:', to.path);
        next({
          path: '/403'
        });
      } else if (to.path === '/login') {
        // 返回到登录页清空token，菜单缓存
        removeAuthority();
        next();
      } else {
        next()
      }
    }
    NProgress.done();
  } else {
    if (whiteList.indexOf(to.path) > -1) {
      next();
    } else {
      next('/login');
    }
  }
});


router.afterEach(() => {
  NProgress.done()
});

export default router
