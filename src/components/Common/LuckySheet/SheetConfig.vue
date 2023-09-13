<template>
  <div class="sheet-wrapper">
    <div class="sheet-header">
      <div class="left">
        <b-space>
          <h3>模板名称</h3>
          <b-input v-model="title" placeholder="模板名称" />
          <b-button type="primary" @click="loadExcel">导入</b-button>
        </b-space>
      </div>
      <div class="right">
        <b-button type="danger" icon="bug" @click="debug" />
        <b-button type="primary" plain @click="downloadExcel">下载excel</b-button>
        <b-button type="primary" @click="getCurrentCell">获取当前单元格</b-button>
        <b-button type="primary" @click="getSheetData">保存</b-button>
      </div>
    </div>
    <div id="SheetConfig" class="sheet-excel has-config"></div>
    <div class="right-config">
      <div>右侧配置</div>
    </div>

    <div v-show="isMaskShow" class="mask">Downloading</div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { deepMerge, deepCopy } from '@/utils/util'
import { Message } from 'bin-ui-next'
import LuckyExcel from 'luckyexcel'
import defaultOpts from './utils/default-options'
import { defaultSheetInfo } from './utils/data-tmp'
import { isFunction } from './utils/is'
import { exportExcel } from './utils/export'

// @ts-ignore
const LuckySheet = window.luckysheet

defineOptions({
  name: 'SheetConfig',
})

const emit = defineEmits(['update:name'])

const props = defineProps({
  cfg: {
    type: Object,
    default: () => ({}),
  },
  name: {
    type: String,
  },
})

const title = computed({
  get: () => props.name,
  set: val => emit('update:name', val),
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
      container: 'SheetConfig',
      title: props.title, // 设定表格名称
      data: [{ name: 'Sheet1', index: 0 }],
    }),
    deepCopy(props.cfg),
  )

  return opt
})

const info = ref({ ...defaultSheetInfo })
const jsonData = ref({})
const isMaskShow = ref(false)

// debug
function debug() {
  console.log('--------------------debug--------------------')
  console.log('props.name', props.name)
  console.log('info', info.value)
  console.log('------------------debug end------------------')
}

// 载入excel行程模板
function loadExcel() {
  let input = document.createElement('input')
  input.type = 'file'

  input.onchange = e => {
    const files = e.target.files
    if (!files || files.length === 0) {
      Message.error('No files wait for import')
      return
    }
    let file = files[0]
    const name = file.name

    let suffixArr = name.split('.'),
      suffix = suffixArr[suffixArr.length - 1]

    if (suffix !== 'xlsx') {
      Message.error('Currently only supports the import of xlsx files')
      return
    }
    // 更新info信息
    info.value.name = title.value = file.name

    isMaskShow.value = true

    LuckyExcel.transformExcelToLucky(files[0], exportJson => {
      if (!exportJson.sheets || exportJson.sheets.length === 0) {
        Message.error(
          'Failed to read the content of the excel file, currently does not support xls files!',
        )
        return
      }
      console.log('exportJson', exportJson)
      jsonData.value = exportJson

      isMaskShow.value = false

      destroy() // 销毁重建

      LuckySheet.create({
        ...options.value,
        data: exportJson.sheets,
        title: exportJson.info.name,
        userInfo: exportJson.info.name.creator,
      })
    })
  }

  input.click()
}

// 下载当前excel模板
function downloadExcel() {
  exportExcel(LuckySheet.getAllSheets(), title.value)
}

function getSheetData() {
  const sheets = LuckySheet.getAllSheets()
  console.log(sheets)
}

function getCurrentCell() {
  const range = LuckySheet.getRange()
  console.log(range)
}

function destroy() {
  isFunction(LuckySheet?.destroy) && LuckySheet.destroy()
}

onMounted(() => {
  LuckySheet.create(options.value)
})

onBeforeUnmount(() => {
  destroy()
})
</script>

<style scoped>
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
  .sheet-excel {
    margin: 0px;
    padding: 0px;
    position: absolute;
    width: 100%;
    left: 0px;
    top: 50px;
    bottom: 0px;
  }
  .mask {
    position: absolute;
    z-index: 1000000;
    left: 0px;
    top: 0px;
    bottom: 0px;
    right: 0px;
    background: rgba(255, 255, 255, 0.8);
    text-align: center;
    font-size: 40px;
    align-items: center;
    justify-content: center;
    display: flex;
  }
}
</style>
