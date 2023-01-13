<template>
  <page-container>
    <b-collapse-wrap title="基础用法" shadow="none" class="mb-16">
      <div class="p10">
        <div ref="dom1Ref"></div>
        <b-button @click="change1('prop')">Prop</b-button>
        <b-button @click="change1('attr')">attr</b-button>
      </div>
    </b-collapse-wrap>
    <b-collapse-wrap title="自定义节点功能" shadow="none" class="mb-16">
      <div class="p10">
        <div ref="dom2Ref"></div>
      </div>
    </b-collapse-wrap>
  </page-container>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { Graph, Color } from '@antv/x6'
import { register } from '@antv/x6-vue-shape'
import { Selection } from '@antv/x6-plugin-selection'
import DataNode from '../functions/components/data-node.vue'

const dom1Ref = ref(null)
let graph1

function render1() {
  const data = {
    nodes: [
      {
        id: 'node1',
        shape: 'rect',
        x: 40,
        y: 40,
        width: 100,
        height: 40,
        label: 'hello',
        attrs: {
          body: {
            stroke: '#8f8f8f',
            strokeWidth: 1,
            fill: '#fff',
            rx: 6,
            ry: 6,
          },
        },
      },
      {
        id: 'node2',
        shape: 'rect',
        x: 160,
        y: 180,
        width: 100,
        height: 40,
        label: 'world',
        attrs: {
          body: {
            stroke: '#8f8f8f',
            strokeWidth: 1,
            fill: '#fff',
            rx: 6,
            ry: 6,
          },
        },
      },
    ],
    edges: [
      {
        shape: 'edge',
        source: 'node1',
        target: 'node2',
        label: 'x6',
        attrs: {
          line: {
            stroke: '#8f8f8f',
            strokeWidth: 1,
          },
        },
      },
    ],
  }
  graph1 = new Graph({
    container: dom1Ref.value,
    width: '100%',
    height: 300,
    background: {
      color: '#F2F7FA',
    },
    grid: {
      visible: true,
      type: 'doubleMesh',
      args: [
        {
          color: '#eee', // 主网格线颜色
          thickness: 1, // 主网格线宽度
        },
        {
          color: '#ddd', // 次网格线颜色
          thickness: 1, // 次网格线宽度
          factor: 4, // 主次网格线间隔
        },
      ],
    },
    panning: true,
    // mousewheel: true,
  })

  graph1.fromJSON(data)
  graph1.centerContent()

  graph1.addNode({
    shape: 'rect',
    x: 200,
    y: 40,
    width: 100,
    height: 40,
    label: 'edge',
    attrs: {
      body: {
        fill: '#fff',
        stroke: '#8f8f8f',
        strokeWidth: 1,
        rx: 10,
        ry: 20,
      },
    },
  })
}
function change1(command) {
  const nodes = graph1.getNodes()
  console.log(nodes)
  if (command === 'prop') {
    nodes.forEach(node => {
      const width = 100 + Math.floor(Math.random() * 50)
      const height = 40 + Math.floor(Math.random() * 10)
      node.prop('size', { width, height })
    })
  }
  if (command === 'attr') {
    nodes.forEach(node => {
      const color = Color.random().toHex()
      node.attr('body/fill', color)
    })
  }
}

// ----------------------自定义节点和连接桩等----------------------//
const dom2Ref = ref(null)
let graph2

register({
  shape: 'data-node',
  width: 120,
  height: 36,
  component: DataNode,
  ports: {
    groups: {
      top: {
        position: 'top',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#C2C8D5',
            strokeWidth: 1,
            fill: '#fff',
          },
        },
      },
      bottom: {
        position: 'bottom',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#C2C8D5',
            strokeWidth: 1,
            fill: '#fff',
          },
        },
      },
    },
  },
})

Graph.registerEdge(
  'dag-edge',
  {
    inherit: 'edge',
    attrs: {
      line: {
        stroke: '#C2C8D5',
        strokeWidth: 1,
        targetMarker: null,
      },
    },
  },
  true,
)

function render2() {
  const data = {
    nodes: [
      {
        id: 'A',
        shape: 'data-node',
        x: 0,
        y: 0,
        data: { label: 'A' },
      },
      {
        id: 'B',
        shape: 'data-node',
        x: 0,
        y: 100,
        data: { label: 'B' },
      },
      {
        id: 'C',
        shape: 'data-node',
        x: 0,
        y: 200,
        data: { label: 'C' },
      },
      {
        id: 'D',
        shape: 'data-node',
        x: 200,
        y: 0,
        data: { label: 'D' },
      },
      {
        id: 'E',
        shape: 'data-node',
        x: 200,
        y: 100,
        data: { label: 'E' },
      },
      {
        id: 'F',
        shape: 'data-node',
        x: 200,
        y: 200,
        data: { label: 'F' },
      },
    ],
  }

  graph2 = new Graph({
    container: dom2Ref.value,
    width: '100%',
    height: 300,
    background: {
      color: '#F2F7FA',
    },
    grid: {
      visible: true,
      type: 'doubleMesh',
      args: [
        {
          color: '#eee', // 主网格线颜色
          thickness: 1, // 主网格线宽度
        },
        {
          color: '#ddd', // 次网格线颜色
          thickness: 1, // 次网格线宽度
          factor: 4, // 主次网格线间隔
        },
      ],
    },
    panning: true,
  })

  graph2.use(new Selection({ enabled: true }))

  graph2.fromJSON(data)
  graph2.centerContent()
}

onMounted(async () => {
  await nextTick()
  render1()
  render2()
})
</script>
