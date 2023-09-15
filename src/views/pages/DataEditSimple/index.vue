<template>
  <div class="sheet-wrapper">
    <div class="sheet-header">
      <div class="left">
        <b-space>
          <h3>{{ title }}</h3>
        </b-space>
      </div>
      <div class="right">
        <b-icon type="button" name="close" color="#f5222d" size="24" @click="closePage" />
      </div>
    </div>

    <div class="sheet-excel">
      <div class="form-box" v-if="render">
        <b-form label-width="100px" :model="formData">
          <b-form-item
            v-for="(item, index) in excelData.mapping"
            :key="index"
            :prop="item.fieldName"
            :label="item.fieldTitle"
          >
            <b-input v-if="item.dataType === 'string'" v-model="formData[item.fieldName]" />
            <b-input-number v-if="item.dataType === 'number'" v-model="formData[item.fieldName]" />
          </b-form-item>
          <b-form-item>
            <b-button type="primary" :loading="btnLoading" @click="saveSheetData">保 存</b-button>
          </b-form-item>
        </b-form>
      </div>
    </div>

    <div v-show="isMaskShow" class="mask">loading</div>
  </div>
</template>

<script setup>
import { Message } from 'bin-ui-next'
import { sendMsg } from '@/utils/cross-tab-msg'
import { useRoute } from 'vue-router'
import { watch, ref, computed, toRaw } from 'vue'
import * as api from '@/api/modules/excel.api'
import { excelData, initData } from '../ExcelEdit/useData'
import { deepCopy } from '@/utils/util'

defineOptions({
  name: 'DataEditSimple',
})
const title = computed({
  get: () => excelData.value.name,
  set: val => (excelData.value.name = val),
})

const route = useRoute()
const render = ref(false)
const btnLoading = ref(false)
const isMaskShow = ref(false)

const formData = ref({})
const sheets = ref(null)

// 关闭
function closePage() {
  window.close()
}

function initFormData(detail) {
  const mapping = deepCopy(excelData.value.mapping)
  mapping.forEach(item => {
    const { fieldName } = item
    formData.value[fieldName] = detail ? detail.data[fieldName] : ''
  })
  if (detail && detail.sheets) {
    sheets.value = deepCopy(detail.sheets)
  }
}

// 保存
async function saveSheetData() {
  try {
    btnLoading.value = true

    const data = {
      id: route.query.id ?? '',
      tempId: excelData.value.id,
      tempName: excelData.value.name,
      data: toRaw(formData.value),
    }
    if (sheets.value && sheets.value[0]) {
      data.sheets = toRaw(sheets.value)

      // 根据mapping的映射，将对象中的值填充到celldata中去
      const mapping = deepCopy(excelData.value.mapping)
      const celldata = data.sheets[0].celldata || []
      // 从celldata中查找mapping中的cellIndex 的位置，并填充相关数据
      mapping.forEach(item => {
        const { cellIndex, fieldName } = item
        const { column, row } = cellIndex
        const cIndex = celldata.findIndex(i => i.c === column && i.r === row)
        const value = formData.value[fieldName]
        // 如果存在当前这个单元格，则单元格内容给扩展两个属性
        if (cIndex > -1) {
          celldata[cIndex].v.v = celldata[cIndex].v.m = value
          data.sheets[0].data[row][column].v = data.sheets[0].data[row][column].m = value
        }
      })
    }

    // 如果是新增报表，则调用新增
    if (data.id === '') {
      await api.addSheetData(data)
      Message.success('新增成功!')
      sendMsg('add-sheet-data', { ...data })
      initFormData()
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

watch(
  () => route.path,
  async () => {
    const { tempId, id } = route.query
    document.title = '数据填报'
    if (tempId) {
      initData()
      // 如果是有id表示为修改，无id则获取创建对象来进行设置
      const detail = await api.getTempDetail(tempId)
      excelData.value = { ...detail }

      initFormData()

      // 如果id存在，则获取当前这条数据的详情
      if (id) {
        const row = await api.getSheetDataDetail(id)
        initFormData(row)
      }
    }
    render.value = true
  },
  { immediate: true },
)
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
    padding: 20px;
    .form-box {
      width: 100%;
      max-width: 440px;
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
