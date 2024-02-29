<template>
  <div class="flow-wraper">
    <div class="controls"></div>
    <VueFlow :nodes="nodes" :edges="edges"></VueFlow>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Position, VueFlow } from '@vue-flow/core'

const nodes = ref([
  {
    id: '1',
    type: 'input',
    label: 'Dblclick me',
    position: { x: 100, y: 100 },
    sourcePosition: Position.Right,
  },
  {
    id: '2',
    type: 'output',
    label: 'Dblclick me',
    position: { x: 400, y: 400 },
    targetPosition: Position.Left,
  },
])

const edges = ref([
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    animated: true,
    style: { stroke: '#333' },
  },
])
</script>

<style scoped>
.flow-wraper {
  position: relative;
  height: 100%;
  .controls {
    position: absolute;
    z-index: 1;
  }
}
</style>
