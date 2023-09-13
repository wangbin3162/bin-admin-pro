<template>
  <SheetConfig v-if="render" v-model:name="excelData.name" />
</template>

<script setup>
import { useRoute } from 'vue-router'
import { nextTick, watch, ref, provide } from 'vue'

defineOptions({
  name: 'ExcelEdit',
})

const route = useRoute()
const render = ref(false)
// 当前一条模板数据
const excelData = ref({
  id: '',
  name: '', // 模板名称，也就是保存时的文件名称
})

watch(
  () => route.path,
  async () => {
    const { id } = route.query
    if (id) {
      // 如果是有id表示为修改，无id则获取创建对象来进行设置
      // await getBaseInfo(id)
    } else {
      // await getCreateInfo()
      console.log('------当前是新增------')
      excelData.value.id = ''
      excelData.value.name = '新模板'
    }
    render.value = true
  },
  { immediate: true },
)
</script>
