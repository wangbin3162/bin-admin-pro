<template>
  <!-- 你可以使用' BaseEdge '组件更容易地创建自己的自定义边缘 -->
  <BaseEdge :id="id" :style="style" :path="path[0]" :marker-end="markerEnd" />

  <!-- 使用' EdgeLabelRenderer '来转义SVG的边缘世界，并在a中呈现您自己的自定义标签`<div>` ctx -->
  <EdgeLabelRenderer v-if="nodesConnectable">
    <div
      :style="{
        pointerEvents: 'all',
        position: 'absolute',
        transform: `translate(-50%, -50%) translate(${path[1]}px,${path[2]}px)`,
      }"
      class="nodrag nopan"
      @click="removeEdges(id)"
    >
      <svg
        class="chakra-icon edgebutton"
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        focusable="false"
      >
        <path
          d="M848.418 174.49q69.905 69.905 104.312 157.286t34.406 179.132-34.406 179.131-104.312 157.287-157.286 104.857T512 987.136t-179.678-34.953T174.49 847.326 69.632 690.039 34.679 510.908t34.953-179.132T174.49 174.49 332.322 70.178 512 35.772t179.132 34.406T848.418 174.49zM734.822 729.36q22.938-22.938 20.207-52.429t-25.668-52.429L614.673 509.815l114.688-114.688Q752.3 372.19 755.03 342.7t-20.207-52.43-55.16-22.937-55.159 22.938L509.815 403.866l-111.41-111.412q-22.938-21.845-52.43-24.576t-52.428 19.115q-22.938 22.938-22.938 55.706t22.938 55.705l111.41 111.411-111.41 111.412q-22.938 22.937-22.938 55.16t22.938 55.159 52.428 20.207 52.43-25.669l111.41-111.41L624.503 729.36q22.938 22.938 55.16 22.938t55.16-22.938z"
        ></path>
      </svg>
    </div>
  </EdgeLabelRenderer>
</template>

<script>
export default {
  inheritAttrs: false,
}
</script>

<script setup>
import { BaseEdge, EdgeLabelRenderer, getBezierPath } from '@vue-flow/core'
import { computed } from 'vue'
import useEdges from '../hooks/useEdges'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  sourceX: {
    type: Number,
    required: true,
  },
  sourceY: {
    type: Number,
    required: true,
  },
  targetX: {
    type: Number,
    required: true,
  },
  targetY: {
    type: Number,
    required: true,
  },
  sourcePosition: {
    type: String,
    required: true,
  },
  targetPosition: {
    type: String,
    required: true,
  },
  markerEnd: {
    type: String,
    required: false,
  },
  style: {
    type: Object,
    required: false,
  },
})

const { removeEdges, nodesConnectable } = useEdges()

const path = computed(() => getBezierPath(props))
</script>

<style scoped>
.nodrag {
  &.nopan {
    width: 20px;
    height: 20px;
    border-radius: 20px;
    border: 1px solid #e8ebf0;
    background-color: #fff;
    cursor: pointer;
    &:hover {
      box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.08);
    }
  }
}
.edgebutton {
  display: inline-block;
  line-height: 1em;
  flex-shrink: 0;
  color: #8a95a7;
  width: 100%;
  height: auto;
  box-sizing: content-box;
  vertical-align: top;
  fill: currentcolor;
}
</style>
