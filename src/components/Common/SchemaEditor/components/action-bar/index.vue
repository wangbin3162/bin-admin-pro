<template>
  <div class="action-container">
    <div class="action-bar-wrap-line">
      <b-button-group>
        <action-button
          icon="aim"
          tooltip="自适应"
          :iconStyle="{ fontSize: '14px' }"
          @click="autoCanvasScale"
        />
        <action-button
          icon="minus"
          tooltip="缩小"
          :iconStyle="{ fontSize: '14px' }"
          @click="calcScale(-5)"
        />
        <action-button @click="setCanvasScale(100)">
          <span style="font-size: 12px">{{ scale }}%</span>
        </action-button>
        <action-button
          icon="plus"
          tooltip="放大"
          :iconStyle="{ fontSize: '14px' }"
          @click="calcScale(+5)"
        />
        <action-button
          icon="expend"
          tooltip="最大"
          :iconStyle="{ fontSize: '14px' }"
          @click="setCanvasScale(200)"
        />
      </b-button-group>
    </div>
    <div class="action-bar-wrap">
      <b-button-group>
        <action-button icon="question-circle" tooltip="帮助" :iconStyle="{ fontSize: '14px' }" />
        <action-button
          icon="clear"
          tooltip="清空画布"
          confirm
          message="确定要清空组件吗？"
          :iconStyle="{ fontSize: '14px' }"
          @click="onClear"
        />
      </b-button-group>
    </div>
  </div>
</template>

<script setup>
import { resetCompStatus } from '../../store/useCom'
import { canvas, autoCanvasScale, setCanvasScale } from '../../store/useSchema'
import { ref, watch } from 'vue'

function onClear() {
  resetCompStatus()
}

function calcScale(num = 5) {
  scale.value += num
  if (scale.value > 200) scale.value = 200
  if (scale.value < canvas.value.minScale) scale.value = canvas.value.minScale
  setCanvasScale(scale.value)
}

const scale = ref(20)

// 缩放变化后，设置自适应的缩放大小
watch(
  () => canvas.value.scale,
  s => {
    const val = parseInt((s * 100).toFixed(2))
    scale.value = val
  },
)
</script>

<style scoped>
.action-bar-wrap-line {
  position: absolute;
  height: 24px;
  top: 25px;
  right: 345px;
  z-index: 2;
  :deep(.bin-button-group) {
    display: flex;
    .bin-button {
      padding: 0 7px;
      border-radius: 0;
      height: 24px;
    }
  }
}
.action-bar-wrap {
  position: absolute;
  width: 28px;
  top: 55px;
  right: 310px;
  z-index: 2;
  min-height: 32px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  transition: 0.25s ease-in-out;
  :deep(.bin-button-group) {
    display: flex;
    flex-direction: column;
    .bin-button {
      padding: 0 7px;
      border-radius: 0;
      height: 28px;
    }
    button + button {
      margin-top: -1px;
      margin-left: 0;
    }
  }
}
</style>
