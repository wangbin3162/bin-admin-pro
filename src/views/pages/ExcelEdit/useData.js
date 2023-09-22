import LuckyExcel from 'luckyexcel'
import { ref, computed, onBeforeUnmount, onMounted } from 'vue'
import { Message, MessageBox } from 'bin-ui-next'
import { IS_DEV } from '@/utils/env'
import { isFunction } from '@/utils/luckysheet-util/is'
import { exportExcel } from '@/utils/luckysheet-util/export'
import { deepMerge, deepCopy } from '@/utils/util'
import defaultOpts from '@/utils/luckysheet-util/default-options'
import { defaultSheetInfo } from '@/utils/luckysheet-util/data-tmp'

// @ts-ignore
const LuckySheet = window.luckysheet

// 共享变量数据
const excelData = ref({
  id: '',
  name: '', // 模板名称，也就是保存时的文件名称
  jsonData: [],
  mapping: [],
})

function initData() {
  excelData.value = {
    id: '',
    name: '',
    jsonData: [],
    mapping: [],
  }
}

// debug
function debug() {
  if (!IS_DEV) return
  console.log('-------------------------------------debug--------------------------------------')
  console.log('excelData', excelData.value)
  console.log('-----------------------------------debug end------------------------------------')
}

function useData(props) {
  const btnLoading = ref(false)
  const isMaskShow = ref(false)

  const info = ref({ ...defaultSheetInfo, ...excelData.value?.jsonData?.info })

  const title = computed({
    get: () => excelData.value.name,
    set: val => (excelData.value.name = val),
  })

  // 事件调用系统
  const cellUpdated = (r, c, oldvalue, newValue) => {
    // 判断当前修改的单元格，是否存在在mapping映射中
    const mapping = deepCopy(excelData.value.mapping)
    const enableEvents = mapping.filter(i => i.dataType === 'select' && i.events?.enable)
    const index = enableEvents.findIndex(i => i.cellIndex.row === r && i.cellIndex.column === c)

    if (index < 0) return
    const cellValue = { r, c, oldvalue, newValue }
    const currentEvents = mapping[index].events
    if (!currentEvents) return
    console.log('--------[cellUpdated]---------')
    console.log('--------[events]:', currentEvents)
    console.log('--------[cellValue]:', cellValue)
    console.log('--------[mapping]:', mapping)

    excuteFunc(mapping[index].events, cellValue, mapping)
  }

  // 执行事件
  const excuteFunc = (events, cellValue, mapping) => {
    const { augments, funcBody } = events
    const fun = new Function(...augments, funcBody)
    fun(LuckySheet, cellValue, mapping)
  }

  const options = computed(() => {
    const opt = deepMerge(
      deepCopy({
        ...defaultOpts,
        container: 'SheetContainer',
        title: title.value, // 设定表格名称
        data: [{ name: 'Sheet1', index: 0 }],
        hook: {
          cellUpdated,
        },
      }),
      deepCopy(props.cfg),
    )

    return opt
  })
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

  return { info, title, options, btnLoading, isMaskShow, closePage, loadExcel, downloadExcel }
}

export { excelData, initData, debug, useData }
