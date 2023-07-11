<template>
  <div class="canvas-main">
    <Ruler />
    <div id="canvas-wp" ref="canvasWpRef" class="canvas-panel-wrap">
      <div class="screen-shot" :style="screenShotStyle">
        <div id="canvas-components" class="canvas-panel" :style="canvasPanelStyle">
          <div class="canvas-inner"></div>
        </div>
      </div>
    </div>
    <FooterBox />
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount, onMounted, computed, nextTick } from 'vue'
import Ruler from './ruler/index.vue'
import FooterBox from './FooterBox.vue'
import { on, off, debounce } from '@/utils/util'

import { canvas, autoCanvasScale, bgInfo } from '../useSchema'

defineProps({
  bgUrl: {
    type: String,
  },
})

const screenShotStyle = computed(() => ({
  width: `${canvas.value.width - 5}px`,
  height: `${canvas.value.height}px`,
}))

const canvasPanelStyle = computed(() => ({
  position: 'absolute',
  width: `${canvas.value.pageWidth}px`,
  height: `${canvas.value.pageHeight}px`,
  transform: `scale(${canvas.value.scale}) translate(0px, 0px)`,
  backgroundImage: `url(${bgInfo.value.url})`,
  backgroundColor: '#fff',
}))

const autoScale = debounce(autoCanvasScale, 20)

onMounted(() => {
  on(window, 'resize', autoScale)
  nextTick(() => {
    autoCanvasScale()
  })
})

onBeforeUnmount(() => {
  off(window, 'resize', autoScale)
})
</script>

<style lang="stylus" scoped>
.canvas-main {
  position: relative;
  width: calc(100% - 300px);
  border: 1px solid #d9d9d9;
  overflow: hidden;
  .canvas-panel-wrap {
    position: relative;
    width: 100%;
    height: calc(100% - 32px);
    overflow: auto;
    background: radial-gradient(circle, #dddddd 1px, transparent 1px);
    background-size: 10px 10px;
    .canvas-panel {
      top: 60px;
      left: 60px;
      background-position: center, right bottom;
      background-repeat: no-repeat, no-repeat;
      background-size: cover, contain;
      box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.3);
      transition: 0.2s all ease-in;
      transform-origin: 0 0;
    }
    .canvas-inner {
      position: relative;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
