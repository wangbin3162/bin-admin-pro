import { defineStore } from 'pinia'

const useTodoList = defineStore('todolist', {
  state: () => ({
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
  actions: {},
})

export default useTodoList
