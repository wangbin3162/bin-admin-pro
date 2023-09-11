import { useRouter, useRoute } from 'vue-router'
import { HOME_PATH } from '@/router/menus'
import { useStore } from '@/pinia'
import { computed } from 'vue'
import { deepCopy } from '@/utils/util'

export default function useMenu() {
  const { menuStore, tagsStore, storeToRefs } = useStore()
  const { navMenu, navMenuItems, addRouters, allMenuItems, topNavActive, sideMenus } =
    storeToRefs(menuStore)
  const $router = useRouter()
  const $route = useRoute()

  const topMenuTabs = computed(() => deepCopy(navMenu.value))

  // 获取菜单项名称路径
  function getMenuItemNamePath(name) {
    const activeRoute = navMenuItems.value.find(item => item.name === name)
    return activeRoute
      ? topNavActive.value
        ? activeRoute.parents.slice(1)
        : activeRoute.parents
      : []
  }

  // 获取当前
  function getCurrentMenu(name) {
    const activeRoute = allMenuItems.value.find(item => item.name === name)
    return activeRoute || null
  }

  // 获取当前菜单结构数组
  function getBreadcrumbData(oriName) {
    const list = []
    const current = getCurrentMenu(oriName)
    if (!current) return []

    const parents = current.parents
    if (parents.length === 1 && !current.children?.length) {
      list.push(current)
    } else {
      // 如果有多级层级，则需要遍历查询父级菜单集合
      parents.forEach(name => {
        const route = getCurrentMenu(name)
        if (route) {
          list.push(route)
        }
      })
    }
    return list
  }

  // 选中路由名称
  function handleMenuSelect(oriName) {
    const [name, params] = oriName.split('/')

    // 根据path判断是否为点击相同的菜单
    if ('/' + oriName === $route.path) {
      tagsStore.refreshCurrentPage($router)
      return
    }
    // 外链跳转
    const curMenu = allMenuItems.value.find(item => item.name === oriName)
    if (curMenu && curMenu.externalLink) {
      window.open(curMenu.externalLink, '_blank')
      return
    }
    // 路由跳转
    if (
      addRouters.value.find(item => item.name === name) ||
      name === HOME_PATH ||
      name === 'Inline'
    ) {
      $router.push({ name, params: { params } })
    } else {
      $router.push('/404')
    }
  }

  function getCurrentRouteMenu() {
    return getCurrentMenu($route.path.substring(1))
  }

  function setTopNavActive(name) {
    menuStore.setTopNavActive(name)
  }

  return {
    topNavActive,
    topMenuTabs,
    navMenu,
    sideMenus,
    navMenuItems,
    addRouters,
    allMenuItems,
    getCurrentRouteMenu,
    getBreadcrumbData,
    getMenuItemNamePath,
    handleMenuSelect,
    setTopNavActive,
  }
}
