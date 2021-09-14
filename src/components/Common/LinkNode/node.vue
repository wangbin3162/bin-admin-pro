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
      <div class="link-node-handle" v-if="$slots.action && !data.isEmpty">
        <slot name="action">
        </slot>
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
      LinkNodeInstance.states.flatState.find(v => v.nodeKey === props.data.nodeKey),
    ])

    function nodeClick() {
      if (props.data.isEmpty) return
      LinkNodeInstance.handleNodeClick(props.data.nodeKey)
    }

    let lastElement = null

    // 字段拖动进入
    function onDragEnter(e) {
      lastElement = e.target
      LinkNodeInstance.onNodeDragenter(props.data.nodeKey)
    }

    function onDragLeave(e) {
      if (lastElement === e.target) {
        LinkNodeInstance.onNodeDragleave(props.data.nodeKey)
      }
    }

    // 字段填充
    function onDrop(e) {
      LinkNodeInstance.onNodeDrop(props.data.nodeKey, e.dataTransfer.getData('id'))
    }

    return {
      node,
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
    width: 16px;
    cursor: pointer;
    :deep(.b-iconfont) {
      outline: none;
      font-size: 16px;
    }
  }
}
</style>
