import { defineStore } from 'pinia'
import { store } from '@/pinia'

const useSetting = defineStore('setting', {
  state: () => ({
    // 基础配置项，可供缓存
    setting: {
      themeName: '', // 主题名称
      menuType: 'default', // default: 常规布局 mixed: 混合布局
      routerTransitionName: 'fade-in',
      sidebar: true, // 侧边栏开启状态
      sidebarWidth: 220, // 侧边栏宽度
      showCollapse: true,

      tagsView: true, // 多页签开启状态
      showWeather: true,
      showSearch: true,
      showMessage: true,
      showHeaderBreadcrumb: true,
    },
  }),
  getters: {
    siderWidth() {
      return this.setting.sidebar ? `${this.setting.sidebarWidth}px` : '48px'
    },
    tagsViewStyle() {
      return {
        position: 'fixed',
        top: 'var(--v-header-height)',
        left: `${this.siderWidth}px`,
        width: `calc(100% - ${this.siderWidth})`,
      }
    },
    pageFooterStyle() {
      return {
        position: 'fixed',
        bottom: 0,
        left: `${this.siderWidth}px`,
        width: `calc(100% - ${this.siderWidth})`,
      }
    },
  },
  actions: {},
  persist: true,
})

export default useSetting

// 是专门提供给外部文件使用的方法
export function useSettingStoreWithOut() {
  return useSetting(store)
}
