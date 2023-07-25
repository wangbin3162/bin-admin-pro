import { canvas, setCanvasScale } from './useSchema'
import { selectedCom, toDeleteCom } from './useCom'
import { onBeforeUnmount, onMounted, ref, computed } from 'vue'
import { off, on } from '@/utils/util'

const shortcuts = ref({
  altKey: false,
  ctrlKey: false,
  shiftKey: false,
  spaceKey: false,
})

const ctrlDown = computed(() => shortcuts.value.ctrlKey)
const spaceDown = computed(() => shortcuts.value.spaceKey)

// 重置快捷键
function resetKeyCode() {
  shortcuts.value = {
    altKey: false,
    ctrlKey: false,
    shiftKey: false,
    spaceKey: false,
  }
}

const keyDown = key => (shortcuts.value[key] = true)

const addShortcuts = ev => {
  // const target = ev.target
  const com = selectedCom.value
  const key = ev.key.toLowerCase()

  if (key === 'delete') {
    toDeleteCom()
    ev.preventDefault()
  }

  if (ev.shiftKey) {
    keyDown('shiftKey')
  }
  if (ev.ctrlKey) {
    keyDown('ctrlKey')
  }
  // 暂时不能用空格
  // if (ev.keyCode === 32) {
  //   // keyDown('spaceKey')
  //   // ev.preventDefault()
  // }

  // 组件微调移动
  const step = ev.shiftKey ? 10 : 1
  if (com && !ev.altKey) {
    if (key === 'arrowleft') {
      com.attr.x -= step
      ev.preventDefault()
    } else if (key === 'arrowright') {
      com.attr.x += step
      ev.preventDefault()
    } else if (key === 'arrowup') {
      com.attr.y -= step
      ev.preventDefault()
    } else if (key === 'arrowdown') {
      com.attr.y += step
      ev.preventDefault()
    }
  }
}

// 鼠标滚轮缩放
const ctrlMouseWheel = ev => {
  const scale = parseInt((canvas.value.scale * 100).toFixed(2))
  const zoom = (ev.wheelDelta > 0 ? 1 : -1) * 5
  // 计算缩放比例
  const next = Math.min(Math.max(scale + zoom, 20), 200)
  setCanvasScale(next)
}

// 初始化快捷键功能监听
function initShortcuts() {
  resetKeyCode()
  onMounted(() => {
    on(document, 'keydown', addShortcuts)
    on(document, 'keyup', resetKeyCode)
  })
  onBeforeUnmount(() => {
    off(document, 'keydown', addShortcuts)
    off(document, 'keyup', resetKeyCode)
  })
}
export { ctrlMouseWheel, shortcuts, spaceDown, ctrlDown, initShortcuts }
