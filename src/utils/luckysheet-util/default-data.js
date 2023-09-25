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
      cellRange: { row: [], column: [] },
      cellPosition: { start: 'A1', end: 'A1' },
      fieldName: '', // 字段名称
      fieldTitle: '', // 字段标题
      dataType: 'string', // string,number,date,select,
      // 数据源
      datasource: {
        type: 'normal', //  DatasourceType 类型 数据源类型normal为普通模式， 普通模式 直接使用逗号分割
        normal: '', // 普通模式取值
        cascade: '', //  级联模式取值
        fx: '', //  函数 模式取值
      },
      // 事件配置
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

// dataType 数据类型枚举
MappingItem.DataType = {
  mapping: {
    string: '文本',
    number: '数值',
    date: '日期',
    select: '下拉',
  },
  options: [
    { key: 'string', label: '文本' },
    { key: 'number', label: '数值' },
    { key: 'date', label: '日期' },
    { key: 'select', label: '下拉' },
  ],
}

// dataType 数据类型枚举
MappingItem.DatasourceType = {
  mapping: {
    normal: '普通模式', //  普通模式直接取值字符串逗号分割
    cascade: '级联模式', //  普通模式直接取值字符串逗号分割
    fx: '函数模式', // 函数模式，需要编写函数代码。
  },
}

//   excel cell的数据验证 数据验证的配置信息
export class OptionItem {
  constructor() {
    this.dataVerification = {
      checked: false,
      hintShow: false,
      hintText: '',
      prohibitInput: false,
      remote: false,
      type: 'dropdown',
      type2: false,
      value1: '',
      value2: '',
    }
  } // 获取默认配置
  getDefault() {
    return this.dataVerification
  }
  getMerge(item) {
    const merged = deepMerge(deepCopy(this.dataVerification), deepCopy(item))
    return merged
  }
}
