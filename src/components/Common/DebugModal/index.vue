<template>
  <div v-if="IS_DEV">
    <slot>
      <b-button @click="showDebug" type="text" text-color="danger" v-if="IS_DEV">
        <b-icon name="bug" size="18"></b-icon>
      </b-button>
    </slot>
    <b-modal
      title="debug"
      append-to-body
      v-model="debugVisible"
      :width="width"
      @opened="showEditor"
    >
      <b-skeleton :loading="!render" animation :rows="10">
        <b-ace-editor :model-value="debugStr" readonly :height="height" />
      </b-skeleton>
    </b-modal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { IS_DEV } from '@/utils/env'
defineOptions({ name: 'DebugModal' })

const props = defineProps({
  data: {
    type: [Object, Array],
  },
  width: {
    type: String,
    default: '600px',
  },
  height: {
    type: String,
    default: '400px',
  },
})

const debugStr = ref('')
const debugVisible = ref(false)
const render = ref(false)
function showDebug() {
  render.value = false
  debugStr.value = JSON.stringify(props.data, null, 2)
  debugVisible.value = true
}
function showEditor() {
  render.value = true
}

function show(data) {
  render.value = false
  debugStr.value = JSON.stringify(data, null, 2)

  debugVisible.value = true
}

defineExpose({ show })
</script>
