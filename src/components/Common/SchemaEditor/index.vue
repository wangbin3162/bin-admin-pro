<template>
  <div class="schema-container" @wheel.ctrl.prevent="ctrlMouseWheel">
    <CanvasMain />
    <div class="config-main">
      <div class="header-box">
        <div class="tab" :class="{ active: activeTab === 'list' }" @click="activeTab = 'list'">
          组件列表
        </div>
        <div class="tab" :class="{ active: activeTab === 'com' }" @click="activeTab = 'com'">
          组件配置
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

import StoreDev from './store/StoreDev.vue'

import {
  activeTab,
  resetSchemaStatus,
  setBgInfo,
  resizeCanvasPageByImgSize,
} from './store/useSchema'
import { initShortcuts, ctrlMouseWheel } from './store/useShortcuts'
import { resetCompStatus, selectedCom } from './store/useCom'

defineProps({
  height: {
    type: String,
    default: '700px',
  },
})

resetSchemaStatus()
resetCompStatus()
initShortcuts()

// 载入图片
function loadBgImage(imageInfo) {
  setBgInfo(imageInfo)
  resetCompStatus()
  // 根据背景图调整画布大小
  resizeCanvasPageByImgSize(imageInfo)
}

defineExpose({ loadBgImage })
</script>

<style lang="stylus" scoped>
.schema-container {
  position: relative;
  user-select: none;
  display: flex;
  height: 700px;
  background: #fff;
  overflow: hidden;
  // cursor: url('@/components/Common/SchemaEditor/assets/cursor-default.png') 4 4, auto;
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
