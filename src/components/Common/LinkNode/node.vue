<template>
  <div
    class="link-node-info"
    :class="{'is-empty':data.isEmpty}"
    @click="nodeClick"
    @drop="onDrop($event)"
    @dragover="e=>e.preventDefault()"
    @dragenter="onDragEnter($event)"
    @dragleave="onDragLeave($event)"
  >
    <div class="link-node-title" style="height: 28px; padding: 5px 8px;">
      <i v-if="!data.isEmpty" class="link-node-icon" :class="`b-iconfont b-icon-${data.icon||defaultIcon}`"></i>
      <div class="link-node-name">{{ data.title }}</div>
      <div class="link-node-handle">
        <b-dropdown placement="bottom-end" @command="activeCommand" v-if="!data.isEmpty" append-to-body>
          <i class="b-iconfont b-icon-ellipsis" @click.stop.prevent></i>
          <template #dropdown>
            <b-dropdown-menu style="width: 160px;">
              <b-dropdown-item name="selected">
                <b-icon name="code" size="12"></b-icon>
                <span style="font-size: 12px;">字段选择</span>
              </b-dropdown-item>
              <b-dropdown-item name="remove" style="color: #ed4014;" v-if="data.isLeaf">
                <b-icon name="delete" size="12"></b-icon>
                <span style="font-size: 12px;">删除</span>
              </b-dropdown-item>
            </b-dropdown-menu>
          </template>
        </b-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, inject } from 'vue'

export default {
  name: 'link-node',
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
    defaultIcon: {
      type: String,
      default: 'table',
    },
  },
  setup(props) {
    const LinkNodeInstance = inject('LinkNodeInstance', {})

    const node = computed(() => [
      LinkNodeInstance.states.flatState,
      LinkNodeInstance.states.flatState.find(v => v.nodeIndex === props.data.nodeIndex),
    ])

    // 操作事件
    function activeCommand(name) {
      if (name === 'selected') {
        nodeClick()
      } else if (name === 'remove') {
        nodeRemove()
      }
    }

    function nodeClick() {
      if (props.data.isEmpty) return
      LinkNodeInstance.handleNodeClick(props.data.nodeIndex)
    }

    function nodeRemove() {
      if (props.data.isEmpty) return
      LinkNodeInstance.handleNodeRemove(props.data.nodeIndex)
    }

    let lastElement = null

    // 字段拖动进入
    function onDragEnter(e) {
      lastElement = e.target
      LinkNodeInstance.onNodeDragenter(props.data.nodeIndex)
    }

    function onDragLeave(e) {
      if (lastElement === e.target) {
        LinkNodeInstance.onNodeDragleave(props.data.nodeIndex)
      }
    }

    // 字段填充
    function onDrop(e) {
      LinkNodeInstance.onNodeDrop(props.data.nodeIndex, e.dataTransfer.getData('id'))
    }

    return {
      node,
      activeCommand,
      nodeClick,
      onDragEnter,
      onDragLeave,
      onDrop,
    }
  },
}
</script>

<style scoped lang="stylus">
@import "../../../assets/stylus/base/mixins.styl"
.link-node {
  &-info {
    position: absolute;
    background: #fff;
    color: #000;
    cursor: pointer;
    padding: 1px 1px 1px 0;
    border-left: 2px solid getColor();
    width: 180px;
    height: 30px;
    .link-node-name {
      flex: 1;
      padding: 0 4px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      font-size: 12px;
      line-height: 1.5;
    }
    &:hover {
      padding: 0;
      border: 1px solid getColor();
      border-left: 2px solid getColor();
    }
    &.is-empty {
      padding: 0;
      border: 1px dashed getColor();
      border-left: 2px solid getColor();
    }
  }
  &-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-grow: 1;
    overflow: hidden;
  }
  &-icon {
    flex-shrink: 0;
    width: 16px;
    font-size: 16px;
    color: getColor();
  }
  &-handle {
    flex-shrink: 0;
    display: flex;
    width: 18px;
    cursor: pointer;
    .b-iconfont {
      font-size: 18px;
      transform: rotate(90deg);
      outline: none;
    }
  }
}
</style>
