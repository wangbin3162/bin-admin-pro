import { canvas, setCanvasScale } from './useSchema'

// 鼠标滚轮缩放
const ctrlMouseWheel = ev => {
  const scale = parseInt((canvas.value.scale * 100).toFixed(2))
  const zoom = (ev.wheelDelta > 0 ? 1 : -1) * 5
  // 计算缩放比例
  const next = Math.min(Math.max(scale + zoom, 20), 200)
  setCanvasScale(next)
}

export { ctrlMouseWheel }
