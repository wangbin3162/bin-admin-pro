<template>
  <SheetEdit v-if="render" />
</template>

<script setup>
import { useRoute } from 'vue-router'
import { watch, ref } from 'vue'
import * as api from '@/api/modules/excel.api'
import { excelData, initData } from '../ExcelEdit/useData'
import SheetEdit from './SheetEdit.vue'
import { deepCopy } from '@/utils/util'

defineOptions({
  name: 'DataEdit',
})

const route = useRoute()
const render = ref(false)

// 初始化表格数据
function initSheetData(detail) {
  const mapping = deepCopy(excelData.value.mapping)
  const sheet0 = excelData.value.jsonData?.sheets[0]
  if (sheet0) {
    const celldata = sheet0.celldata || []
    // 从celldata中查找mapping中的cellIndex 的位置，并填充相关数据
    mapping.forEach(item => {
      const { cellIndex, fieldName } = item
      const { column, row } = cellIndex
      const cIndex = celldata.findIndex(i => i.c === column && i.r === row)
      // 如果存在当前这个单元格，则单元格内容给扩展两个属性
      if (cIndex > -1) {
        celldata[cIndex].v.v = celldata[cIndex].v.m = detail.data[fieldName]
      }
    })
  }
}

watch(
  () => route.path,
  async () => {
    const { tempId, id } = route.query
    document.title = '数据填报'
    if (tempId) {
      initData()
      // 如果是有id表示为修改，无id则获取创建对象来进行设置
      const detail = await api.getTempDetail(tempId)
      excelData.value = { ...detail }

      // 如果id存在，则获取当前这条数据的详情
      if (id) {
        const detail = await api.getSheetDataDetail(id)
        initSheetData(detail)
      }
    }
    render.value = true
  },
  { immediate: true },
)
</script>
