<template>
  <div class="schema-container" @wheel.ctrl.prevent="ctrlMouseWheel">
    <CanvasMain />
    <div class="config-main">
      <StoreDev />
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
import ContextMenu from './components/ContextMenu.vue'

import { resetSchemaStatus, setBgInfo, resizeCanvasPageByImgSize } from './store/useSchema'
import { initShortcuts, ctrlMouseWheel } from './store/useShortcuts'
import { resetCompStatus } from './store/useCom'

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
    position: relative;
    z-index: 90;
  }
}
</style>
