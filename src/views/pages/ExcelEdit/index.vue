<template>
  <SheetConfig v-if="render" />
</template>

<script setup>
import { useRoute } from 'vue-router'
import { watch, ref } from 'vue'
import SheetConfig from './SheetConfig.vue'
import { excelData, initData } from './useData'

defineOptions({
  name: 'ExcelEdit',
})

const route = useRoute()
const render = ref(false)

watch(
  () => route.path,
  async () => {
    const { id } = route.query
    if (id) {
      // 如果是有id表示为修改，无id则获取创建对象来进行设置
      // await getBaseInfo(id)
    } else {
      console.log('------当前是新增------')
      document.title = '新增模板'
      initData()
      excelData.value.name = '新模板'
    }
    render.value = true
  },
  { immediate: true },
)
</script>
