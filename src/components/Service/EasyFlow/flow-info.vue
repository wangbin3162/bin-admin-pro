<template>
  <b-modal v-model="visible" title="流程数据信息" width="680px">
    <b-ace-editor :model-value="JSON.stringify(data, null, 2)" height="500px" />
  </b-modal>
</template>

<script setup>
import { computed } from 'vue'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
})

const visible = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val),
})
</script>
