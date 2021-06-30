import { useStore } from 'vuex'
import { computed } from 'vue'
import { MENU_THEME_COLOR_LIST, SYSTEM_PRIMARY_COLOR_LIST } from '@/config/setting.cfg'

export default function useSetting() {
  const store = useStore()

  const theme = computed(() => store.getters.theme)
  const menuTheme = computed(() => store.getters.menuTheme)
  const systemPrimary = computed(() => store.getters.systemPrimary)
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

  const searchVisible = computed(() => store.getters.searchVisible)
  const settingVisible = computed(() => store.getters.settingVisible)

  const fixedHeader = computed(() => store.getters.fixedHeader)
  const fixedHeaderStyle = computed(() => {
    return {
      padding: 0,
      width: fixedHeader.value ? `calc(100% - ${sidebar.value ? sidebarWidth.value : 64}px)` : '100%',
      zIndex: 5,
      right: fixedHeader.value ? 0 : null
    }
  })
  const navMenu = computed(() => store.getters.navMenu)
  const navMenuItems = computed(() => store.getters.navMenuItems)
  const addRouters = computed(() => store.getters.addRouters)
  const cachedViews = computed(() => store.getters.cachedViews)

  async function toggleSidebar() {
    await store.dispatch('toggleSideBar')
  }

  async function toggleSearch() {
    await store.dispatch('toggleSearchPane')
  }

  async function toggleSetting() {
    await store.dispatch('toggleSettingPane')
  }

  async function themChange(val) {
    await store.dispatch('setThemeMode', val)
  }

  async function setMenuTheme(color) {
    if (color !== menuTheme.value) {
      await store.dispatch('setMenuTheme', color)
    }
  }

  async function setSystemPrimary(color) {
    if (color !== systemPrimary.value) {
      await store.dispatch('setSystemPrimary', color)
    }
  }

  async function toggleTagsView(val) {
    await store.dispatch('toggleTagsView')
    if (!val) {
      // 如果关闭tags，则需要关闭所有缓存
      await store.dispatch('tagsView/delAllViews')
    }
  }

  async function changeFixedHeader(val) {
    await store.dispatch('toggleFixedHeader', val)
  }

  async function changeFixedAside(val) {
    await store.dispatch('toggleFixedAside', val)
  }

  async function changeSidebarWidth(width) {
    await store.dispatch('setSideBarWidth', width)
  }

  return {
    theme,
    menuTheme,
    systemPrimary,
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
    searchVisible,
    settingVisible,
    systemPrimaryColorList: SYSTEM_PRIMARY_COLOR_LIST,
    menuThemeColorList: MENU_THEME_COLOR_LIST,
    themChange,
    toggleSidebar,
    toggleTagsView,
    toggleSearch,
    toggleSetting,
    changeFixedHeader,
    changeFixedAside,
    changeSidebarWidth,
    setMenuTheme,
    setSystemPrimary
  }
}
