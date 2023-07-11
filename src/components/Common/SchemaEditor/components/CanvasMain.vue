<template>
  <div class="canvas-main">
    <Ruler />
    <div id="canvas-wp" ref="canvasWpRef" class="canvas-panel-wrap">
      <div class="screen-shot" :style="screenShotStyle">
        <div id="canvas-components" class="canvas-panel" :style="canvasPanelStyle">容器画布</div>
      </div>
    </div>
    <FooterBox />
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount, onMounted, computed } from 'vue'
import Ruler from './ruler/index.vue'
import FooterBox from './FooterBox.vue'
import { on, off, debounce } from '@/utils/util'

import { canvas, autoCanvasScale } from '../useSchema'

const screenShotStyle = computed(() => ({
  width: `${canvas.value.width}px`,
  height: `${canvas.value.height}px`,
}))

const canvasPanelStyle = computed(() => ({
  position: 'absolute',
  width: `${2000}px`,
  height: `${2000}px`,
  transform: `scale(${canvas.value.scale}) translate(0px, 0px)`,
  backgroundColor: '#fff',
}))

const autoScale = debounce(autoCanvasScale, 50)

onMounted(() => {
  on(window, 'resize', autoScale)
  autoScale()
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
      transition: 0.2s all ease-in-out;
      transform-origin: 0 0;
    }
  }
}
</style>
