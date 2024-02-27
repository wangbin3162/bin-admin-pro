<template>
  <div class="schema-container" @wheel.ctrl.prevent="ctrlMouseWheel" :style="{ height }">
    <CanvasMain />
    <div class="config-main">
      <div class="header-box">
        <div class="tab" :class="{ active: activeTab === 'list' }" @click="activeTab = 'list'">
          区域集合
        </div>
        <div class="tab" :class="{ active: activeTab === 'com' }" @click="activeTab = 'com'">
          区域配置
        </div>
      </div>
      <CompList v-if="activeTab === 'list'" />
      <CompConfig v-else :config="selectedCom" />
    </div>
    <ActionBar />
    <ContextMenu />
  </div>
</template>

<script>
export default { name: 'SchemaEditor' }
</script>

<script setup>
import CanvasMain from './components/CanvasMain.vue'
import ContextMenu from './components/ContextMenu.vue'
import ActionBar from './components/action-bar/index.vue'
import CompList from './components/CompList.vue'
import CompConfig from './components/CompConfig.vue'

import {
  canvas,
  bgInfo,
  activeTab,
  resetSchemaStatus,
  setBgInfo,
  resizeCanvasPageByImgSize,
} from './store/useSchema'
import { initShortcuts, ctrlMouseWheel } from './store/useShortcuts'
import { comps, resetCompStatus, selectedCom } from './store/useCom'
import { emitter, SCHEMA_AUTO_SAVE } from './store/eventBus'

const emit = defineEmits(['auto-save'])

emitter.on(SCHEMA_AUTO_SAVE, () => emit('auto-save'))

defineProps({
  height: {
    type: String,
    default: '700px',
  },
})

resetSchemaStatus()
resetCompStatus()
initShortcuts()

function getAllConfig() {
  return {
    canvas: canvas.value,
    bgInfo: bgInfo.value,
    comps: comps.value,
  }
}

function setConfig(data) {
  resetSchemaStatus()
  resetCompStatus()
  loadBgImage(data.bgInfo)
  comps.value = [...(data.comps ?? [])]
}

// 载入图片
function loadBgImage(imageInfo) {
  setBgInfo(imageInfo)
  // 根据背景图调整画布大小
  resizeCanvasPageByImgSize(imageInfo)
}

defineExpose({ loadBgImage, getAllConfig, setConfig })
</script>

<style scoped>
.schema-container {
  position: relative;
  user-select: none;
  display: flex;
  height: 700px;
  background: #fff;
  overflow: hidden;
  .config-main {
    width: 300px;
    height: 100%;
    position: relative;
    border: 1px solid #d9d9d9;
    border-left: none;
    .header-box {
      display: flex;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #d9d9d9;
      .tab {
        cursor: pointer;
        position: relative;
        width: 50%;
        padding: 0 16px;
        text-align: center;
        &.active {
          background: #f3f9ff;
          &:before {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: #1089ff;
          }
        }
      }
    }
  }
}
</style>
