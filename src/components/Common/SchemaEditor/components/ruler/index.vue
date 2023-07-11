<template>
  <div class="canvas-ruler-wp">
    <div
      ref="hRulerWpRef"
      class="ruler-wrapper h-container"
      :style="`transform: translateX(-${hScroll}px);`"
    ></div>
    <div
      ref="vRulerWpRef"
      class="ruler-wrapper v-container"
      :style="`transform: rotate(90deg) translateX(-${vScroll}px);`"
    ></div>
    <div class="ruler-corner"></div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watchEffect } from 'vue'

import { RulerBuilder } from './builder'
import { canvas } from '../../useSchema'

let hRuler = null
let vRuler = null

const hRulerWpRef = ref(null)
const vRulerWpRef = ref(null)
const hScroll = ref(0)
const vScroll = ref(0)
const cw = document.documentElement.clientWidth

watchEffect(() => {
  if (hRulerWpRef.value && vRulerWpRef.value) {
    const hWidth = Math.max(canvas.value.width, cw)
    if (hRuler) {
      hRuler.setSize(hWidth, 18, canvas.value.scale)
    } else {
      hRuler = new RulerBuilder(hRulerWpRef.value, {
        direction: 'TB',
        width: hWidth,
        scale: canvas.value.scale,
      })
    }

    if (vRuler) {
      vRuler.setSize(canvas.value.height, 18, canvas.value.scale)
    } else {
      vRuler = new RulerBuilder(vRulerWpRef.value, {
        direction: 'LR',
        width: canvas.value.height,
        scale: canvas.value.scale,
      })
    }
  }
})

const onScroll = e => {
  const dom = e.target
  hScroll.value = dom.scrollLeft
  vScroll.value = dom.scrollTop
}
onMounted(() => {
  const canvasWp = document.getElementById('canvas-wp')
  canvasWp?.addEventListener('scroll', onScroll)
})

onUnmounted(() => {
  const canvasWp = document.getElementById('canvas-wp')
  canvasWp?.removeEventListener('scroll', onScroll)
})
</script>

<style scoped lang="stylus">
.canvas-ruler-wp {
  position: absolute;
  z-index: 1;
  .ruler-wrapper {
    position: absolute;
    height: 18px;
  }
  .h-container {
    left: 18px;
    transform: translateX(0);
  }
  .v-container {
    transform: rotate(90deg) translateX(0);
    transform-origin: 0 100% 0;
  }
  .ruler-corner {
    position: absolute;
    z-index: 10;
    display: flex;
    width: 18px;
    height: 18px;
    font-size: 16px;
    cursor: pointer;
    background: #d9d9d9;
    align-items: center;
    justify-content: center;
    &:hover {
      color: #fff;
    }
  }
}
</style>
