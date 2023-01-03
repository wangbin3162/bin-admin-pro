<template>
  <div>
    <div :id="id"></div>
  </div>
</template>

<script>
export default { name: 'Graphviz' }
</script>

<script setup>
import * as d3 from 'd3'
import * as d3Graphviz from 'd3-graphviz'
import { onMounted, watch, ref } from 'vue'

const props = defineProps({
  id: {
    type: String,
    default: 'graph',
  },
  code: {
    type: String,
    default: `digraph G {
            node [shape="record"];
            edge [style="dashed"];
            a -> b
          }`,
  },
  width: {
    type: Number,
  },
  height: {
    type: Number,
  },
  scale: {
    type: Number,
  },
})

function render() {
  d3.select(`#${props.id}`).graphviz(`#${props.id}`).renderDot(props.code)
  console.log(`render id:#${props.id}`)
}

onMounted(() => {
  render()
})
watch(
  () => props.code,
  () => render(),
)
</script>
