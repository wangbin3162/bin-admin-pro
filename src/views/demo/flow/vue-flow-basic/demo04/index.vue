<template>
  <div class="flow-wraper">
    <div class="dndflow" @drop="onDrop">
      <VueFlow :nodes="nodes" @dragover="onDragOver" @dragleave="onDragLeave">
        <DropzoneBackground
          :style="{
            backgroundColor: isDragging ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
            borderColor: isDragging ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
            transition: 'background-color 0.2s, border-color 0.2s',
          }"
        ></DropzoneBackground>
      </VueFlow>

      <Sidebar />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import useDragAndDrop from './useDnD'
import DropzoneBackground from './DropzoneBackground.vue'
import Sidebar from './Sidebar.vue'
import './styles.css'

const { onConnect, addEdges } = useVueFlow()

const { onDragOver, onDrop, onDragLeave, isDragging } = useDragAndDrop()

const nodes = ref([])

onConnect(addEdges)
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
