import { createRouter, createWebHashHistory } from 'vue-router'
import { LoadingBar } from 'bin-ui-next'
import { scrollBehavior } from './scrollBehavior'
import { addRoutes, constantRoutes } from './routes'
import store from '@/store'
import { getFilterMenus } from './menus'
import cookies from '../utils/util.cookies'
import { ACCESS_TOKEN } from '../config/token-const'

/**
 * @description 创建路由
 * @param {Array} routes 路由设置
 */
const initRouter = (routes = []) => createRouter({
  history: createWebHashHistory(),
  scrollBehavior,
  routes
})

const router = initRouter(constantRoutes)

/**
 * @description 新增动态route
 * @param {Array} routes 额外追加的路由
 */
export function resetRoutes(routes = []) {
  routes.forEach(route => {
    router.addRoute('Root', route)
  })
}

// config router
export function setupRouter(app) {
  app.use(router)
}

router.beforeEach(async (to, from) => {
  LoadingBar.start()
  const token = cookies.get(ACCESS_TOKEN)
  if (token && token !== 'undefined') {
    // 确定用户是否通过getInfo获得了他的权限角色// 这里暂时默认获取了角色
    const userInfo = store.getters.userInfo
    if (userInfo) {
      return true
    } else { // 否则就去拉取用户信息
      try {
        const res = await store.dispatch('getUserInfo')
        const menus = getFilterMenus(res.data.data.functions || [])
        // console.log('menus: ', menus)
        const { menuItems } = await store.dispatch('setRouterMenu', menus)
        const asyncRoute = await store.dispatch('generateRoutes', menuItems)
        // console.log('baseRoutes: ', router.getRoutes())
        // [ 路由 ] 计算路由
        // console.log('asyncRoutes: ', asyncRoute)
        // [ 路由 ] 重新设置路由
        resetRoutes(asyncRoute)
        // console.log('resultRoutes: ', router.getRoutes())
        // 触发重定向
        return to.fullPath
      } catch (e) {
        return { name: 'Login', query: { redirect: to.fullPath } }
      }
    }
  } else {
    // 权限白名单 no redirect whitelist
    const whiteList = ['/login', '/404', '/401', '/403', '/500']
    // 没有登录的时候跳转到登录界面 // 携带上登陆成功之后需要跳转的页面完整路径
    if (whiteList.indexOf(to.path) !== -1) { // 在免登陆白名单中
      return true
    } else {
      return { name: 'Login', query: { redirect: to.fullPath } }
    }
  }
})
router.afterEach(() => {
  LoadingBar.done()
})

export default router
