import { deepMerge, deepCopy } from '@/utils/util'

// 默认sheetInfo信息
export const defaultSheetInfo = {
  appversion: '',
  company: '',
  createdTime: '',
  creator: '',
  lastmodifiedby: '',
  modifiedTime: '',
  name: '',
}

// 字段映射的基础值
export class MappingItem {
  constructor() {
    this.dft = {
      cellIndex: { row: 0, column: 0 }, // 存储取值单元格的索引
      cellRange: { row: [], columns: [] },
      cellPosition: { start: 'A1', end: 'A1' },
      fieldName: '', // 字段名称
      fieldTitle: '', // 字段标题
      dataType: 'string', // string,number,date,select,
      datasource: '', // 数据源
      events: {
        enable: false,
        augments: ['LuckySheet', 'cellValue', 'mapping'],
        funcBody: '',
      },
    }
  }
  // 获取默认配置
  getDefault() {
    return this.dft
  }
  getMerge(item) {
    const merged = deepMerge(deepCopy(this.dft), deepCopy(item))
    return merged
  }
}
