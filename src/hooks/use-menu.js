import { DASHBOARD_MENUS, HOME_PATH } from '@/router/menus'

import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'

export default function useMenu() {
  const $store = useStore()
  const $router = useRouter()
  const $route = useRoute()
  const navMenu = computed(() => $store.getters.navMenu)
  const navMenuItems = computed(() => $store.getters.navMenuItems)
  const addRouters = computed(() => $store.getters.addRouters)
  const allMenuItems = computed(() => {
    const functions = navMenu.value
    const all = []
    const mapper = route => {
      const mapperNode = { ...route }
      mapperNode.children = (route.children && route.children.map(mapper)) || []
      if (route.path) {
        all.push(mapperNode)
      }
      return mapperNode
    }
    functions.forEach(item => {
      mapper(item)
    })
    return all
  })

  // 获取菜单项名称路径 附带斜杠
  function getMenuItemNamePath(path) {
    const activeRoute = navMenuItems.value.find(item => `/${item.path}` === path)
    return activeRoute ? activeRoute.parents : []
  }

  // 获取当前  附带斜杠
  function getCurrentMenu(path) {
    const activeRoute = allMenuItems.value.find(item => `/${item.path}` === path)
    return activeRoute || null
  }

  // 获取当前菜单结构数组  path 默认为route.path 需要斜杠/
  function getBreadcrumbData(path) {
    const list = []
    const current = getCurrentMenu(path)
    if (!current) return []
    const parents = current.parents
    if (parents.length === 1 && !current.children.length) {
      list.push(current)
    } else {
      // 如果有多级层级，则需要遍历查询父级菜单集合
      parents.forEach(path => {
        const route = getCurrentMenu(`/${path}`)
        if (route) {
          list.push(route)
        }
      })
    }
    return list
  }

  // 选中path 不带斜杠
  function handleMenuSelect(path) {
    const to = `/${path}`
    if (to === $route.fullPath) {
      $store.dispatch('tagsView/refreshCurrentPage', $router)
      return
    }
    if (path === HOME_PATH || addRouters.value.findIndex(item => item.path === path) > -1) {
      $router.push({ path })
    }
  }

  function getCurrentRouteMenu() {
    return getCurrentMenu($route.path)
  }

  return {
    navMenuItems,
    allMenuItems,
    getCurrentRouteMenu,
    getBreadcrumbData,
    getMenuItemNamePath,
    handleMenuSelect
  }
}
