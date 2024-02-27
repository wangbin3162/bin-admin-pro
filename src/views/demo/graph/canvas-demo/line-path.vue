<template>
  <div class="p24">
    <div flex="">
      <dev-pos :dev="dev" @dev-pos="clickPos">
        <canvas class="canvas" ref="domRef" width="600" height="250"></canvas>
      </dev-pos>
      <div style="width: calc(100% - 600px)" class="p10">
        <div flex="cross:center">
          <span class="mr-5">dev模式</span>
          <b-switch v-model="dev" size="small" @change="devChange"></b-switch>
          <b-tag type="warning" style="margin: 0 0 0 5px">
            dev模式会清空数据点,点击区域内部进行新增
          </b-tag>
        </div>
        <b-divider />
        <b-tag>点位</b-tag>
        <div>
          <b-tag
            type="primary"
            v-for="(point, index) in linePath"
            :key="index"
            style="margin: 0 4px 4px 0"
          >
            {{ point }}
          </b-tag>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { nextTick, onMounted, ref } from 'vue'

const domRef = ref(null)

const path = [
  [100, 100],
  [200, 100],
  [230, 200],
  [250, 50],
  [270, 180],
  [300, 60],
  [330, 160],
  [350, 60],
  [380, 100],
  [480, 100],
]

const dev = ref(false)
const linePath = ref([...path])

function devChange(val) {
  if (val) {
    linePath.value = []
  } else {
    linePath.value = [...path]
  }
  nextTick(() => init())
}

function clickPos(val) {
  linePath.value.push(val)

  nextTick(() => init())
}

function setupCanvas(canvas) {
  let width = canvas.width,
    height = canvas.height,
    dpr = window.devicePixelRatio || 1.0
  if (dpr !== 1.0) {
    canvas.style.width = width + 'px'
    canvas.style.height = height + 'px'
    canvas.height = height * dpr
    canvas.width = width * dpr
    canvas.getContext('2d').scale(dpr, dpr)
  }
}

function createGradient(ctx, x0, y0, x1, y1) {
  const grd = ctx.createLinearGradient(x0, y0, x1, y1)
  grd.addColorStop(0, '#9a12b3')
  grd.addColorStop(1, '#19b5fe')
  return grd
}

// 设置点,需要在之前beginPath()，之后进行stroke()进行绘制
function setPathPoints(ctx, points) {
  for (let i = 0; i < points.length; i++) {
    const [x, y] = points[i]
    if (i === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  }
}

function init() {
  const canvas = domRef.value
  const ctx = canvas.getContext('2d')

  const w = canvas.width
  const h = canvas.height
  const x = w / 2
  const y = h / 2
  let offset = 100

  setupCanvas(canvas)

  function animate() {
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, w, h)
    ctx.lineWidth = 3
    ctx.save()
    ctx.beginPath()
    setPathPoints(ctx, linePath.value) // 绘制点
    ctx.strokeStyle = 'gray'
    ctx.lineJoin = 'round'
    ctx.stroke()

    ctx.beginPath()
    ctx.rect(offset, 0, 150, 500)
    ctx.clip()
    ctx.beginPath()
    setPathPoints(ctx, linePath.value) // 绘制点
    ctx.lineWidth = 4
    ctx.strokeStyle = createGradient(ctx, offset, 0, offset + 150, 0)
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.stroke()

    ctx.restore()

    offset += 2
    if (offset > 600) {
      offset = 0
    }

    requestAnimationFrame(animate)
  }

  animate()
}

onMounted(() => {
  init()
})
</script>

<style scoped>
.canvas {
  border: 1px solid #eee;
}
</style>
