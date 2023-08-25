import { useStore } from '@/store'
import { MENU_THEME_COLOR_LIST, SYSTEM_PRIMARY_COLOR_LIST } from '@/config/setting.cfg'

export default function useApp() {
  const { settingStore, appStore, tagsStore, storeToRefs } = useStore()
  const { setting, asideStyle, pageFooterWidth, fixedHeaderStyle } = storeToRefs(settingStore)
  const { weather, searchVisible, settingVisible } = storeToRefs(appStore)

  function toggleSearch() {
    searchVisible.value = !searchVisible.value
  }

  function toggleSetting() {
    settingVisible.value = !settingVisible.value
  }

  function setWeather(wea) {
    weather.value = wea
  }

  // 主要设置内容
  function themChange(theme) {
    settingStore.themChange(theme)
  }

  // 菜单主题切换
  function setMenuTheme(color) {
    if (color !== setting.menuTheme) {
      settingStore.setMenuTheme(color)
    }
  }

  // 系统色切换
  function setSystemPrimary(color) {
    if (color !== setting.systemPrimary) {
      settingStore.setSystemPrimary(color)
    }
  }

  // toggle tagsView标签页
  function toggleTagsView(val) {
    setting.value.tagsView = val
    if (!val) {
      // 如果关闭tags，则需要关闭所有缓存
      tagsStore.delAllViews()
    }
  }

  return {
    setting,
    weather,
    searchVisible,
    settingVisible,
    // computed
    asideStyle,
    pageFooterWidth,
    fixedHeaderStyle,
    // normal colors
    systemPrimaryColorList: SYSTEM_PRIMARY_COLOR_LIST,
    menuThemeColorList: MENU_THEME_COLOR_LIST,
    toggleSearch,
    toggleSetting,
    setWeather,
    themChange,
    setMenuTheme,
    setSystemPrimary,
    toggleTagsView,
  }
}
