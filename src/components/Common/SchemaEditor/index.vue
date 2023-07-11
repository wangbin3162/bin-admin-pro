<template>
  <div class="schema-container" @wheel.ctrl.prevent="ctrlMouseWheel">
    <CanvasMain />
    <div class="config-main">
      <b-ace-editor
        :model-value="JSON.stringify({ canvas, shortcuts, bgInfo }, null, 2)"
        height="700px"
      />
    </div>
  </div>
</template>

<script>
export default { name: 'SchemaEditor' }
</script>

<script setup>
import { ref } from 'vue'
import CanvasMain from './components/CanvasMain.vue'
import { initSchemaStore, canvas, bgInfo, resizeCanvasPageByImgSize } from './useSchema'
import { initShortcuts, ctrlMouseWheel, shortcuts } from './useShortcuts'

defineProps({
  height: {
    type: String,
    default: '700px',
  },
})

initSchemaStore()
initShortcuts()

// 载入北极光图片
function loadBgImage(imageInfo) {
  bgInfo.value = imageInfo
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
  .config-main {
    width: 300px;
    position: relative;
    z-index: 90;
  }
}
</style>
