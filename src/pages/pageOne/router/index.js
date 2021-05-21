import Vue from 'vue'
import Router from 'vue-router'
import getPageTitle from '@/utils/get-page-title';
import { getAuthority } from '@/utils';
Vue.use(Router)


/**
 * 静态路由
 */
export const staticRouter = [
  {
    path: '/',
    name: 'pageOneList',
    redirect: '/list'
  },
  {
    path: '/list',
    name: 'list',
    component: () => import('../views/list/list'),
    meta: { title: '列表' }
  },
  {
    path: '/list/add',
    name: 'listAdd',
    component: () => import('../views/list/detail'),
    meta: { title: '新增' }
  },
  {
    path: '/list/edit',
    name: 'listEdit',
    component: () => import('../views/list/detail'),
    meta: { title: '编辑' }
  },
  {
    path: '/menu',
    name: 'menu',
    component: () => import('../views/menu/list'),
    meta: { title: '菜单' }
  },
  {
    path: '/menu/add',
    name: 'menuAdd',
    component: () => import('../views/menu/detail'),
    meta: { title: '新增' }
  },
  {
    path: '/menu/edit',
    name: 'menuEdit',
    component: () => import('../views/menu/detail'),
    meta: { title: '编辑' }
  },
];

/**
 * 动态路由
 * 路由的name属性会用于判断
 */
export const dynamicRoutes = [
];

// 路由初始化
const router = new Router({
  mode: 'hash', // require service support
  scrollBehavior: () => ({ y: 0 }),
  base: '/pageOne',
  routes: [...staticRouter]
});

// 白名单
const whiteList = [''];

router.$addRoutes = (params) => {
  router.matcher = new Router({
    routes: [...staticRouter],
  }).matcher;
  router.addRoutes(params)
}

// 路由初始化
router.beforeEach(async(to, from, next) => {
  document.title = getPageTitle(to.meta.title);
  const hasToken = getAuthority();
  if (hasToken) {
    if (to.matched.length === 0) {
      console.error('No Permission Router:', to.path);
      if (window.parent.__indexVue__) {
        window.parent.__indexVue__.$router.push('/Page404');
      } else {
        window.parent.location.href = '/404';
      }
      next()
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) > -1) {
      next();
    }
  }
});

export default router
