<template>
  <div class="flow-wraper">
    <div class="controls"></div>
    <VueFlow
      :nodes="nodes"
      :edges="edges"
      :class="{ dark }"
      class="basicflow"
      :default-viewport="{ zoom: 1.5 }"
      :min-zoom="0.6"
      :max-zoom="3"
    >
      <Background pattern-color="#aaa" :gap="16" />
      <MiniMap />
      <Controls position="top-right">
        <ControlButton title="Reset Transform" @click="resetTransform">
          <Icon name="reset" />
        </ControlButton>

        <ControlButton title="Shuffle Node Positions" @click="updatePos">
          <Icon name="update" />
        </ControlButton>

        <ControlButton title="Toggle Dark Mode" @click="toggleDarkMode">
          <Icon v-if="dark" name="sun" />
          <Icon v-else name="moon" />
        </ControlButton>

        <ControlButton title="Log `toObject`" @click="logToObject">
          <Icon name="log" />
        </ControlButton>
      </Controls>
    </VueFlow>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useVueFlow, VueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { ControlButton, Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'
import { initialEdges, initialNodes } from './initial-elements.js'
import Icon from './Icon.vue'

/**
 * useVueFlow provides all event handlers and store properties
 * You can pass the composable an object that has the same properties as the VueFlow component props
 */
const { onPaneReady, onNodeDragStop, setViewport, toObject } = useVueFlow()
const nodes = ref(initialNodes)
const edges = ref(initialEdges)
// our dark mode toggle flag
const dark = ref(false)

/**
 * onNodeDragStop is called when a node is done being dragged
 *
 * Node drag events provide you with:
 * 1. the event object
 * 2. the nodes array (if multiple nodes are dragged)
 * 3. the node that initiated the drag
 * 4. any intersections with other nodes
 */
onNodeDragStop(({ event, nodes, node, intersections }) => {
  console.log('Node Drag Stop', { event, nodes, node, intersections })
})

/**
 * Resets the current viewport transformation (zoom & pan)
 */
function resetTransform() {
  console.log(resetTransform)
  setViewport({ x: 0, y: 0, zoom: 1 })
}
/**
 * To update a node or multiple nodes, you can
 * 1. Mutate the node objects *if* you're using `v-model`
 * 2. Use the `updateNode` method (from `useVueFlow`) to update the node(s)
 * 3. Create a new array of nodes and pass it to the `nodes` ref
 */
function updatePos() {
  nodes.value = nodes.value.map(node => {
    return {
      ...node,
      position: {
        x: Math.random() * 400,
        y: Math.random() * 400,
      },
    }
  })
}
/**
 * toObject transforms your current graph data to an easily persist-able object
 */
function logToObject() {
  console.log(toObject())
}

function toggleDarkMode() {
  dark.value = !dark.value
}

onPaneReady(({ fitView }) => {
  fitView()
})
</script>

<style>
@import './styles.css';
.flow-wraper {
  position: relative;
  height: 100%;
  .controls {
    position: absolute;
    z-index: 1;
  }
}
</style>
