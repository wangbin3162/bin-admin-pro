import { defineStore } from 'pinia'
import setting from '@/config/setting.cfg'
import {
  MENU_THEME_COLOR_LIST,
  setMenuTheme,
  setPrimaryColor,
  setThemeMode,
} from '@/config/setting.cfg'
import { store } from '@/store'

const useSetting = defineStore('setting', {
  state: () => ({
    setting,
  }),
  getters: {
    asideStyle() {
      const width = this.setting.sidebar ? this.setting.sidebarWidth : 64
      return {
        flex: `0 0 ${width}px`,
        maxWidth: `${width}px`,
        minWidth: `${width}px`,
        width: `${width}px`,
      }
    },
    pageFooterWidth() {
      const { contentFull, sidebar, sidebarWidth } = this.setting
      return {
        width: !contentFull ? `calc(100% - ${sidebar ? sidebarWidth : 64}px)` : '100%',
      }
    },
    fixedHeaderStyle() {
      const { contentFull, fixedHeader, sidebar, sidebarWidth } = this.setting
      return {
        width:
          !contentFull && fixedHeader ? `calc(100% - ${sidebar ? sidebarWidth : 64}px)` : '100%',
        padding: 0,
        zIndex: 10,
        right: fixedHeader ? 0 : null,
      }
    },
  },
  actions: {
    // 载入时加载本地存储数据和主题配置信息
    loadApp() {
      // console.log('============ load app ==============')
      this.setting.contentFull = false
      // setThemeMode(this.setting.theme)
      // setPrimaryColor(this.setting.systemPrimary)
      // setMenuTheme(this.setting.menuTheme)
    },
    themChange(theme) {
      // 设置默认浅色和主色时需要自定义menu色值
      const menuColor = MENU_THEME_COLOR_LIST[theme === 'light' ? 2 : 0]
      this.setting.theme = theme
      this.setting.menuTheme = menuColor
      setThemeMode(theme)
      setMenuTheme(menuColor)
    },
    setMenuTheme(menuColor) {
      const isLight = ['#fff', '#ffffff'].includes(menuColor.toLowerCase())
      const theme = isLight ? 'light' : 'dark'
      this.setting.theme = theme
      this.setting.menuTheme = menuColor
      setThemeMode(theme)
      setMenuTheme(menuColor)
    },
    setSystemPrimary(color) {
      this.setting.systemPrimary = color
      setPrimaryColor(color)
    },
  },
})

export default useSetting

// 是专门提供给外部文件使用的方法
export function useSettingStoreWithOut() {
  return useSetting(store)
}
