<template>
  <div class="flow-editor-wrap">
    <VueFlow
      class="custom-flow"
      :nodes="nodes"
      :edges="edges"
      :min-zoom="0.3"
      :max-zoom="1.5"
      :default-viewport="{ zoom: 1 }"
      @drop="onDrop"
      @dragover="onDragOver"
      @connect="onConnect"
    >
      <Background :size="1" :gap="20" pattern-color="#91919a" />
      <MiniMap />
      <Controls position="top-right">
        <ControlButton title="Log `toObject`" @click="logToObject">
          <b-icon name="bug"></b-icon>
        </ControlButton>
      </Controls>

      <!-- 自定义连线 -->
      <template #edge-button="buttonEdgeProps">
        <EdgeWithButton
          :id="buttonEdgeProps.id"
          :source-x="buttonEdgeProps.sourceX"
          :source-y="buttonEdgeProps.sourceY"
          :target-x="buttonEdgeProps.targetX"
          :target-y="buttonEdgeProps.targetY"
          :source-position="buttonEdgeProps.sourcePosition"
          :target-position="buttonEdgeProps.targetPosition"
          :marker-end="buttonEdgeProps.markerEnd"
          :style="buttonEdgeProps.style"
        />
      </template>

      <!-- 自定义开始节点 -->
      <template #node-start="node">
        <StartNode :node="node" />
      </template>
      <!-- 自定义简单任务节点 -->
      <template #node-simple="node">
        <SimpleNode :node="node" />
      </template>
      <!-- 自定义并联任务节点 -->
      <template #node-multiple="node">
        <MultipleNode :node="node" />
      </template>
      <!-- 自定义结束节点 -->
      <template #node-end="node">
        <EndNode :node="node" />
      </template>
    </VueFlow>

    <Sidebar />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { ControlButton, Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'
import useDragDrop from './hooks/useDragDrop'
import useEdges from './hooks/useEdges'
import Sidebar from './Sidebar.vue'

import EdgeWithButton from './components/EdgeWithButton.vue'
import StartNode from './components/StartNode.vue'
import SimpleNode from './components/SimpleNode.vue'
import MultipleNode from './components/MultipleNode.vue'
import EndNode from './components/EndNode.vue'
import './styles.css'

const { toObject } = useVueFlow()
const nodes = ref([])
const edges = ref([])

const { onDragOver, onDrop } = useDragDrop()
const { onConnect } = useEdges()

function logToObject() {
  const { nodes, edges } = toObject()
  console.log('--------------------------------------state--------------------------------------')
  console.log('----> nodes: ', nodes)
  console.log('----> edges: ', edges)
  console.log('---------------------------------------------------------------------------------')
}
</script>

<style scoped>
.flow-editor-wrap {
  width: 100%;
  height: 100%;
  min-height: 400px;
  position: relative;
}
</style>
