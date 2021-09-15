<template>
  <div class="datasource-content-list" id="table-drag">
    <div
      v-for="item in data"
      :key="item.id"
      class="datasource-content-item"
      :class="{'has-used':allNodeTitle.includes(item.title)}"
      draggable="true"
      @dragstart="onDrag($event,item)"
      @dragend="onDragEnd"
    >
      <b-icon name="file-text" size="16"></b-icon>
      <span class="title">{{ item.title }}</span>
      <b-icon name="info-circle"></b-icon>
    </div>
  </div>
</template>

<script>
import { Message } from 'bin-ui-next'

export default {
  name: 'node-list',
  props: {
    data: {
      type: Array,
      default: () => ([]),
    },
    allNodeTitle: {
      type: Array,
      default: () => ([]),
    },
    rootNode: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['start', 'end'],
  setup(props, { emit }) {
    // 表格拖拽开始
    function onDrag(e, item) {
      if (props.rootNode.title === item.title) {
        Message.warning('当前数据表已经存在，请不要重复关联！')
        return
      }
      e.dataTransfer.setData('id', item.id)
      emit('start')
    }

    function onDragEnd() {
      emit('end')
    }

    return {
      onDrag,
      onDragEnd,
    }
  },
}
</script>

<style scoped lang="stylus">
@import "../../../assets/stylus/base/var.styl"
@import "../../../assets/stylus/base/mixins.styl"
.datasource-content-item {
  position: relative;
  display: flex;
  align-items: center;
  font-size: 12px
  padding: 5px;
  cursor: pointer;
  overflow: hidden;
  padding-left: 8px;
  color: $color-text-primary;
  .b-icon-file-text {
    display: inline-block;
    height: 18px;
    margin-right: 4px;
  }
  .title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 1.5;
    flex: 1;
  }
  .b-icon-info-circle {
    position: absolute;
    right: 5px;
    top: 6px;
    display: none;
    &:hover {
      color: getColor();
    }
  }
  &.has-used {
    .b-icon-file-text {
      color: getColor();
    }
  }
  &:hover {
    background: #ededed;
    .b-icon-info-circle {
      display: block;
    }
  }
}
</style>
