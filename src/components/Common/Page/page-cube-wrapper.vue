<template>
  <div class="page-cube-wrapper">
    <div class="page-cube">
      <div v-if="$slots.left" class="page-cube-left" :style="{width: leftWidth}">
        <div
          class="toggle"
          :style="{left: leftWidth, opacity: leftExpand?null:1}"
          :title="leftExpand?leftCollapseText:leftExpandText"
          @click="toggleLeft"
        >
          <b-icon :name="leftExpand?'caret-left':'caret-right'"></b-icon>
        </div>
        <div class="cube-left-content" v-show="leftExpand">
          <slot name="left"></slot>
        </div>
      </div>
      <div class="page-cube-content" :style="{width: rightWidth}">
        <div v-if="$slots.default" :style="{height:defaultContentHeight}">
          <slot></slot>
        </div>
        <div class="draggable-content" v-if="$slots.draggable" :style="{height:dragHeight}">
          <div class="toggle">
            <i class="b-iconfont b-icon-up" title="展开" @click="changeDragStatus('maximum')" />
            <i class="b-iconfont b-icon-down" title="收起" @click="changeDragStatus('minimum')" />
            <i class="b-iconfont b-icon-pic-center" title="默认高度" @click="changeDragStatus('default')" />
          </div>
          <slot name="draggable"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'

export default {
  name: 'page-cube-wrapper',
  props: {
    leftDefaultWidth: {
      type: String,
      default: '240px',
    },
    leftExpandText: {
      type: String,
      default: '展开',
    },
    leftCollapseText: {
      type: String,
      default: '收起',
    },
    defaultHeight: {
      type: String,
      default: '240px',
    },
    defaultMinHeight: {
      type: String,
      default: '12px',
    },
    draggableMinHeight: {
      type: String,
      default: '48px',
    },
  },
  setup(props, { slots }) {
    const leftExpand = ref(true)
    const draggableStatus = ref('default')
    const leftWidth = computed(() => leftExpand.value ? props.leftDefaultWidth : '12px')
    const rightWidth = computed(() => {
      if (slots.left) {
        return leftExpand.value ? `calc(100% - ${props.leftDefaultWidth})` : '100%'
      } else {
        return '100%'
      }
    })
    const dragHeight = computed(() => {
      const status = draggableStatus.value
      return {
        default: `calc(100% - ${props.defaultHeight})`,
        minimum: props.draggableMinHeight,
        maximum: `calc(100% - ${props.defaultMinHeight})`,
      }[status]
    })
    const defaultContentHeight = computed(() => {
      if (!slots.draggable) {
        return '100%'
      }
      const status = draggableStatus.value
      return {
        default: props.defaultHeight,
        minimum: `calc(100% - ${props.draggableMinHeight})`,
        maximum: props.defaultMinHeight,
      }[status]
    })

    const toggleLeft = () => {
      leftExpand.value = !leftExpand.value
    }

    const changeDragStatus = (status) => {
      if (draggableStatus.value !== status) {
        draggableStatus.value = status
      }
    }

    return {
      leftExpand,
      leftWidth,
      rightWidth,
      dragHeight,
      defaultContentHeight,
      toggleLeft,
      changeDragStatus,
    }
  },
}
</script>

<style scoped lang="stylus">
@import "../../../assets/stylus/base/mixins.styl"
.page-cube-wrapper {
  .page-cube {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    &-left {
      width: 240px;
      height: 100%;
      border-right: 1px solid #eee;
      transition: width .15s ease;
      .cube-left-content {
        width: 100%;
        height: 100%;
      }
      .toggle {
        position: absolute;
        z-index: 100;
        top: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 16px;
        margin-left: -8px;
        border-radius: 10px;
        height: 80px;
        cursor: pointer;
        background-color: #fff;
        border: 1px solid #e8e8e8;
        transition: .15s ease;
        opacity: 0;
        &:hover {
          background-color: #fafafa;
          box-shadow: 0 2px 6px rgba(0, 0, 0, .1);
          i {
            color: getColor();
          }
        }
      }
      &:hover {
        .toggle {
          opacity: 1;
        }
      }
    }
    &-content {
      width: calc(100% - 240px);
      height: 100%;
      transition: width .15s ease;
      .draggable-content {
        position: relative;
        border-top: 1px solid #eee;
        .toggle {
          position: absolute;
          z-index: 100;
          top: 0;
          right: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 140px;
          height: 24px;
          margin-top: -12px;
          border-radius: 10px;
          background-color: #fff;
          border: 1px solid #e8e8e8;
          transition: .15s ease;
          opacity: 0;
          &:hover {
            background-color: #fafafa;
            box-shadow: 0 2px 6px rgba(0, 0, 0, .08);
          }
          > i {
            cursor: pointer;
            padding: 2px;
            margin: 0 8px;
            font-size: 16px;
            &:hover {
              color: getColor();
            }
          }
        }
        &:hover {
          .toggle {
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>
