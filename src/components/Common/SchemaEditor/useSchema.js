// 编辑器配置共享数据，需要注意状态的清空和初始化。
import { ref, computed } from 'vue'

const canvasDefaultSize = 2000

const schemaState = ref({
  canvas: {
    width: 2000,
    height: 2000,
    scale: 1,
  },
  shortcuts: {
    altKey: false,
    ctrlKey: false,
    shiftKey: false,
    spaceKey: false,
  },
})

const canvas = computed(() => schemaState.value.canvas)

// 设置缩放比例
function setCanvasScale(scaleSetValue) {
  let width = document.querySelector('#canvas-wp').clientWidth
  let height = document.querySelector('#canvas-wp').clientHeight
  const minScale = (width - 120) / canvasDefaultSize

  // 限制缩放比例为
  const scale = Math.min(Math.max(scaleSetValue, minScale * 100), 100) / 100
  // 方便计算滚动条 和 标尺
  const deltaW = canvasDefaultSize * scale
  const deltaH = canvasDefaultSize * scale
  if (width < deltaW) {
    width = deltaW + 120
  }
  if (height < deltaH) {
    height = deltaH + 120
  }
  schemaState.value.canvas = { scale, width, height }
}

// 自动适应缩放比例
function autoCanvasScale() {
  let width = document.querySelector('#canvas-wp').clientWidth
  // let height = document.querySelector('#canvas-wp').clientHeight
  const minScale = (width - 120) / canvasDefaultSize
  const scale = parseFloat(minScale.toFixed(6)) * 100
  setCanvasScale(scale)
}

export { schemaState, canvas, autoCanvasScale, setCanvasScale }
