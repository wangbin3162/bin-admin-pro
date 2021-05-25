import { useStore } from 'vuex'
import { computed } from 'vue'

export default function useSetting() {
  const store = useStore()

  const sidebar = computed(() => store.getters.sidebar)
  const sidebarWidth = computed(() => store.getters.sidebarWidth)
  const fixedAside = computed(() => store.getters.fixedAside)
  const navMenu = computed(() => store.getters.navMenu)
  const navMenuItems = computed(() => store.getters.navMenuItems)
  const addRouters = computed(() => store.getters.addRouters)
  const asideStyle = computed(() => {
    const width = sidebar.value ? sidebarWidth.value : 64
    return {
      flex: `0 0 ${width}px`,
      maxWidth: `${width}px`,
      minWidth: `${width}px`,
      width: `${width}px`
    }
  })

  const cachedViews = computed(() => store.getters.cachedViews)

  function toggleSidebar() {
    store.dispatch('toggleSideBar')
  }

  return {
    sidebar,
    sidebarWidth,
    fixedAside,
    asideStyle,
    navMenu,
    navMenuItems,
    addRouters,
    cachedViews,
    toggleSidebar
  }
}
