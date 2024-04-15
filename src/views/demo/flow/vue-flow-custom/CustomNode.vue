<template>
  <div class="custom-node">
    <div>CustomNode</div>
    {{ props.node.id }}
    <Handle id="a" type="target" :position="Position.Left" />
    <Handle id="b" type="source" :position="Position.Right" />
  </div>
</template>

<script setup>
import { Handle, Position } from '@vue-flow/core'

const props = defineProps({
  node: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.custom-node {
  background-color: #f2f2f2;
  border: 1px solid #ccc;
  padding: 8px;
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
