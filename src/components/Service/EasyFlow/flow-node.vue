<template>
  <div
    ref="nodeRef"
    :style="nodeContainerStyle"
    :class="nodeContainerClass"
    @click="clickNode"
    @mouseup="changeNodeSite"
    @contextmenu.stop.prevent="openMenu($event)"
  >
    <!-- 最左侧的那条竖线 -->
    <div class="ef-node-left"></div>
    <!-- 节点类型的图标 -->
    <div class="ef-node-left-ico flow-node-drag">
      <i :class="nodeIcoClass"></i>
    </div>
    <!-- 节点名称 -->
    <div class="ef-node-text" show-overflow-tooltip>
      {{ node.name }}
    </div>
    <!-- 节点状态图标 -->
    <div class="ef-node-right-ico">
      <i class="b-iconfont b-icon-check-circle" v-show="node.state === 'success'"></i>
      <i class="b-iconfont b-icon-error" v-show="node.state === 'error'"></i>
      <i class="b-iconfont b-icon-warning-circle" v-show="node.state === 'warning'"></i>
      <i class="b-iconfont b-icon-loading" v-show="node.state === 'running'"></i>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const emit = defineEmits(['clickNode', 'changeNodeSite', 'nodeRightMenu'])

const props = defineProps({
  node: {
    type: Object,
    default: () => ({}),
  },
  activeElement: Object,
})
const nodeRef = ref(null)

// 容器节点位置
const nodeContainerStyle = computed(() => ({
  top: props.node.top,
  left: props.node.left,
}))
// 容器样式class
const nodeContainerClass = computed(() => ({
  'ef-node-container': true,
  'ef-node-active':
    props.activeElement.type === 'node' ? props.activeElement.nodeId === props.node.id : false,
}))

// 图标样式
const nodeIcoClass = computed(() => {
  const nodeIcon = {}
  nodeIcon[`b-iconfont b-icon-${props.node.ico}`] = true
  // 添加该class可以推拽连线出来，viewOnly 可以控制节点是否运行编辑
  nodeIcon['flow-node-drag'] = props.node.viewOnly ? false : true
  return nodeIcon
})

// 节点点击
function clickNode() {
  emit('clickNode', props.node.id)
}
// 鼠标抬起
function changeNodeSite() {
  const { left, top } = props.node
  const style = nodeRef.value.style
  // 避免抖动
  if (left === style.left && top === style.top) {
    return
  }
  const data = {
    nodeId: props.node.id,
    left: style.left,
    top: style.top,
  }
  emit('changeNodeSite', data)
}

function openMenu(ev) {
  emit('nodeRightMenu', props.node.id, ev)
}
</script>

<style lang="stylus">
/*节点的最外层容器*/
.ef-node-container {
  position: absolute;
  display: flex;
  width: 170px;
  height: 32px;
  border: 1px solid #E0E3E7;
  border-radius: 5px;
  background-color: #fff;
}

.ef-node-container:hover {
  /* 设置移动样式*/
  cursor: move;
  background-color: #F0F7FF;
  // box-shadow: #1879FF 0px 0px 12px 0px;
  background-color: #F0F7FF;
  border: 1px dashed #1879FF;
}
/*节点激活样式*/
.ef-node-active {
  background-color: #F0F7FF;
  background-color: #F0F7FF;
  border: 1px solid #1879FF;
}

/*节点左侧的竖线*/
.ef-node-left {
  width: 4px;
  background-color: #1879FF;
  border-radius: 4px 0 0 4px;
}

/*节点左侧的图标*/
.ef-node-left-ico {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
}

.ef-node-left-ico:hover {
  /* 设置拖拽的样式 */
  cursor: crosshair;
}

/*节点显示的文字*/
.ef-node-text {
  color: #565758;
  font-size: 12px;
  line-height: 30px;
  width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
}

/*节点右侧的图标*/
.ef-node-right-ico {
  line-height: 30px;
  position: absolute;
  right: 4px;
  color: #84CF65;
  cursor: default;
  /*节点的几种状态样式*/
  .b-icon-check-circle{
    line-height: 32px;
    position: absolute;
    right: 5px;
    color: #84CF65;
    cursor: default;
  }

  .b-icon-error {
    line-height: 32px;
    position: absolute;
    right: 5px;
    color: #F56C6C;
    cursor: default;
  }

  .b-icon-warning-circle {
    line-height: 32px;
    position: absolute;
    right: 5px;
    color: #E6A23C;
    cursor: default;
  }
  .b-icon-loading {
    line-height: 32px;
    position: absolute;
    right: 5px;
    color: #1089ff;
    cursor: default;
  }
}
</style>
