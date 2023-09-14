<template>
  <div class="sheet-wrapper">
    <div class="sheet-header">
      <div class="left">
        <b-space>
          <h3>模板名称</h3>
          <b-input v-model="title" placeholder="模板名称" />
        </b-space>
      </div>
      <div class="right">
        <b-button type="text" icon="bug" text-color="danger" title="打印调试" @click="debug" />
        <b-button type="primary" size="small" icon="vertical-align-botto" plain @click="loadExcel">
          导入
        </b-button>
        <b-button type="primary" size="small" icon="totop" plain @click="downloadExcel">
          导出
        </b-button>
        <b-button
          type="primary"
          size="small"
          icon="save"
          :loading="btnLoading"
          @click="saveSheetData"
        >
          保存
        </b-button>
        <b-button type="danger" size="small" icon="close" @click="closePage">关闭</b-button>
      </div>
    </div>
    <div id="SheetConfig" class="sheet-excel has-config"></div>
    <div class="right-config">
      <div class="right-top">
        <b-button type="primary" size="small" dashed @click="getCurrentCell">设为数据项</b-button>
      </div>
      <div class="right-content">
        <b-scrollbar>
          <b-divider align="left">实际存储值</b-divider>
          <b-ace-editor
            :model-value="
              JSON.stringify(
                { id: excelData.id, name: excelData.name, mapping: excelData.mapping },
                null,
                2,
              )
            "
            readonly
          ></b-ace-editor>
        </b-scrollbar>
      </div>
    </div>

    <div v-show="isMaskShow" class="mask">loading</div>
  </div>
</template>

<script setup>
import LuckyExcel from 'luckyexcel'
import { Message, MessageBox } from 'bin-ui-next'
import { computed, onBeforeUnmount, onMounted, ref, toRaw } from 'vue'
import { deepMerge, deepCopy } from '@/utils/util'
import { sendMsg } from '@/utils/cross-tab-msg'
import defaultOpts from '@/utils/luckysheet-util/default-options'
import { isFunction } from '@/utils/luckysheet-util/is'
import { exportExcel } from '@/utils/luckysheet-util/export'
import { defaultSheetInfo } from '@/utils/luckysheet-util/data-tmp'
import { excelData } from './useData'
import * as api from '@/api/modules/excel.api'

// @ts-ignore
const LuckySheet = window.luckysheet

const props = defineProps({
  cfg: {
    type: Object,
    default: () => ({}),
  },
})

const title = computed({
  get: () => excelData.value.name,
  set: val => (excelData.value.name = val),
})

const options = computed(() => {
  const opt = deepMerge(
    deepCopy({
      ...defaultOpts,
      container: 'SheetConfig',
      title: title.value, // 设定表格名称
      data: [{ name: 'Sheet1', index: 0 }],
    }),
    deepCopy(props.cfg),
  )

  return opt
})

const info = ref({ ...defaultSheetInfo, ...excelData.value?.jsonData?.info })
const jsonData = ref({})
const btnLoading = ref(false)
const isMaskShow = ref(false)

// debug
function debug() {
  console.log('-------------------------------------debug--------------------------------------')
  console.log('excelData', excelData.value)
  console.log('info', info.value)
  console.log('-----------------------------------debug end------------------------------------')
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
    info.value.name = file.name

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
  exportExcel(LuckySheet.getAllSheets(), title.value).then(() => {
    Message.success('导出成功!')
  })
}

// 保存
async function saveSheetData() {
  try {
    info.value.name = title.value
    // 更新info信息
    const sheets = LuckySheet.getAllSheets()
    const data = {
      ...toRaw(excelData.value),
      jsonData: {
        info: toRaw(info.value),
        sheets,
      },
    }
    console.log(data)
    btnLoading.value = true
    // 判断是修改还是新增
    const isCreate = data.id === ''
    // 新增
    if (isCreate) {
      const id = await api.addTemplate(data)
      if (id) {
        Message.success('新增成功!')
        sendMsg('add-temp', { ...data })
      }
    } else {
      // 修改
      await api.modifyTemplate(data)
      Message.success('修改成功!')
      sendMsg('modify-temp', { ...data })
    }
  } catch (error) {
    console.log(error)
  }
  btnLoading.value = false
}

function getCurrentCell() {
  const range = LuckySheet.getRange()
  console.log(range)
}

// 关闭
function closePage() {
  MessageBox.confirm({
    type: 'warning',
    title: '提示',
    message: '关闭当前页面会丢失没有保存的操作, 是否继续?',
  })
    .then(() => {
      // 关闭当前页面
      window.close()
    })
    .catch(() => {})
}

// 销毁工作表
function destroy() {
  isFunction(LuckySheet?.destroy) && LuckySheet.destroy()
}

onMounted(() => {
  debug()
  const id = excelData.value.id
  const opts = { ...options.value }
  if (id) {
    opts.data = excelData.value.jsonData?.sheets
    opts.title = excelData.value.jsonData?.info.name
  }
  LuckySheet.create(opts)
})

onBeforeUnmount(() => {
  destroy()
})
</script>

<style scoped>
.sheet-wrapper {
  --v-right-width: 360px;
  position: relative;
  width: 100%;
  height: 100vh;
  .sheet-header {
    position: relative;
    height: 50px;
    display: flex;
    padding: 0 16px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e5e5e5;
  }
  .sheet-excel {
    position: absolute;
    margin: 0px;
    padding: 0px;
    width: calc(100% - var(--v-right-width));
    left: 0px;
    top: 50px;
    bottom: 0px;
    :deep(.luckysheet) {
      border: none;
    }
  }
  .right-config {
    position: absolute;
    width: var(--v-right-width);
    top: 50px;
    bottom: 0;
    right: 0;
    border-left: 1px solid #e5e5e5;
    display: flex;
    flex-direction: column;
    .right-top {
      height: 41px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      padding: 5px 0 3px 15px;
      border-bottom: 1px solid #d4d4d4;
    }
    .right-content {
      flex: 1;
      padding: 8px;
    }
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
