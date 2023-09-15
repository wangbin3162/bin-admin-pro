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
        <b-button
          type="text"
          icon="bug"
          text-color="danger"
          title="打印调试"
          v-if="IS_DEV"
          @click="debug"
        />
        <b-button type="primary" size="small" icon="login" plain @click="loadExcel">
          导入模板
        </b-button>
        <b-button type="primary" size="small" icon="download" plain @click="downloadExcel">
          下载模板
        </b-button>
        <b-divider type="vertical"></b-divider>
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

    <div class="right-config">
      <div class="right-top">
        <b-button type="primary" size="small" dashed @click="setCellToMapping">设为数据项</b-button>
      </div>
      <div class="right-content">
        <b-scrollbar>
          <MappingConfig />

          <template v-if="IS_DEV">
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
          </template>
        </b-scrollbar>
      </div>
    </div>

    <div v-show="isMaskShow" class="mask">loading</div>
  </div>
</template>

<script setup>
import { Message } from 'bin-ui-next'
import { toRaw } from 'vue'
import { isEqual } from '@/utils/util'
import { IS_DEV } from '@/utils/env'
import { sendMsg } from '@/utils/cross-tab-msg'
import { formateCellRange } from '@/utils/luckysheet-util/data-tmp'
import { excelData, debug, useData } from './useData'
import MappingConfig from './MappingConfig.vue'
import * as api from '@/api/modules/excel.api'
import { useRouter } from 'vue-router'

// @ts-ignore
const LuckySheet = window.luckysheet

const props = defineProps({
  cfg: {
    type: Object,
    default: () => ({}),
  },
})
const { info, title, btnLoading, isMaskShow, closePage, loadExcel, downloadExcel } = useData(props)
const router = useRouter()

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
    btnLoading.value = true
    // 判断是修改还是新增
    const isCreate = data.id === ''
    // 新增
    if (isCreate) {
      const id = await api.addTemplate(data)
      if (id) {
        Message.success('新增成功!')
        sendMsg('add-temp', { ...data })
        excelData.value.id = id
        let routeData = router.resolve({
          path: '/excel-edit',
          query: { id },
        })
        window.location.replace(routeData.href)
        document.title = '修改模板'
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

// 设置为数据项
function setCellToMapping() {
  const range = LuckySheet.getRange()[0] // 取第一个选区

  const formatRange = formateCellRange(range)
  // 判断是否有相同的cellRange
  const index = excelData.value.mapping.findIndex(item => isEqual(item.cellRange, range))
  if (index > -1) {
    Message.warning('已存在相同位置的单元格数据项！')
    return
  }
  // 追加一个映射值
  excelData.value.mapping.push({
    ...formatRange,
    fieldName: '', // 字段名称
    fieldTitle: '', // 字段标题
    dataType: 'string', // string,number,date
  })
}
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
