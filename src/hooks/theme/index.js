import { useStore } from '@/store'

// 主题变量hooks
export function useTheme() {
  const { settingStore, storeToRefs } = useStore()
  const { setting } = storeToRefs(settingStore)

  return { setting }
}
