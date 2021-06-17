import layout from '../layouts'
import demo from './modules/demo'
import errorPage from './modules/error-page'

export const asyncRouterMap = [
  ...demo,
  ...errorPage
]

/**
 * @description 创建在 layout 中显示的路由设置
 * @param {Array} routes 动态路由设置
 */
export function createRoutesInLayout(routes = []) {
  return [
    {
      path: '/',
      redirect: { name: 'Home' },
      name: 'Root',
      component: layout,
      children: [
        { path: 'home', name: 'Home', meta: { title: '首页' }, component: () => import('../views/Home.vue') },
        // 刷新页面 必须保留
        {
          path: 'redirect/:path(.*)',
          name: 'Redirect',
          component: () => import('../views/system/redirect/index.vue')
        },
        // 错误页面
        {
          path: '/:path(.*)*',
          name: 'ErrorPage',
          component: () => import('../views/system/error/index.vue')
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
  { path: '/login', name: 'Login', component: () => import('../views/system/Login.vue') }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRoutes = createRoutesInLayout().concat(routesOutLayout)
