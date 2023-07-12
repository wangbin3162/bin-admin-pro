// 编辑器配置共享数据，需要注意状态的清空和初始化。
import { deepCopy, on, off } from '@/utils/util'
import { ref, nextTick } from 'vue'
import { selectedCom } from './useCom'

const defaultCanvas = {
  width: 2000,
  height: 2000,
  scale: 1,
  pageWidth: 2000,
  pageHeight: 2000,
}
const defaultBg = { url: null, width: 2000, height: 1 }

// 画布信息
const canvas = ref(deepCopy(defaultCanvas))

const bgInfo = ref(deepCopy(defaultBg))

const contextMenu = ref({ x: 0, y: 0, show: false }) // 右键菜单

const showMenu = e => {
  e.preventDefault()
  if (selectedCom.value) {
    contextMenu.value.x = e.clientX
    contextMenu.value.y = e.clientY
    contextMenu.value.show = true

    on(document, 'click', hideMenu)
  }
}
const hideMenu = () => {
  off(document, 'click', hideMenu)
  contextMenu.value.show = false
}

function setBgInfo(val) {
  bgInfo.value = val
}

// 重置状态
const resetSchemaStatus = () => {
  canvas.value = deepCopy(defaultCanvas)
  bgInfo.value = deepCopy(defaultBg)
}

// 设置缩放比例
function setCanvasScale(scaleSetValue) {
  let width = document.querySelector('#canvas-wp').clientWidth
  let height = document.querySelector('#canvas-wp').clientHeight

  const minScale = Math.floor(((width - 120) / canvas.value.pageWidth) * 100)

  // 限制缩放比例为
  const scale = Math.min(Math.max(scaleSetValue, minScale), 200) / 100
  // 方便计算滚动条 和 标尺
  const deltaW = Math.floor(canvas.value.pageWidth * scale)

  const deltaH = Math.floor(canvas.value.pageHeight * scale)
  if (width < deltaW) {
    width = deltaW + 120 - 5
  }
  if (height < deltaH) {
    height = deltaH + 120
  }
  canvas.value.scale = scale

  canvas.value.width = width
  canvas.value.height = height
}

// 自动适应缩放比例
function autoCanvasScale() {
  let width = document.querySelector('#canvas-wp').clientWidth
  // let height = document.querySelector('#canvas-wp').clientHeight
  const minScale = Math.floor(((width - 120) / canvas.value.pageWidth) * 100)
  setCanvasScale(minScale)
}

// 根据载入的背景图片信息，调整画布的大小
function resizeCanvasPageByImgSize({ width, height }) {
  canvas.value.pageWidth = width
  canvas.value.pageHeight = height
  nextTick(() => {
    autoCanvasScale()
  })
}

export {
  canvas,
  bgInfo,
  setBgInfo,
  resetSchemaStatus,
  autoCanvasScale,
  setCanvasScale,
  resizeCanvasPageByImgSize,
  contextMenu,
  showMenu,
}
