import demo from './modules/demo'
import layout from '../layouts'

export const asyncRouterMap = [
  ...demo
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
          path: 'refresh',
          name: 'refresh',
          hidden: true,
          component: {
            beforeRouteEnter(to, from, next) {
              next(vm => vm.$router.replace(from.fullPath))
            },
            render: h => h()
          }
        },
        // 页面重定向 必须保留
        {
          path: 'redirect/:route*',
          name: 'redirect',
          hidden: true,
          component: {
            beforeRouteEnter(to, from, next) {
              next(vm => vm.$router.replace(JSON.parse(from.params.route)))
            },
            render: h => h()
          }
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
  { path: '/login', name: 'Login', component: () => import('../views/Login.vue') },
  { path: '/401', component: () => import(/* webpackChunkName: "error" */ '../views/error/Error401.vue') },
  { path: '/403', component: () => import(/* webpackChunkName: "error" */ '../views/error/Error403.vue') },
  { path: '/404', component: () => import(/* webpackChunkName: "error" */ '../views/error/Error404.vue') },
  { path: '/500', component: () => import(/* webpackChunkName: "error" */ '../views/error/Error500.vue') }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRoutes = createRoutesInLayout().concat(routesOutLayout)
