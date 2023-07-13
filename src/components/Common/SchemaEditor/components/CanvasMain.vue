<template>
  <div class="canvas-main">
    <Ruler />
    <div
      id="canvas-wp"
      ref="canvasWpRef"
      class="canvas-panel-wrap"
      @mousedown.stop="canvasMouseDown"
    >
      <div class="screen-shot" :style="screenShotStyle">
        <div
          id="canvas-components"
          class="canvas-panel"
          :style="canvasPanelStyle"
          @mousedown="handleMouseDown"
        >
          <DvTransform v-for="comp in comps" :key="comp.id" :data="comp" />

          <SelectArea v-bind="areaData" />
        </div>
      </div>
    </div>
    <FooterBox />
  </div>
</template>

<script setup>
import { ref, reactive, onBeforeUnmount, onMounted, computed, nextTick } from 'vue'
import Ruler from './ruler/index.vue'
import FooterBox from './FooterBox.vue'
import SelectArea from './select-area/index.vue'
import DvTransform from './dv-transform/index.vue'
import { on, off, debounce } from '@/utils/util'

import { canvas, autoCanvasScale, bgInfo } from '../store/useSchema'
import { spaceDown } from '../store/useShortcuts'
import { selectedCom, selectCom, areaData, addNewCom, comps } from '../store/useCom'

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

const canvasWpRef = ref(null)
const dragStatus = reactive({
  drag: false,
  startX: 0,
  startY: 0,
})

// canvas鼠标按下事件
function canvasMouseDown(ev) {
  // 如果空格按下，则可以拖动画布位置
  if (spaceDown.value) {
    const startX = ev.clientX
    const startY = ev.clientY
    const scale = canvas.value.scale
    const { scrollLeft, scrollTop, clientWidth, scrollWidth, clientHeight, scrollHeight } =
      canvasWpRef.value
    // 是否出现滚动条
    const couldMove = clientWidth < scrollWidth || clientHeight < scrollHeight
    const attr = { left: scrollLeft, top: scrollTop }

    const move = e => {
      if (couldMove) {
        const curX = e.clientX
        const curY = e.clientY
        const disX = Math.round((curX - startX) / scale)
        const disY = Math.round((curY - startY) / scale)

        canvasWpRef.value.scrollLeft = attr.left - disX
        canvasWpRef.value.scrollTop = attr.top - disY
      }
    }

    const up = () => {
      dragStatus.drag = false
      off(document, 'mousemove', move)
      off(document, 'mouseup', up)
    }

    on(document, 'mousemove', move)
    on(document, 'mouseup', up)
  } else {
    selectCom()
  }
}

function hideArea() {
  areaData.value.showArea = false
  areaData.value.width = 0
  areaData.value.height = 0
}

let editorX = 0
let editorY = 0

// 最小值范围，宽高小雨这个值的则忽略这个元素
let limitSize = 20

// 框选区域
function handleMouseDown(e) {
  // 如果没有选中组件 在画布上点击时需要调用 e.preventDefault() 防止触发 drop 事件
  if (!selectedCom.value) {
    e.preventDefault()
  }

  // 如果空格按下移动或者是按下时触发了select-area
  if (spaceDown.value || e.target.className === 'select-area') return

  hideArea()

  const rectInfo = document.querySelector('#canvas-components').getBoundingClientRect()
  editorX = rectInfo.x
  editorY = rectInfo.y
  const startX = e.clientX
  const startY = e.clientY
  areaData.value.showArea = true

  const _scale = canvas.value.scale

  areaData.value.x = (startX - editorX) / _scale
  areaData.value.y = (startY - editorY) / _scale

  const move = e => {
    areaData.value.width = Math.abs((e.clientX - startX) / _scale)
    areaData.value.height = Math.abs((e.clientY - startY) / _scale)
    if (e.clientX < startX) {
      areaData.value.x = (e.clientX - editorX) / _scale
    }
    if (e.clientY < startY) {
      areaData.value.y = (e.clientY - editorY) / _scale
    }
  }

  const up = e => {
    off(document, 'mousemove', move)
    off(document, 'mouseup', up)
    if (
      e.clientX === startX ||
      e.clientY === startY ||
      areaData.value.width < limitSize ||
      areaData.value.height < limitSize
    ) {
      hideArea()
      return
    }
    addNewCom() // 创建组件
    hideArea()
  }
  on(document, 'mousemove', move)
  on(document, 'mouseup', up)
}

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
