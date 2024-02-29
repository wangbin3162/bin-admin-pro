<template>
  <div class="flow-wraper">
    <VueFlow :nodes="nodes" :edges="edges">
      <div class="updatenode__controls">
        <label>label:</label>
        <b-input v-model="opts.label" @input="handleUpdate" />

        <label class="updatenode__bglabel">background:</label>
        <b-color-picker v-model="opts.bg" style="background-color: #fff" @change="handleUpdate" />

        <div class="updatenode__checkboxwrapper">
          <label>hidden：</label>
          <b-checkbox v-model="opts.hidden" @change="handleUpdate"></b-checkbox>
        </div>
      </div>
    </VueFlow>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { VueFlow, useVueFlow } from '@vue-flow/core'

const { onPaneReady, findNode, updateNode } = useVueFlow()

const opts = reactive({
  bg: '#eeeeee',
  label: 'Node 1',
  hidden: false,
})

const nodes = ref([
  {
    id: '1',
    label: opts.label,
    style: { backgroundColor: opts.bg },
    hidden: opts.hidden,
    position: { x: 100, y: 100 },
  },
  { id: '2', label: 'Node 2', position: { x: 100, y: 200 } },
])

const edges = ref([{ id: 'e1-2', source: '1', target: '2' }])

onPaneReady(({ fitView }) => {
  fitView()
})

function handleUpdate() {
  updateNode(nodes.value[0].id, {
    label: opts.label,
    style: { backgroundColor: opts.bg },
    hidden: opts.hidden,
  })
}
</script>

<style scoped>
.flow-wraper {
  position: relative;
  height: 100%;
  .controls {
    position: absolute;
    z-index: 1;
  }
  .updatenode__controls {
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 4;
    font-size: 14px;
    background-color: #eee;
    border-radius: 5px;
    padding: 16px;
  }
  .updatenode__controls label {
    display: blocK;
  }
  .updatenode__controls input {
    padding: 2px;
    border-radius: 5px;
  }
  .updatenode__bglabel {
    margin-top: 8px;
  }
  .updatenode__checkboxwrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 8px;
  }
}
</style>
