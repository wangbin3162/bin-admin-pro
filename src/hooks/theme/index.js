import { useStore } from '@/store'
import { computed } from 'vue'

// 主题变量hooks
export function useTheme() {
  const { settingStore, storeToRefs } = useStore()
  const { setting } = storeToRefs(settingStore)

  const themeName = computed(() => setting.value.themeName)

  return { themeName }
}
