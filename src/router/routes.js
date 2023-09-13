import layout from '@/layouts/index.vue'
import { flatMenus, HOME_NAME } from './menus'

// 获取实际存储的路由
export const realRoutes = flatMenus
  .filter(i => i.node && i.node.component)
  .map(i => {
    const temp = {
      path: i.node.path ?? i.node.name,
      name: i.node.name,
      meta: { title: i.node.title },
      component: i.node.component,
    }
    // 外链
    if (i.node.externalLink) temp.externalLink = i.node.externalLink
    return temp
  })

/**
 * meta 为附带参数，title为默认路由标题，noCache为缓存标识，为true时开启tag-view时不缓存
 */
export const asyncRouterMap = [
  {
    path: 'Analysis',
    name: 'Analysis',
    meta: { title: '分析页', noCache: true },
    component: () => import('@/views/dashboard/analysis/index.vue'),
  },
  ...realRoutes,
]

/**
 * @description 创建在 layout 中显示的路由设置
 * @param {Array} routes 动态路由设置
 */
export function createRoutesInLayout(routes = []) {
  return [
    {
      path: '/',
      redirect: { name: 'WorkBench' },
      name: 'Root',
      component: layout,
      children: [
        {
          path: 'WorkBench',
          name: 'WorkBench',
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
        // 动态路由组件
        {
          path: 'Inline/:params',
          name: 'Inline',
          component: () => import('@/views/demo/inline/index.vue'),
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
  // excel模板编辑
  {
    path: '/excel-edit',
    name: 'ExcelEdit',
    component: () => import('@/views/pages/ExcelEdit/index.vue'),
  },
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRoutes = createRoutesInLayout().concat(routesOutLayout)
