import { ref } from 'vue'

// 共享变量数据
const excelData = ref({
  id: '',
  name: '', // 模板名称，也就是保存时的文件名称
  jsonData: [],
  mapping: [],
})

function initData() {
  excelData.value = {
    id: '',
    name: '',
    jsonData: [],
    mapping: [],
  }
}

export { excelData, initData }
