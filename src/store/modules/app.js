import { defineStore } from 'pinia'
import { store } from '@/store'

const useApp = defineStore('app', {
  state: () => ({
    searchVisible: false, // 全局查询面板开启情况
    settingVisible: false, // 全局配置设置开启情况
    weather: {}, // 全局天气
    // 快捷链接
    links: [
      {
        link: 'https://wangbin3162.gitee.io/bin-ui-next',
        text: 'bin-ui-next',
        newTab: true,
      },
      {
        link: 'https://wangbin3162.gitee.io/bin-editor-next',
        text: 'bin-editor-next',
        newTab: true,
      },
      {
        link: 'https://wangbin3162.gitee.io/bin-charts-next',
        text: 'bin-charts-next',
        newTab: true,
      },
      {
        link: 'https://wangbin3162.gitee.io/bin-tree-org',
        text: 'bin-tree-org',
        newTab: true,
      },
      {
        link: 'https://wangbin3162.gitee.io/bin-animation',
        text: 'bin-animation',
        newTab: true,
      },
    ],
    todolist: [
      { done: false, text: '未完成任务事项' },
      { done: false, text: '实现代码更新' },
      { done: false, text: '更新组件库' },
      { done: true, text: '代办事项文字说明' },
      { done: false, text: '编写统一的说明文档' },
    ],
  }),
  getters: {
    todoDone() {
      return this.todolist.filter(v => v.done)
    },
    todoLabel() {
      return `${this.todoDone.length} / ${this.todolist.length}`
    },
    leftCount() {
      return this.todolist.length - this.todoDone.length
    },
  },
  actions: {
    setWeather(wea) {
      this.weather = wea
    },
    async addLink(link) {
      // 新增成功
      if (this.links.findIndex(v => v.link === link.link) === -1) {
        this.links.push(link)
        return true
      }
      throw new Error('不能添加相同地址的链接')
    },
    async closeLink(link) {
      const index = this.links.findIndex(v => v.link === link)
      // 找到了这个link
      if (index > -1) {
        this.links.splice(index, 1)
        return true
      }
      return false
    },
  },
})

export default useApp

export function useAppStoreWithOut() {
  return useApp(store)
}
