<template>
  <div class="schema-container" @wheel.ctrl.prevent="ctrlMouseWheel">
    <CanvasMain />
    <div class="config-main">
      <div class="header-box">
        <div class="tab" :class="{ active: activeTab === 'list' }" @click="activeTab = 'list'">
          组件列表
        </div>
        <div class="tab" :class="{ active: activeTab === 'com' }" @click="activeTab = 'com'">
          参数配置
        </div>
      </div>
      <CompList v-if="activeTab === 'list'" />
      <div v-else>
        <b-empty v-if="!selectedCom">请选择一个区域</b-empty>
      </div>
      <!-- <StoreDev /> -->
    </div>
    <ContextMenu />
  </div>
</template>

<script>
export default { name: 'SchemaEditor' }
</script>

<script setup>
import CanvasMain from './components/CanvasMain.vue'
import StoreDev from './store/StoreDev.vue'
import CompList from './components/CompList.vue'
import ContextMenu from './components/ContextMenu.vue'

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

// 载入北极光图片
function loadBgImage(imageInfo) {
  setBgInfo(imageInfo)
  // 根据背景图调整画布大小
  resizeCanvasPageByImgSize(imageInfo)
}

defineExpose({ loadBgImage })
</script>

<style lang="stylus" scoped>
.schema-container {
  display: flex;
  height: 700px;
  background: #fff;
  overflow: hidden;
  // cursor: url('@/components/Common/SchemaEditor/assets/cursor-default.png') 4 4, auto;
  .config-main {
    width: 300px;
    height: 100%;
    position: relative;
    z-index: 90;
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