import { useStore } from '@/store'
import localforage from 'localforage'
import { computed, ref } from 'vue'

export const ThemeMainColors = [
  '#3366ff',
  '#009688',
  '#1976d2',
  '#536def',
  '#ff5c93',
  '#ee4f12',
  '#0096c7',
  '#9c27b0',
  '#ff9800',
]
// 库模式变量
const _libThemeCfg = {
  binColorPrimary: '#165dff',
  binColorSuccess: '#00c181',
  binColorWarning: '#ffaa00',
  binColorDanger: '#ff3d71',
  binColorInfo: '#0086e6',
}

export const libThemeCfg = ref({ ..._libThemeCfg })
// 系统变量
const _sysThemeCfg = {
  vGBgColor: '#fff',
}
export const sysThemeCfg = ref({ ..._sysThemeCfg })

// 取值
// const getValue = async key => await localforage.getItem(key)

// // 存储
// const setVale = async (key, value) => await localforage.setItem(key, deepCopy(value))

// 是否从缓存取值
const loadCache = false

// 主题变量hooks
export function useTheme() {
  const { settingStore, storeToRefs } = useStore()
  const { setting } = storeToRefs(settingStore)
  const themeName = computed(() => setting.value.themeName)

  const themeConfigRef = computed(() => ({ ...libThemeCfg.value, ...sysThemeCfg.value }))

  return { themeName, libThemeCfg, sysThemeCfg, themeConfigRef }
}
