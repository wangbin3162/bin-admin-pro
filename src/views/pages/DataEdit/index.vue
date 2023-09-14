<template>
  <SheetEdit v-if="render" />
</template>

<script setup>
import { useRoute } from 'vue-router'
import { watch, ref } from 'vue'
import * as api from '@/api/modules/excel.api'
import { excelData, initData } from '../ExcelEdit/useData'
import SheetEdit from './SheetEdit.vue'

defineOptions({
  name: 'DataEdit',
})

const route = useRoute()
const render = ref(false)

watch(
  () => route.path,
  async () => {
    const { tempId } = route.query
    document.title = '数据填报'
    if (tempId) {
      initData()
      // 如果是有id表示为修改，无id则获取创建对象来进行设置
      const detail = await api.getTempDetail(tempId)
      excelData.value = { ...detail }
    }
    render.value = true
  },
  { immediate: true },
)
</script>
