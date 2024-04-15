<template>
  <page-wrapper>
    <div class="panel">
      <VueFlow
        :nodes="nodes"
        :edges="edges"
        :style="{ background: 'transparent' }"
        :default-zoom="1.5"
        fit-view-on-init
      >
        <Background :pattern-color="'#aaa'" gap="8" />

        <template #node-custom="props">
          <CustomNode :node="props" />
        </template>
      </VueFlow>
    </div>
  </page-wrapper>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { VueFlow, Position } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import CustomNode from './CustomNode.vue'

defineOptions({
  name: 'VueFlowCustom',
})

const nodes = ref([
  {
    id: '1',
    type: 'input',
    position: { x: 400, y: 5 },
    label: '发起人',
    data: {
      title: '发起人',
      content: '这是发起人的内容',
      ccIds: [], //抄送人IDs 实际为岗位数组
      postIds: [], //操作人IDs 实际为岗位数组
      postNames: [],
      ccNames: [],
      nodeOperations: '确认', //操作节点
    },
    sourcePosition: Position.Right, // or Bottom, Left, Right,
  },
  {
    id: '2',
    type: 'custom',
    position: { x: 400, y: 100 },
    label: '审批',
    // template: markRaw(OverwriteCustomNode),
    data: {
      ccIds: [], //抄送人IDs 实际为岗位数组
      postIds: [], //操作人IDs 实际为岗位数组
      postNames: [],
      ccNames: [],
      nodeOperations: '审批', //操作节点
    },
    targetPosition: Position.Left, // or Bottom, Left, Right,
    sourcePosition: Position.Right, // or Top, Left, Right,
  },
  {
    id: '3',
    type: 'custom',
    position: { x: 400, y: 250 },
    label: '处理',
    data: {
      ccIds: [], //抄送人IDs 实际为岗位数组
      postIds: [], //操作人IDs 实际为岗位数组
      postNames: [],
      ccNames: [],
      nodeOperations: '处理', //操作节点
    },
    targetPosition: Position.Left, // or Bottom, Left, Right,
    sourcePosition: Position.Right, // or Top, Left, Right,
  },
  {
    id: '4',
    type: 'custom',
    position: { x: 400, y: 400 },
    label: '确认',
    data: {
      ccIds: [], //抄送人IDs 实际为岗位数组
      postIds: [], //操作人IDs 实际为岗位数组
      postNames: [],
      ccNames: [],
      nodeOperations: '确认', //操作节点
    },
    targetPosition: Position.Left, // or Bottom, Left, Right,
    sourcePosition: Position.Right, // or Top, Left, Right,
  },
  {
    id: '5',
    type: 'output',
    position: { x: 400, y: 550 },
    label: '完成',
    data: {
      title: '流程结束',
      content: '这是流程结束的内容',
    },
    targetPosition: Position.Left, // or Bottom, Left, Right,
  },
])
const edges = ref([
  {
    id: 'e1-2',
    source: '1',
    type: 'smoothstep',
    label: '＋',
    target: '2',
    labelBgPadding: [8, 4],
    labelStyle: { fill: '#fff', fontWeight: 700 },
    labelBgBorderRadius: 4,
    labelBgStyle: { fill: '#10b981', color: '#fff', fillOpacity: 1 },
  },

  {
    id: 'e2-3',
    source: '2',
    type: 'smoothstep',
    label: '＋',
    target: '3',
    labelBgPadding: [8, 4],
    labelStyle: { fill: '#fff', fontWeight: 700 },
    labelBgBorderRadius: 4,
    labelBgStyle: { fill: '#10b981', color: '#fff', fillOpacity: 1 },
  },
  {
    id: 'e3-4',
    source: '3',
    type: 'smoothstep',
    label: '＋',
    target: '4',
    labelBgPadding: [8, 4],
    labelStyle: { fill: '#fff', fontWeight: 700 },
    labelBgBorderRadius: 4,
    labelBgStyle: { fill: '#10b981', color: '#fff', fillOpacity: 1 },
  },

  {
    id: 'e4-5',
    source: '4',
    type: 'smoothstep',
    label: '＋',
    target: '5',
    labelBgPadding: [8, 4],
    labelStyle: { fill: '#fff', fontWeight: 700 },
    labelBgBorderRadius: 4,
    labelBgStyle: { fill: '#10b981', color: '#fff', fillOpacity: 1 },
  },
])
</script>

<style>
@import '@vue-flow/core/dist/style.css';
@import '@vue-flow/core/dist/theme-default.css';
.panel {
  height: 500px;
  background-color: #fff;
}
</style>
