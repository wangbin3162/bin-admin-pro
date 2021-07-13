import layout from '../layouts'
import modules from './modules'
import { HOME_PATH, HOME_NAME } from '@/router/menus'

export const asyncRouterMap = [
  {
    path: 'analysis',
    name: 'Analysis',
    meta: { title: '分析页' },
    component: () => import(/* webpackChunkName: "Analysis" */ '../views/dashboard/analysis')
  },
  ...modules,
  {
    path: 'about',
    name: 'About',
    component: () => import(/* webpackChunkName: "About" */ '@/views/about/about'),
    meta: { title: '关于' }
  }
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
          path: `/${HOME_PATH}`,
          name: 'Workbench',
          meta: { title: HOME_NAME },
          component: () => import(/* webpackChunkName: "Workbench" */ '../views/dashboard/workbench')
        },
        // 刷新页面 必须保留
        {
          path: 'redirect/:path(.*)',
          name: 'Redirect',
          component: () => import(/* webpackChunkName: "Redirect" */ '../views/system/redirect/index.vue')
        },
        // 错误页面
        {
          path: '/:path(.*)*',
          name: 'ErrorPage',
          component: () => import(/* webpackChunkName: "ErrorPage" */ '../views/system/error/index.vue')
        },
        ...routes
      ]
    }
  ]
}

// 新增动态route
export function addRoutes(routes = []) {
  return createRoutesInLayout(routes).concat(routesOutLayout)
}

// 在 layout 之外显示的路由
export const routesOutLayout = [
  // 登录
  { path: '/login', name: 'Login', component: () => import(/* webpackChunkName: "Login" */ '../views/system/login.vue') }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRoutes = createRoutesInLayout().concat(routesOutLayout)
