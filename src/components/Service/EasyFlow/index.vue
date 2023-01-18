<template>
  <div class="easy-flow" :style="{ height }" v-if="easyFlowVisible">
    <div class="left-side">
      <b-button @click="infoVisible = true">流程信息</b-button>
    </div>
    <div class="canvas-side" id="efContainer" ref="efContainer" v-flow-drag>
      <FlowNode
        v-for="node in data.nodeList"
        :key="node.id"
        :id="node.id"
        :node="node"
        :activeElement="activeElement"
        @clickNode="clickNode"
        @changeNodeSite="changeNodeSite"
      />
      <!-- 给画布一个默认的宽度和高度 -->
      <div class="move-grid" style="position: absolute; top: 2000px; left: 2000px">&nbsp;</div>
    </div>
    <div class="right-side">
      <FlowForm ref="nodeFormRef" @setLineLabel="setLineLabel" @saveNode="saveNode" />
    </div>

    <FlowInfo v-model="infoVisible" :data="data" />
  </div>
</template>

<script>
export default {
  name: 'EasyFlow',
}
</script>
<script setup>
import FlowNode from './flow-node.vue'
import FlowInfo from './flow-info.vue'
import FlowForm from './flow-form.vue'
import Plumb from './Plumb'
import { ref, onMounted, nextTick } from 'vue'
import getMockData from './mock-data'
import { deepCopy } from '@/utils/util'
import './index.styl'

defineProps({
  height: {
    type: String,
    default: '100%',
  },
})
const easyFlowVisible = ref(false)
const nodeFormRef = ref(null)
const infoVisible = ref(false)
const data = ref({ nodeList: [], lineList: [] })
const activeElement = ref({
  // 可选值 node 、line
  type: undefined,
  // 节点ID
  nodeId: undefined,
  // 连线ID
  sourceId: undefined,
  targetId: undefined,
})

let jp

onMounted(() => {
  const flowData = getMockData('dataB')
  dataReload(flowData)
})

// 数据载入
async function dataReload(flowData) {
  easyFlowVisible.value = false
  data.value = { nodeList: [], lineList: [] }
  await nextTick()
  easyFlowVisible.value = true
  data.value = deepCopy(flowData)
  await nextTick()
  jsPlumbInit()
}

// 初始化
function jsPlumbInit() {
  // 初始化
  jp = new Plumb(data.value)
  // 单点击了连接线, https://www.cnblogs.com/ysx215/p/7615677.html
  jp.jsplumb.bind('click', clickLine)
  // 连线
  jp.jsplumb.bind('connection', evt => {})
  // 删除连线回调
  jp.jsplumb.bind('connectionDetached', evt => {})
  // 改变线的连接节点
  jp.jsplumb.bind('connectionMoved', evt => {})
  // 连线右击
  jp.jsplumb.bind('contextmenu', evt => {})
  // 连线前
  jp.jsplumb.bind('beforeDrop', evt => {})
  // 移除线前
  jp.jsplumb.bind('beforeDetach', evt => {})
  console.log('----------new plumb----------', jp)
}

// ------------------------画布元素事件------------------------ //

// 节点点击事件
function clickNode(nodeId) {
  activeElement.value.type = 'node'
  activeElement.value.nodeId = nodeId
  nodeFormRef.value.nodeInit(data.value, nodeId)
}

// 改变节点的位置
function changeNodeSite(nodeData) {
  const { nodeList } = data.value
  for (let i = 0; i < nodeList.length; i++) {
    let node = nodeList[i]
    if (node.id === nodeData.nodeId) {
      node.left = nodeData.left
      node.top = nodeData.top
    }
  }
}

// 连线点击事件
function clickLine(conn) {
  activeElement.value.type = 'line'
  activeElement.value.sourceId = conn.sourceId
  activeElement.value.targetId = conn.targetId
  nodeFormRef.value.lineInit(data.value, {
    from: conn.sourceId,
    to: conn.targetId,
    label: conn.getLabel(),
  })
}

// ------------------------右侧保存事件------------------------ //

// 保存连线
function setLineLabel({ from, to, label }) {
  let conn = jp.getConnections(from, to)

  if (!label || label === '') {
    conn.removeClass('flowLabel')
    conn.addClass('emptyFlowLabel')
  } else {
    conn.addClass('flowLabel')
  }
  conn.setLabel({ label })
  data.value.lineList.forEach(line => {
    if (line.from === from && line.to === to) {
      line.label = label
    }
  })
}

// 保存节点
function saveNode() {
  jp.repaint()
}
</script>

<style scoped lang="stylus">
.easy-flow {
  display: flex;
  background-color: #fff;
  .left-side {
    width: 180px;
    border-right: 1px solid #eeeeee;
  }
  .canvas-side{
    position: relative;
    overflow: scroll;
    width: calc(100% - 480px);
    overflow: auto;
    background: url('@/assets/images/grid.svg');
  }
  .right-side {
    width: 300px;
    border-left: 1px solid #eeeeee;
    // background: linear-gradient(to right, #f5f5f5 1px, transparent 1px),linear-gradient(to bottom, #f5f5f5 1px, transparent 1px);
    // background-size: 10px 10px;
    // background: radial-gradient(circle, #dddddd 1px, transparent 1px);
    // background-size: 10px 10px;
  }
}
</style>
