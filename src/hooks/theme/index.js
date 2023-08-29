import { useStore } from '@/store'
import { Theme, ThemeMainColors, ThemeMenuColors } from './default-theme'
import { computed, watch, ref } from 'vue'
import useCaches from './caches'

// 缓存读取器
const { getVal, setVal } = useCaches()

// 是否从缓存取值
const loadCache = true

const themeConfigRef = loadCache ? ref(getVal()) : ref({ ...Theme.libTheme, ...Theme.sysTheme })

// 获取主题名称
export function getThemeName() {
  const { settingStore, storeToRefs } = useStore()
  const { setting } = storeToRefs(settingStore)
  const themeName = computed(() => setting.value.themeName)
  return { themeName }
}

// 主题变量hooks , 仅在app中引入一次
export function useThemeInit() {
  const { themeName } = getThemeName()

  watch(
    () => themeConfigRef.value,
    val => {
      if (loadCache) setVal(val)
    },
    { deep: true },
  )

  return { themeName }
}

export { Theme, ThemeMainColors, ThemeMenuColors, themeConfigRef }
