<template>
  <div class="easy-flow" :style="{ height }" v-if="easyFlowVisible">
    <div class="left-side">
      <b-button @click="infoVisible = true">流程信息</b-button>

      <b-button icon="delete" @click="deleteElement" :disabled="!activeElement.type"></b-button>

      <pre>{{ menu }}</pre>
    </div>
    <div
      class="canvas-side"
      id="efContainer"
      ref="efContainer"
      v-flow-drag
      @click.self="clickCanvas"
    >
      <FlowNode
        v-for="node in data.nodeList"
        :key="node.id"
        :id="node.id"
        :node="node"
        :activeElement="activeElement"
        @clickNode="clickNode"
        @changeNodeSite="changeNodeSite"
        @nodeRightMenu="nodeRightMenu"
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
import { ref, onMounted, nextTick, reactive, watch } from 'vue'
import getMockData from './mock-data'
import { deepCopy } from '@/utils/util'
import './index.styl'
import { Message, MessageBox } from 'bin-ui-next'

defineProps({
  height: {
    type: String,
    default: '100%',
  },
})
const easyFlowVisible = ref(false) // 流程dom渲染
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

const menu = reactive({
  show: false,
  type: '', // node-line
  left: 0,
  top: 0,
})

let jp

onMounted(() => {
  const flowData = getMockData('dataB')
  dataReload(flowData)
})

// ------------------------辅助判断函数------------------------ //

// 是否有当前连线
function hasLine(from, to) {
  const { lineList } = data.value
  return lineList.findIndex(line => line.from === from && line.to === to) > -1
}

// 是否含有相反的线
function hashOppositeLine(from, to) {
  return hasLine(to, from)
}

// ------------------------绘图生成函数------------------------ //

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
  jp.jsplumb.bind('connection', lineConnect)
  // 删除连线回调
  jp.jsplumb.bind('connectionDetached', lineDelete)
  // 改变线的连接节点
  jp.jsplumb.bind('connectionMoved', changeLine)
  // 连线右击
  jp.jsplumb.bind('contextmenu', (conn, ev) => {
    ev.preventDefault()
    clickLine(conn) // 先调用选中，再调出右键菜单
    lineRightMenu(ev)
  })
  // 连线前
  jp.jsplumb.bind('beforeDrop', beforeLineDrop)
  // 移除线前
  // jp.jsplumb.bind('beforeDetach', evt => {})
  console.log('----------new plumb----------', jp)
}

// ------------------------画布元素事件------------------------ //

// 点击画布事件
function clickCanvas() {
  // console.log('------------点击画布----------------')
}

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

// 删除节点
function deleteNode(nodeId) {
  const index = data.value.nodeList.findIndex(node => node.id === nodeId)
  data.value.nodeList.splice(index, 1)
  nextTick(() => {
    jp.removeAllEndpoints(nodeId)
  })
}

// 删除激活的元素
function deleteElement() {
  const { type, nodeId, sourceId, targetId } = activeElement.value
  MessageBox.confirm({
    type: 'warning',
    title: '提示',
    message: `确定删除当前选中的${type === 'node' ? '节点' : '连接线'}吗?`,
  })
    .then(() => {
      if (type === 'node') {
        deleteNode(nodeId)
      } else if (type === 'line') {
        jp.deleteConnection(sourceId, targetId)
      }
    })
    .catch(() => {})
}

// ------------------------右键菜单------------------------ //

// 节点右键菜单
function nodeRightMenu(nodeId, evt) {
  clickNode(nodeId)
  menu.show = true
  menu.type = 'node'
  menu.left = evt.x + 'px'
  menu.top = evt.y + 'px'
}

// 连线右键菜单
function lineRightMenu(evt) {
  menu.show = true
  menu.type = 'line'
  menu.left = evt.x + 'px'
  menu.top = evt.y + 'px'
}

function closeMenu() {
  menu.show = false
  menu.type = ''
  menu.left = 0
  menu.top = 0
}

watch(
  () => menu.show,
  val => {
    if (val) {
      document.body.addEventListener('click', closeMenu)
    } else {
      document.body.removeEventListener('click', closeMenu)
    }
  },
)

// ------------------------连线监听事件------------------------ //

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

// 连线前事件
function beforeLineDrop(conn) {
  const { sourceId: from, targetId: to } = conn
  if (from === to) {
    // Message.error('节点不能连接自己!')
    return false
  }
  if (hasLine(from, to)) {
    Message.error('该关系已存在,不允许重复创建')
    return false
  }
  if (hashOppositeLine(from, to)) {
    Message.error('不支持两个节点之间连线回环')
    return false
  }
  Message.success('连接成功')
  return true
}

// 连线成功事件（需要添加到数据中去）
function lineConnect(conn) {
  const { sourceId: from, targetId: to } = conn
  if (jp.loadEasyFlowFinish) {
    data.value.lineList.push({ from, to })
  }
}

// 连线删除事件（需要同步数据中去）
function lineDelete(conn) {
  const { sourceId: from, targetId: to } = conn
  const index = data.value.lineList.findIndex(line => line.from === from && line.to === to)
  data.value.lineList.splice(index, 1)
}

// 改变线连接点
function changeLine(conn) {
  const { originalSourceId: from, originalTargetId: to } = conn
  const index = data.value.lineList.findIndex(line => line.from === from && line.to === to)
  data.value.lineList.splice(index, 1)
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
