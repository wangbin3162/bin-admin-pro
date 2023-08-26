import { defineStore } from 'pinia'
import { store } from '@/store'

const useSetting = defineStore('setting', {
  state: () => ({
    // 基础配置项，可供缓存
    setting: {
      themeName: 'dark', // 主题名称
      menuType: 'default', // default: 常规布局 mixed: 混合布局
      routerTransitionName: 'fade-transverse',
      sidebar: true, // 侧边栏开启状态
      sidebarWidth: 220, // 侧边栏宽度
      tagsView: true, // 多页签开启状态
      tagsType: 'clever', // card、clever、smooth
      showWeather: true,
      showSearch: true,
      showMessage: true,
      showCollapse: true,
    },
  }),
  getters: {
    siderWidth() {
      return this.setting.sidebar ? `${this.setting.sidebarWidth}px` : '48px'
    },
  },
  actions: {},
})

export default useSetting

// 是专门提供给外部文件使用的方法
export function useSettingStoreWithOut() {
  return useSetting(store)
}
