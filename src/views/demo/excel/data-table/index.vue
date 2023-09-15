<template>
  <page-wrapper
    v-if="modalVisible"
    :title="`${currentSheet.name ? `[${currentSheet.name}] ` : ''}数据查看`"
    show-close
    @close="handleCancel"
  >
    {{ currentSheet.name }}
  </page-wrapper>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { deepCopy } from '@/utils/util'

defineOptions({
  name: 'SysRole',
})

const emit = defineEmits(['close'])

const modalVisible = ref(false)

const query = reactive({
  page: 1,
  size: 10,
})

const currentSheet = ref({})

function open(data) {
  modalVisible.value = true
  currentSheet.value = deepCopy(data)
  console.log(currentSheet.value)
}

function handleCancel() {
  modalVisible.value = false
  emit('close')
}

defineExpose({ open })
</script>
