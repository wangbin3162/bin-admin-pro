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
    <div class="ef-node-left-ico" :class="{ ' flow-node-drag': !node.viewOnly }">
      <i :class="nodeIcoClass" v-if="node.ico"></i>
      <template v-else>
        <img v-if="node.type === 'common'" src="../assets/node.svg" class="node-ico" />
        <img v-if="node.type === 'switch'" src="../assets/switch.svg" class="switch-ico" />
      </template>
    </div>
    <!-- 节点名称 -->
    <div class="ef-node-text" :title="node.name">
      {{ node.name }}
    </div>
    <!-- 节点状态图标 -->
    <div class="ef-node-right-ico" v-if="showState">
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
  showState: {
    type: Boolean,
    default: true,
  },
  activeElement: Object,
})
const nodeRef = ref(null)

// 容器节点位置
const nodeContainerStyle = computed(() => ({
  top: props.node.top,
  left: props.node.left,
}))
const active = computed(
  () => props.activeElement.type === 'node' && props.activeElement.nodeId === props.node.id,
)
// 容器样式class
const nodeContainerClass = computed(() => [
  'ef-node-container',
  `el-node-${props.node.type}`,
  {
    'ef-node-active': active.value,
  },
  { 'view-only': props.node.viewOnly },
])

// 图标样式
const nodeIcoClass = computed(() => {
  const nodeIcon = {}
  nodeIcon[`b-iconfont b-icon-${props.node.ico}`] = true
  // 添加该class可以推拽连线出来，viewOnly 可以控制节点是否运行编辑
  // nodeIcon['flow-node-drag'] = props.node.viewOnly ? false : true
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

<style scoped>
/*节点的最外层容器*/
.ef-node-container {
  position: absolute;
  display: flex;
  width: 170px;
  height: 32px;
  border: 1px solid #e0e3e7;
  border-radius: 5px;
  background-color: #fff;
  .node-inner {
    display: flex;
  }
  &:hover {
    cursor: pointer;
    border: 1px dashed #1879ff;
  }
  &:not(.view-only) {
    &:hover {
      /* 设置移动样式*/
      cursor: move;
      background-color: #f0f7ff;
      border: 1px dashed #1879ff;
    }
    .ef-node-left-ico:hover {
      /* 设置拖拽的样式 */
      cursor: crosshair;
    }
  }
  &.ef-drop-hover {
    border: 1px dashed #1879ff;
  }
  &.el-node-switch {
    .ef-node-left {
      background-color: #fa8c16;
    }
    &.ef-node-active {
      background-color: #fff9f3;
      background-color: #fff9f3;
      border: 1px solid #fa8c16;
    }
    &:not(.view-only) {
      &:hover {
        background-color: #fff9f3;
        border: 1px dashed #fa8c16;
      }
    }

    &.ef-drop-hover {
      border: 1px dashed #fa8c16;
    }
  }
}

/*节点激活样式*/
.ef-node-active {
  background-color: #f0f7ff;
  background-color: #f0f7ff;
  border: 1px solid #1879ff;
}

/*节点左侧的竖线*/
.ef-node-left {
  width: 4px;
  background-color: #1089ff;
  border-radius: 4px 0 0 4px;
}

/*节点左侧的图标*/
.ef-node-left-ico {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-right: 1px solid #e0e3e7;
  .node-ico {
    pointer-events: none;
    width: 24px;
    height: 24px;
  }
  .switch-ico {
    pointer-events: none;
    width: 20px;
    height: 20px;
  }
  > i {
    pointer-events: none;
    font-size: 18px;
  }
}

/*节点显示的文字*/
.ef-node-text {
  color: #565758;
  font-size: 12px;
  line-height: 30px;
  flex: 1;
  padding: 0 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/*节点右侧的图标*/
.ef-node-right-ico {
  line-height: 30px;
  position: absolute;
  right: 4px;
  color: #84cf65;
  cursor: default;
  /*节点的几种状态样式*/
  .b-icon-check-circle {
    line-height: 32px;
    position: absolute;
    right: 5px;
    color: #84cf65;
    cursor: default;
  }

  .b-icon-error {
    line-height: 32px;
    position: absolute;
    right: 5px;
    color: #f56c6c;
    cursor: default;
  }

  .b-icon-warning-circle {
    line-height: 32px;
    position: absolute;
    right: 5px;
    color: #e6a23c;
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
