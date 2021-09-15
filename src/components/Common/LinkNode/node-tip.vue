<template>
  <div class="node-tip" :class="{'is-empty':data.isEmpty}" @click="linkClick">
    <div v-if="!data.isEmpty" class="node-icon-wrapper">
      <i class="svg-icon-wrapper icon-bi-engine-zuowailianjie1">
        <svg class="svg-icon" viewBox="0 0 1536 1024" aria-hidden="true" width="1em" height="1em" fill="currentColor">
          <path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#2153D4" fill-opacity=".5"></path>
          <path
            d="M512 0c282.7776 0 512 229.2224 512 512s-229.2224 512-512 512S0 794.7776 0 512 229.2224 0 512 0z m0 51.2a460.8 460.8 0 1 0 0 921.6 460.8 460.8 0 0 0 0-921.6z"
            fill="#2153D4"></path>
          <path
            d="M1024 0c282.7776 0 512 229.2224 512 512s-229.2224 512-512 512-512-229.2224-512-512S741.2224 0 1024 0z m0 51.2a460.8 460.8 0 1 0 0 921.6 460.8 460.8 0 0 0 0-921.6z"
            fill="#2153D4"></path>
          <path
            d="M768.0512 68.5056A511.7952 511.7952 0 0 1 1024 512a511.7952 511.7952 0 0 1-255.9488 443.4944A511.6416 511.6416 0 0 1 512 512a511.744 511.744 0 0 1 249.7536-439.808z"
            fill="#2153D4" fill-opacity=".5"></path>
        </svg>
      </i>
    </div>
    <div class="node-line horizontal " :style="lineStyle[0]"></div>
    <div class="node-line vertical " :style="lineStyle[1]"></div>
  </div>
</template>

<script>
// 节点高度
import { getTipLineStyle } from '@/components/Common/LinkNode/node-util'
import { computed, inject } from 'vue'

export default {
  name: 'node-tip',
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const LinkNodeInstance = inject('LinkNodeInstance', {})
    const node = computed(() => [
      LinkNodeInstance.states.flatState,
      LinkNodeInstance.states.flatState.find(v => v.nodeIndex === props.data.nodeIndex),
    ])
    const isKnee = computed(() => props.data.isKnee)
    const lineStyle = computed(() => {
      const [flatState, stateNode] = node.value
      const { row, isKnee } = stateNode.node
      const parent = flatState[stateNode.parent]
      const parentRow = parent ? parent.node.row : 0
      return getTipLineStyle(row, isKnee, parentRow)
    })

    function linkClick() {
      if (props.data.isEmpty) return
      LinkNodeInstance.handleLinkClick(props.data.nodeIndex)
    }

    return {
      node,
      isKnee,
      lineStyle,
      linkClick,
    }
  },
}
</script>

<style scoped lang="stylus">
@import "../../../assets/stylus/base/mixins.styl"
.node-tip {
  position: absolute;
  align-items: center;
  display: flex;
  justify-content: center;
  cursor: pointer;
  .node-line {
    position: absolute;
    z-index: 2;
    background: #c1c1c1;
  }
  &:hover .node-line {
    background: getColor();
  }
  .node-line.horizontal {
    right: 0;
    height: 1px;
  }
  .node-line.vertical {
    width: 1px;
    left: 18px;
  }
  .node-icon-wrapper {
    position: absolute;
    z-index: 3;
    cursor: pointer;
    .svg-icon-wrapper {
      display: block;
      height: 16px;
      background-color: #f2f2f2;
      svg {
        width: 24px;
        height: 16px;
      }
    }
  }
  &.is-empty {
    .node-line {
      &.horizontal {
        background: transparent;
        border-top: 1px dashed getColor();
      }
      &.vertical {
        background: transparent;
        border-left: 1px dashed getColor();
      }
    }
  }
}
</style>
