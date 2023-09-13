<template>
  <div class="sheet-wrapper">
    <div class="sheet-header">
      <div class="left">
        {{ title }}
      </div>
      <div class="right">
        <b-button type="primary" @click="getCurrentCell">获取当前单元格</b-button>
        <b-button type="primary" @click="getSheetData">保存</b-button>
      </div>
    </div>
    <div id="luckysheet" :class="{ 'has-config': isConfig }"></div>
    <div class="right-config" v-if="isConfig">
      <div>右侧配置</div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { deepMerge, deepCopy } from '@/utils/util'
import defaultOpts from './utils/default-options'

// @ts-ignore
const LuckySheet = window.luckysheet

defineOptions({
  name: 'LuckySheet',
})

const props = defineProps({
  cfg: {
    type: Object,
    default: () => ({}),
  },
  title: {
    type: String,
    default: 'Luckysheet Demo',
  },
  // config 模式，需要提供一个配置面板
  isConfig: {
    type: Boolean,
    default: true,
  },
})

const hook = {
  cellMousedown: (cel, position, sheet, ctx) => {
    console.log({ cel, position, sheet, ctx })
  },
}

const options = computed(() => {
  const opt = deepMerge(
    deepCopy({
      ...defaultOpts,
      title: props.title, // 设定表格名称
      data: [{ name: 'Sheet1', index: 0 }],
    }),
    deepCopy(props.cfg),
  )

  return opt
})

function getSheetData() {
  const sheets = LuckySheet.getAllSheets()
  console.log(sheets[0])
}

function getCurrentCell() {
  const range = LuckySheet.getRange()
  console.log(range)
}
onMounted(() => {
  LuckySheet.create(options.value)
})
</script>

<style>
.sheet-wrapper {
  position: relative;
  width: 100%;
  height: 100vh;
  .sheet-header {
    height: 50px;
    display: flex;
    padding: 0 16px;
    justify-content: space-between;
    align-items: center;
  }
  #luckysheet {
    margin: 0px;
    padding: 0px;
    position: absolute;
    width: 100%;
    left: 0px;
    top: 50px;
    bottom: 0px;
  }
}
</style>
