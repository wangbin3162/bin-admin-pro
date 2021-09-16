import layout from '@/layouts/index.vue'
import modules from './modules'
import { HOME_NAME } from '@/router/menus'

/**
 * meta 为附带参数，title为默认路由标题，noCache为缓存标识，为true时开启tag-view时不缓存
 */
export const asyncRouterMap = [
  {
    path: 'analysis',
    name: 'Analysis',
    meta: { title: '分析页', noCache: true },
    component: () => import( '@/views/dashboard/analysis/index.vue'),
  },
  ...modules,
  {
    path: 'about',
    name: 'About',
    component: () => import('@/views/demo/about/about.vue'),
    meta: { title: '关于' },
  },
]

/**
 * @description 创建在 layout 中显示的路由设置
 * @param {Array} routes 动态路由设置
 */
export function createRoutesInLayout(routes = []) {
  return [
    {
      path: '/',
      redirect: { name: 'Workbench' },
      name: 'Root',
      component: layout,
      children: [
        {
          path: 'workbench',
          name: 'Workbench',
          meta: { title: HOME_NAME },
          component: () => import('@/views/dashboard/workbench/index.vue'),
        },
        // 刷新页面 必须保留
        {
          path: 'redirect/:path(.*)',
          name: 'Redirect',
          component: () => import('@/views/system/redirect/index.vue'),
        },
        // 错误页面
        {
          path: '/:path(.*)*',
          name: 'ErrorPage',
          component: () => import('@/views/system/error/index.vue'),
        },
        ...routes,
      ],
    },
  ]
}

// 新增动态route
export function addRoutes(routes = []) {
  return createRoutesInLayout(routes).concat(routesOutLayout)
}

// 在 layout 之外显示的路由
export const routesOutLayout = [
  // 登录
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/system/login.vue'),
  },
  // 登录
  {
    path: '/schema/cube',
    name: 'Cube',
    component: () => import('@/views/schema/cube/index.vue'),
  },
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRoutes = createRoutesInLayout().concat(routesOutLayout)
