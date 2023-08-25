import { h, inject, computed, defineComponent, provide } from 'vue'
import { configProviderProps } from './types'
import { configProviderInjectionKey } from './context'
import { deepCopy, deepMerge } from '@/utils/util'

export default defineComponent({
  name: 'BConfigProvider',
  alias: ['App'],
  props: configProviderProps,
  setup(props) {
    const BConfigProvider = inject(configProviderInjectionKey, null)

    // 主题名称注入
    const mergedThemeNameRef = computed(() => {
      const { themeName } = props
      if (themeName === null) return undefined
      return themeName === undefined ? BConfigProvider?.mergedThemeNameRef.value : themeName
    })

    // 主题变量注入
    const mergedThemeRef = computed(() => {
      const { theme } = props
      if (theme === null) return undefined
      const inheritedTheme = deepCopy(BConfigProvider?.mergedThemeRef.value)
      return theme === undefined
        ? inheritedTheme
        : inheritedTheme === undefined
        ? theme
        : deepMerge(inheritedTheme, theme)
    })

    provide(configProviderInjectionKey, {
      // 语言环境包
      mergedLocaleRef: computed(() => {
        const { locale } = props
        if (locale === null) return undefined
        return locale === undefined ? BConfigProvider?.mergedLocaleRef.value : locale
      }),
      mergedThemeRef,
    })
    return {
      mergedThemeName: mergedThemeNameRef,
      mergedTheme: mergedThemeRef,
    }
  },
  render() {
    return !this.abstract
      ? h(
          this.tag,
          {
            class: 'b-config-provider',
            'theme-name': this.mergedThemeName,
          },
          this.$slots.default?.(),
        )
      : this.$slots.default?.()
  },
})
