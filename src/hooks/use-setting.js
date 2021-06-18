import { useStore } from 'vuex'
import { computed } from 'vue'

export default function useSetting() {
  const store = useStore()

  const sidebar = computed(() => store.getters.sidebar)
  const sidebarWidth = computed(() => store.getters.sidebarWidth)
  const fixedAside = computed(() => store.getters.fixedAside)
  const asideStyle = computed(() => {
    const width = sidebar.value ? sidebarWidth.value : 64
    return {
      flex: `0 0 ${width}px`,
      maxWidth: `${width}px`,
      minWidth: `${width}px`,
      width: `${width}px`
    }
  })
  const showTagsView = computed(() => store.getters.tagsView)
  const fixedHeader = computed(() => store.getters.fixedHeader)
  const fixedHeaderStyle = computed(() => {
    return {
      padding: 0,
      width: fixedHeader.value ? `calc(100% - ${sidebar.value ? sidebarWidth.value : 64}px)` : '100%',
      zIndex: 9,
      right: fixedHeader.value ? 0 : null
    }
  })
  const navMenu = computed(() => store.getters.navMenu)
  const navMenuItems = computed(() => store.getters.navMenuItems)
  const addRouters = computed(() => store.getters.addRouters)

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
    fixedHeader,
    fixedHeaderStyle,
    showTagsView,
    toggleSidebar
  }
}
