<template>
  <b-modal
    v-model="visible"
    :show-close="showClose"
    :body-styles="{ padding: 0 }"
    :transition-name="transitionName"
    fullscreen
    append-to-body
    destroy-on-close
  >
    <div class="content-warpper">
      <slot></slot>
    </div>
    <template #footer v-if="$slots.footer">
      <slot name="footer"></slot>
    </template>
  </b-modal>
</template>

<script setup>
import { computed } from 'vue'

defineOptions({
  name: 'FullScreenModal',
})

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: Boolean,
  },
  showClose: {
    type: Boolean,
    default: false,
  },
  transitionName: {
    type: String,
    default: 'zoom-in',
  },
})

const visible = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val),
})
</script>

<style>
.content-warpper {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
