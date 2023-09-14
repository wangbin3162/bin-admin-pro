export default {
  lang: 'zh', // 设定表格语言
  showinfobar: false, // 是否显示信息栏
  showtoolbar: true, // 是否显示工具栏
  showtoolbarFormula: true, // 是否显示公式栏
  showtoolbarData: true, // 是否显示数据操作栏
  showtoolbarConfig: {
    undoRedo: true, //撤销重做，注意撤消重做是两个按钮，由这一个配置决定显示还是隐藏
    paintFormat: true, //格式刷
    currencyFormat: false, //货币格式
    percentageFormat: false, //百分比格式
    numberDecrease: false, // '减少小数位数'
    numberIncrease: false, // '增加小数位数
    moreFormats: true, // '更多格式'
    font: true, // '字体'
    fontSize: true, // '字号大小'
    bold: true, // '粗体 (Ctrl+B)'
    italic: true, // '斜体 (Ctrl+I)'
    strikethrough: true, // '删除线 (Alt+Shift+5)'
    underline: true, // '下划线 (Alt+Shift+6)'
    textColor: true, // '文本颜色'
    fillColor: true, // '单元格颜色'
    border: true, // '边框'
    mergeCell: true, // '合并单元格'
    horizontalAlignMode: true, // '水平对齐方式'
    verticalAlignMode: true, // '垂直对齐方式'
    textWrapMode: true, // '换行方式'
    textRotateMode: true, // '文本旋转方式'
    image: false, // '插入图片'
    link: false, // '插入链接'
    chart: false, // '图表'（图标隐藏，但是如果配置了chart插件，右击仍然可以新建图表）
    postil: false, //'批注'
    pivotTable: false, //'数据透视表'
    function: true, // '公式'
    frozenMode: true, // '冻结方式'
    sortAndFilter: true, // '排序和筛选'
    conditionalFormat: true, // '条件格式'
    dataVerification: true, // '数据验证'
    splitColumn: false, // '分列'
    screenshot: false, // '截图'
    findAndReplace: true, // '查找替换'
    protection: true, // '工作表保护'
    print: false, // '打印'
  },
  showsheetbar: true, // 是否显示 Sheet 标签栏
  showstatisticBar: true, // 是否显示统计信息栏
  showstatisticBarConfig: {
    view: false,
  },
  allowUpdate: true, // 是否允许用户修改数据
  allowInsertRow: true, // 是否允许用户插入行
  allowInsertColumn: true, // 是否允许用户插入列
  allowDeleteRow: true, // 是否允许用户删除行
  allowDeleteColumn: true, // 是否允许用户删除列
  allowRenameSheet: true, // 是否允许用户重命名 Sheet
  allowCopy: true, // 是否允许用户复制
  allowSortRow: true, // 是否允许用户对行排序
  allowStatistic: true, // 是否允许用户进行统计计算
  allowFilter: true, // 是否允许用户进行筛选
  allowResize: true, // 是否允许用户调整行列大小
}
