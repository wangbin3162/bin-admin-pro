<template>
  <div class="sheet-wrapper">
    <div class="sheet-header">
      <div class="left">
        <b-space>
          <h3>{{ title }}</h3>
        </b-space>
      </div>
      <div class="right">
        <b-button
          type="text"
          icon="bug"
          text-color="danger"
          title="打印调试"
          v-if="IS_DEV"
          @click="debug"
        />
        <b-button type="primary" size="small" icon="download" plain @click="downloadExcel">
          下载模板
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

    <div id="SheetContainer" class="sheet-excel has-config"></div>

    <div v-show="isMaskShow" class="mask">loading</div>
  </div>
</template>

<script setup>
import { Message } from 'bin-ui-design'
import { deepCopy } from '@/utils/util'
import { sendMsg } from '@/utils/cross-tab-msg'
import { excelData, debug, useData } from '../ExcelEdit/useData'
import { useRoute } from 'vue-router'
import { IS_DEV } from '@/utils/env'
import * as api from '@/api/modules/excel.api'

// @ts-ignore
const LuckySheet = window.luckysheet

const props = defineProps({
  cfg: {
    type: Object,
    default: () => ({}),
  },
})

const { title, btnLoading, isMaskShow, closePage, downloadExcel } = useData(props)

const route = useRoute()

// 保存
async function saveSheetData() {
  try {
    btnLoading.value = true
    const mapping = deepCopy(excelData.value.mapping)
    // 根据mapping来获取当前表格中的填写字段内容
    const obj = {}
    mapping.forEach(item => {
      const { cellIndex, fieldName } = item
      const { row, column } = cellIndex
      const value = LuckySheet.getCellValue(row, column)
      obj[fieldName] = value
    })

    const sheets = LuckySheet.getAllSheets()
    const data = {
      id: route.query.id ?? '',
      tempId: excelData.value.id,
      tempName: excelData.value.name,
      data: obj,
      sheets,
    }

    // 如果是新增报表，则调用新增
    if (data.id === '') {
      await api.addSheetData(data)
      Message.success('新增成功!')
      sendMsg('add-sheet-data', { ...data })
      resetSheetData()
    } else {
      await api.modifySheetData(data)
      Message.success('修改成功!')
      sendMsg('modify-sheet-data', { ...data })
    }
  } catch (error) {
    console.log(error)
  }
  btnLoading.value = false
}

// 根据mapping，初始化表格数据
function resetSheetData() {
  try {
    btnLoading.value = true
    const mapping = deepCopy(excelData.value.mapping)
    // 根据mapping来获取当前表格中的填写字段内容
    mapping.forEach(item => {
      const { cellIndex } = item
      const { row, column } = cellIndex
      LuckySheet.setCellValue(row, column, '')
    })
  } catch (error) {
    console.log(error)
  }
  btnLoading.value = false
}
</script>

<style scoped>
.sheet-wrapper {
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
    width: 100%;
    left: 0px;
    top: 50px;
    bottom: 0px;
    :deep(.luckysheet) {
      border: none;
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
