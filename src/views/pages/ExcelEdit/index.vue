<template>
  <SheetConfig v-if="render" />
</template>

<script setup>
import { useRoute } from 'vue-router'
import { watch, ref } from 'vue'
import SheetConfig from './SheetConfig.vue'
import { excelData, initData } from './useData'
import * as api from '@/api/modules/excel.api'
import { MappingItem } from '@/utils/luckysheet-util/default-data'

defineOptions({
  name: 'ExcelEdit',
})

const route = useRoute()
const render = ref(false)

watch(
  () => route.path,
  async () => {
    const { id } = route.query
    document.title = id ? '修改模板' : '新增模板'
    if (id) {
      // 如果是有id表示为修改，无id则获取创建对象来进行设置
      const detail = await api.getTempDetail(id)
      excelData.value = { ...detail }
      excelData.value.mapping = excelData.value.mapping.map(i => new MappingItem().getMerge(i))
    } else {
      initData()
      excelData.value.name = '新模板'
    }
    render.value = true
  },
  { immediate: true },
)
</script>
