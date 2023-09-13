import { defineStore } from 'pinia'
import { store } from '@/pinia'
import { toRaw } from 'vue'

const useExcel = defineStore('excel', {
  state: () => ({
    excelList: [
      {
        id: '0001',
        name: '工资数据上报',
        isPublish: '1',
        reportCount: 10,
        records: 10,
        saveData: {
          info: {
            name: '测试工资模板',
          },
          sheets: [],
        },
      },
    ],
  }),
  getters: {},
  actions: {
    getList({ page, size, name }) {
      const filterList = toRaw(this.excelList).filter(i => i.name.includes(name))
      const result = []
      let pageCount = Math.ceil(filterList.length / size)

      for (let i = 0; i < pageCount; i++) {
        let startIndex = i * size
        let endIndex = startIndex + size
        let pageItems = filterList.slice(startIndex, endIndex)
        result.push(pageItems)
      }

      return {
        rows: result[page - 1],
        total: filterList.length,
      }
    },
    removeOne(id) {
      const index = this.excelList.findIndex(i => i.id === id)
      if (index > 0) {
        this.excelList.splice(index, 1)
      }
    },
  },
  persist: true,
})

export default useExcel

// 是专门提供给外部文件使用的方法
export function useExcelStoreWithOut() {
  return useExcel(store)
}
