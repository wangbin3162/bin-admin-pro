<template>
  <div class="easy-flow-container" :style="{ height }">
    <div class="ef-toolbar">
      <b-button type="text">{{ data.name }}</b-button>
      <b-divider type="vertical"></b-divider>
      <b-button
        type="text"
        icon="delete"
        @click="deleteElement"
        :disabled="!activeElement.type"
      ></b-button>

      <div style="float: right; margin-right: 5px">
        <b-button size="small" type="info" plain icon="filedone" @click="infoVisible = true">
          流程信息
        </b-button>
        <b-dropdown trigger="click" style="margin: 0 10px" @command="dataReload">
          <b-button size="small" type="info" plain icon="database">数据源</b-button>
          <template #dropdown>
            <b-dropdown-menu>
              <b-dropdown-item name="dataA">dataA</b-dropdown-item>
              <b-dropdown-item name="dataB">dataB</b-dropdown-item>
              <b-dropdown-item name="dataC">dataC</b-dropdown-item>
              <b-dropdown-item name="dataD">dataD</b-dropdown-item>
            </b-dropdown-menu>
          </template>
        </b-dropdown>
        <b-button size="small" type="info" plain icon="book" @click="helpVisible = true">
          帮助
        </b-button>
      </div>
    </div>
    <div class="easy-flow" v-if="easyFlowVisible">
      <div class="left-side">
        <FlowMenu :repeat="repeat" :data="data" />
      </div>

      <div
        class="canvas-side"
        id="efContainer"
        ref="efContainer"
        v-flow-drag
        @click.self="clickCanvas"
        @dragover.prevent
        @drop="nodeDrop"
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
        <FlowForm
          ref="nodeFormRef"
          @setLineLabel="setLineLabel"
          @saveNode="saveNode"
          @cancelSelect="cancelSelect"
        />
      </div>

      <FlowInfo v-model="infoVisible" :data="data" />
      <ContextMenu :data="menu" @delete="deleteElement" />
    </div>

    <Helper v-model="helpVisible" />
  </div>
</template>

<script>
export default {
  name: 'EasyFlow',
}
</script>
<script setup>
import FlowNode from './components/flow-node.vue'
import FlowMenu from './components/flow-menu.vue'
import FlowForm from './components/flow-form.vue'
import ContextMenu from './components/context-menu.vue'
import FlowInfo from './components/flow-info.vue'
import Helper from './components/helper.vue'
import Plumb from './lib/Plumb'
import { ref, onMounted, nextTick, reactive, watch } from 'vue'
import getMockData from './mock-data'
import { deepCopy, getUuid } from '@/utils/util'
import { Message, MessageBox } from 'bin-ui-design'
import './index.styl'

const props = defineProps({
  height: {
    type: String,
    default: '100%',
  },
  // 是否可以重复拖入
  repeat: {
    type: Boolean,
    default: true,
  },
})
const easyFlowVisible = ref(false) // 流程dom渲染
const nodeFormRef = ref(null)
const efContainer = ref(null)
const infoVisible = ref(false)
const helpVisible = ref(false)
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
  dataReload('dataA')
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
async function dataReload(dataName) {
  const flowData = getMockData(dataName)
  activeElement.value.type = 'node'
  activeElement.value.nodeId = ''
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
    lineRightMenu(conn, ev)
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

// 画布放置事件
function nodeDrop(ev) {
  ev.preventDefault()
  let json = ev.dataTransfer.getData('node')
  let node = {}
  try {
    node = JSON.parse(json)
  } catch (error) {
    console.log('drag data is not right json!')
    return
  }

  // 计算位置信息
  const containerRect = efContainer.value.getBoundingClientRect()
  const screenX = ev.clientX
  const screenY = ev.clientY

  const left = screenX - containerRect.x + efContainer.value.scrollLeft - 85
  const top = screenY - containerRect.y + efContainer.value.scrollTop - 16

  // 动态生成名字
  let origName = node.name
  let nodeName = origName

  // nodeId
  let nodeId = node.id

  // 如果允许重复则可以动态改变名字和重新生成id
  if (props.repeat) {
    let index = 1
    while (index < 10000) {
      let repeat = false
      for (let i = 0; i < data.value.nodeList.length; i++) {
        let item = data.value.nodeList[i]
        if (item.name === nodeName) {
          nodeName = origName + index
          repeat = true
        }
      }
      if (repeat) {
        index++
        continue
      }
      break
    }

    nodeId = getUuid()
  }

  // 新的节点信息
  const newNode = {
    id: nodeId,
    name: nodeName,
    type: node.type,
    left: left + 'px',
    top: top + 'px',
    ico: node.ico,
  }

  /**
   * 这里可以进行业务判断、是否能够添加该节点
   */
  data.value.nodeList.push(newNode)
  nextTick(() => jp.addNode(nodeId))
}
// ------------------------右键菜单------------------------ //

// 节点右键菜单
function nodeRightMenu(nodeId, evt) {
  clickNode(nodeId)
  menu.show = true
  menu.type = 'node'
  menu.left = evt.clientX + 'px'
  menu.top = evt.clientY + 'px'
}

// 连线右键菜单
function lineRightMenu(conn, evt) {
  clickLine(conn) // 先调用选中，再调出右键菜单
  menu.show = true
  menu.type = 'line'
  menu.left = evt.clientX + 'px'
  menu.top = evt.clientY + 'px'
}

function closeMenu() {
  menu.show = false
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

// 取消选中节点
function cancelSelect() {
  activeElement.value = {
    // 可选值 node 、line
    type: undefined,
    // 节点ID
    nodeId: undefined,
    // 连线ID
    sourceId: undefined,
    targetId: undefined,
  }
}
</script>

<style scoped>
.ef-toolbar {
  padding-left: 10px;
  box-sizing: border-box;
  height: 42px;
  line-height: 42px;
  z-index: 3;
  border-bottom: 1px solid #dadce0;
  background: #fff;
}
.easy-flow {
  display: flex;
  height: calc(100% - 42px);
  background-color: #fff;
  .left-side {
    width: 200px;
    border-right: 1px solid #eeeeee;
  }
  .canvas-side {
    position: relative;
    overflow: scroll;
    width: calc(100% - 500px);
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
