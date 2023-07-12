// 八个方位点对应的初始角度
import { off, on } from '@/utils/util'

export const getCursors = () => {
  return {
    b: 'ns-resize',
    l: 'ew-resize',
    lb: 'nesw-resize',
    lt: 'nwse-resize',
    r: 'ew-resize',
    rb: 'nwse-resize',
    rt: 'nesw-resize',
    t: 'ns-resize',
  }
}

/**
 * 计算缩放后位置大小 - 自然模式
 * @param dir 拖拽方向
 * @param attr 开始时的基本信息
 * @param startPoint 拖拽起始点位置
 * @param curPosition 当前拖拽位置
 * @param scale 缩放比例
 * @param pos
 * @param ratio 原始宽高比
 */
function calcResizeForNormal(dir, attr, startPoint, curPosition, scale, pos, ratio) {
  if (dir === 't') {
    pos.h = Math.round(attr.h + (startPoint.y - curPosition.y) / scale)
    pos.y = Math.round(attr.y + (curPosition.y - startPoint.y) / scale)
    pos.h = Math.max(pos.h, 20)
    if (attr.lockedRatio) {
      pos.w = pos.h * ratio
    }
  } else if (dir === 'rt') {
    pos.h = Math.round(attr.h + (startPoint.y - curPosition.y) / scale)
    pos.w = Math.round(attr.w + (curPosition.x - startPoint.x) / scale)
    pos.y = Math.round(attr.y + (curPosition.y - startPoint.y) / scale)
    pos.w = Math.max(pos.w, 20)
    pos.h = Math.max(pos.h, 20)
    if (attr.lockedRatio) {
      pos.w = pos.h * ratio
    }
  } else if (dir === 'r') {
    pos.w = Math.round(attr.w + (curPosition.x - startPoint.x) / scale)
    pos.w = Math.max(pos.w, 20)
    if (attr.lockedRatio) {
      pos.h = pos.w / ratio
    }
  } else if (dir === 'rb') {
    pos.h = Math.round(attr.h + (curPosition.y - startPoint.y) / scale)
    pos.w = Math.round(attr.w + (curPosition.x - startPoint.x) / scale)
    pos.w = Math.max(pos.w, 20)
    pos.h = Math.max(pos.h, 20)
    if (attr.lockedRatio) {
      pos.h = pos.w / ratio
    }
  } else if (dir === 'b') {
    pos.h = Math.round(attr.h + (curPosition.y - startPoint.y) / scale)
    pos.h = Math.max(pos.h, 20)
    if (attr.lockedRatio) {
      pos.w = pos.h * ratio
    }
  } else if (dir === 'lb') {
    pos.h = Math.round(attr.h + (curPosition.y - startPoint.y) / scale)
    pos.w = Math.round(attr.w + (startPoint.x - curPosition.x) / scale)
    pos.x = Math.round(attr.x + (curPosition.x - startPoint.x) / scale)
    pos.w = Math.max(pos.w, 20)
    pos.h = Math.max(pos.h, 20)
    if (attr.lockedRatio) {
      pos.h = pos.w / ratio
    }
  } else if (dir === 'l') {
    pos.w = Math.round(attr.w + (startPoint.x - curPosition.x) / scale)
    pos.x = Math.round(attr.x + (curPosition.x - startPoint.x) / scale)
    pos.w = Math.max(pos.w, 20)
    if (attr.lockedRatio) {
      pos.h = pos.w / ratio
    }
  } else if (dir === 'lt') {
    pos.h = Math.round(attr.h + (startPoint.y - curPosition.y) / scale)
    pos.w = Math.round(attr.w + (startPoint.x - curPosition.x) / scale)
    pos.w = Math.max(pos.w, 20)
    pos.h = Math.max(pos.h, 20)
    pos.x = Math.round(attr.x + (curPosition.x - startPoint.x) / scale)
    pos.y = Math.round(attr.y + (curPosition.y - startPoint.y) / scale)

    if (attr.lockedRatio) {
      pos.h = pos.w / ratio
      pos.y = Math.round(attr.y + (curPosition.x - startPoint.x) / scale)
    }
  }
}

const setAttr = (ev, dir, com, scale, grid) => {
  const attr = { ...com.attr }
  // 记录原始宽高比
  const ratio = attr.w / attr.h
  const pos = Object.create(null)
  const startX = ev.clientX
  const startY = ev.clientY

  const move = e => {
    const curX = e.clientX
    const curY = e.clientY
    // 每次移动固定格数
    const moveX = Math.round((curX - startX) / scale / grid) * grid
    const moveY = Math.round((curY - startY) / scale / grid) * grid

    if (dir) {
      calcResizeForNormal(
        dir,
        attr,
        { x: startX, y: startY },
        { x: curX, y: curY },
        scale,
        pos,
        ratio,
      )
    } else {
      pos.x = attr.x + moveX
      pos.y = attr.y + moveY
    }

    com.attr = { ...com.attr, ...pos }
  }
  const up = () => {
    off(document, 'mousemove', move)
    off(document, 'mouseup', up)
  }

  on(document, 'mousemove', move)
  on(document, 'mouseup', up)
}

export const handleMove = (ev, com, scale, grid) => {
  setAttr(ev, null, com, scale, grid)
}

export const handleZoom = (ev, dir, com, scale, grid) => {
  setAttr(ev, dir, com, scale, grid)
}

export const handleRotate = (ev, el, com) => {
  // 获取元素中心点位置
  const rect = el.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  const startAngle =
    (Math.atan2(centerY - ev.clientY, centerX - ev.clientX) * 180) / Math.PI - com.attr.rotate

  const move = e => {
    const angle =
      (Math.atan2(centerY - e.clientY, centerX - e.clientX) * 180) / Math.PI - startAngle
    const rotate = Math.round(angle % 360)
    com.attr.rotate = rotate < 0 ? rotate + 360 : rotate
  }

  const up = () => {
    off(document, 'mousemove', move)
    off(document, 'mouseup', up)
  }

  on(document, 'mousemove', move)
  on(document, 'mouseup', up)
}
