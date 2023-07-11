<template>
  <div class="schema-container" @wheel.ctrl.prevent="ctrlMouseWheel">
    <CanvasMain />
    <div class="config-main">
      <b-ace-editor :model-value="JSON.stringify(schemaState, null, 2)" height="700px" />
    </div>
  </div>
</template>

<script>
export default { name: 'SchemaEditor' }
</script>

<script setup>
import { ref } from 'vue'
import CanvasMain from './components/CanvasMain.vue'

import { schemaState } from './useSchema'
import { ctrlMouseWheel } from './useShortcuts'
</script>

<style lang="stylus" scoped>
.schema-container {
  display: flex;
  height: 100%;
  background: #fff;
  overflow: hidden;
  .config-main {
    width: 300px;
    position: relative;
    z-index: 90;
  }
}
</style>
