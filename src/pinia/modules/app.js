import { defineStore } from 'pinia'
import { store } from '@/pinia'

const useApp = defineStore('app', {
  state: () => ({
    searchVisible: false, // 全局查询面板开启情况
    settingVisible: false, // 全局配置设置开启情况
    themeVisible: false, // 主题配置开关
    weather: {}, // 全局天气
  }),
  getters: {},
  actions: {
    setWeather(wea) {
      this.weather = wea
    },
  },
  // persist: { paths: ['links', 'todolist'] },
})

export default useApp

export function useAppStoreWithOut() {
  return useApp(store)
}
