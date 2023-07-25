<template>
  <div class="dv-transform" :class="transformClass" :style="transformStyle">
    <refer-line v-if="isSelected" :attr="data.attr" :scale="scale" />
    <div
      :class="['dv-scale', { hovered: isHovered }]"
      :style="hideStyle"
      @mouseenter="onEnter"
      @mouseleave="onLeave"
      @mousedown="onMove"
    >
      <div class="transform-handler" :class="handlerClass">
        <div class="dv-com">
          <slot>
            <div class="id-box">{{ data.name }}</div>
          </slot>
          <div class="dv-event-disable" :style="disableEventStyle" @contextmenu="showMenu"></div>
        </div>
        <template v-for="(v, k) in points" :key="k">
          <i :class="`${v.name}-handler`" data-html2canvas-ignore>
            <span
              class="control-point"
              :style="v.style"
              @mousedown.prevent.stop="onZoom($event, k)"
            ></span>
          </i>
        </template>
        <div class="transform-bg"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import ReferLine from './refer-line.vue'
import { getCursors, handleMove, handleZoom } from './util'
import { canvas, showMenu } from '../../store/useSchema'
import { selectedCom, hoveredComId, hoverCom, selectCom } from '../../store/useCom'
import { ctrlDown } from '../../store/useShortcuts'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

// 是否悬停当前
const isHovered = computed(() => hoveredComId.value === props.data.id)
// 是否多选选中当前当前
const isSelected = computed(() => selectedCom.value && selectedCom.value.id === props.data.id)

const transformClass = computed(() => ({ selected: isSelected.value }))

const transformStyle = computed(() => ({
  top: 0,
  left: 0,
  width: `${props.data.attr.w}px`,
  height: `${props.data.attr.h}px`,
  transform: `translate(${props.data.attr.x}px, ${props.data.attr.y}px)`,
}))

const handlerClass = computed(() => ({ 'is-hide': !isSelected.value || props.data.locked }))

const disableEventStyle = computed(() => ({
  width: `${props.data.attr.w}px`,
  height: `${props.data.attr.h}px`,
}))
const hideStyle = computed(() => ({
  display: props.data.hided ? 'none' : 'block',
}))

const cursor = computed(() => getCursors())

const scale = computed(() => canvas.value.scale)

const points = computed(() => {
  const transform = `scale(${1 / scale.value}, ${1 / scale.value})`
  return {
    t: {
      name: 'top',
      style: { cursor: cursor.value.t, transform },
    },
    rt: {
      name: 'top-right',
      style: { cursor: cursor.value.rt, transform },
    },
    r: {
      name: 'right',
      style: { cursor: cursor.value.r, transform },
    },
    rb: {
      name: 'bottom-right',
      style: { cursor: cursor.value.rb, transform },
    },
    b: {
      name: 'bottom',
      style: { cursor: cursor.value.b, transform },
    },
    lb: {
      name: 'bottom-left',
      style: { cursor: cursor.value.lb, transform },
    },
    l: {
      name: 'left',
      style: { cursor: cursor.value.l, transform },
    },
    lt: {
      name: 'top-left',
      style: { cursor: cursor.value.lt, transform },
    },
  }
})

const onEnter = () => hoverCom(props.data.id)

const onLeave = () => hoverCom('')

// 单击选中组件
const onMove = e => {
  if (ctrlDown.value) return
  e.stopPropagation()
  e.preventDefault()
  selectCom(props.data)
  if (props.data.locked) return
  handleMove(e, props.data, scale.value, 1)
}

const onZoom = (e, dir) => {
  selectCom(props.data)
  handleZoom(e, dir, props.data, scale.value, 1)
}
</script>

<style lang="stylus" scoped>
$gui-primary-color = #1089ff;
$background-color = rgba(14, 123, 230, 0.3);
$background-hover-color = rgba(14, 123, 230, 0.38);

// dv-transform
.dv-transform {
  position: absolute;
  will-change: transform;

  &.selected {
    z-index: 1;

    .dv-com {
      background: $background-hover-color;
    }

    .dv-scale::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: -1;
      border: 1px dashed $gui-primary-color;
    }
  }
  .b-icon-lock {
    font-size: 18px;
    position: absolute;
    top: 4px;
    right: 4px;
    z-index: 2;
  }
}

// dv-scale
.dv-scale {
  position: absolute;
  width: 100%;
  height: 100%;
  transform-origin: 0 0;

  .dv-com {
    width: 100%;
    height: 100%;
    outline: 0;
    box-sizing: border-box;
    transform-origin: 50% 50%;
    transform: scaleX(1) scaleY(1);
    overflow: hidden;
    background: $background-color;
    .dv-event-disable {
      position: absolute;
      top: 0;
    }
  }

  &.hovered {
    .dv-com {
      background: $background-hover-color;
    }

    .bottom-handler, .left-handler, .right-handler, .top-handler {
      display: flex !important;
    }
  }
}

.transform-handler {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: move;
  box-sizing: border-box;
  cursor: url('@/components/Common/SchemaEditor/assets/cursor-move.png') 4 4, auto;
  // cursor: move;

  &.is-hide {
    .transform-bg, i[class$='-handler'] {
      display: none;
    }
  }

  .transform-bg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    cursor: move;
    background: rgba(0, 231, 255, 0.11);
  }

  .top-handler {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: -5px;
    width: 100%;
    height: 11px;

    &::after {
      content: '';
      height: 1px;
      background: $gui-primary-color;
      width: 100%;
      position: absolute;
      z-index: 1;
    }
  }

  .bottom-handler {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: -5px;
    width: 100%;
    height: 11px;

    &::after {
      content: '';
      height: 1px;
      background: $gui-primary-color;
      width: 100%;
      position: absolute;
      z-index: 1;
    }
  }

  .left-handler {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: -5px;
    width: 11px;
    height: 100%;

    &::after {
      content: '';
      width: 1px;
      background: $gui-primary-color;
      height: 100%;
      position: absolute;
      z-index: 1;
    }
  }

  .right-handler {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    right: -5px;
    width: 11px;
    height: 100%;

    &::after {
      content: '';
      width: 1px;
      background: $gui-primary-color;
      height: 100%;
      position: absolute;
      z-index: 1;
    }
  }

  .top-left-handler {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: -5px;
    top: -5px;
    height: 11px;
    width: 11px;
  }

  .top-right-handler {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: -5px;
    top: -5px;
    height: 11px;
    width: 11px;
  }

  .bottom-left-handler {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: -5px;
    left: -5px;
    height: 11px;
    width: 11px;
  }

  .bottom-right-handler {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: -5px;
    right: -5px;
    height: 11px;
    width: 11px;
  }

  .control-point {
    z-index: 2;
    display: flex;
    width: 20px;
    height: 20px;
    justify-content: center;
    align-items: center;

    &::after {
      width: 6px;
      height: 6px;
      background: #fff;
      border: 1px solid $gui-primary-color;
      border-radius: 100%;
      content: '';
    }
  }
}
</style>
