import { useStore } from '@/pinia'
import { computed, watch, ref } from 'vue'
import { Theme } from '../config/default-theme'
import useCaches from '../utils/caches'

// 缓存读取器
const { getVal, setVal } = useCaches()

// 是否从缓存取值
const loadCache = true

export const themeConfigRef = loadCache ? ref(getVal()) : ref({ ...Theme })

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

// 判断一个配置文件是否匹配当前配置
export function isThemeActive(cfg) {
  let flag = true
  Object.keys(cfg).forEach(key => {
    if (cfg[key].toLowerCase() !== themeConfigRef.value[key].toLowerCase()) {
      flag = false
      return
    }
  })
  return flag
}

// 载入一个配置文件
export function loadConfig(cfg) {
  themeConfigRef.value = { ...themeConfigRef.value, ...cfg }
}
