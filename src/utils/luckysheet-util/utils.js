/**
 * 根据range值显示当前位置信息
 * @param {{row:[],column:[]}} range
 */
export function formateCellRange(range, dev = true) {
  const rowStart = range['row'][0]
  const rowEnd = range['row'][1]
  const colStart = range['column'][0]
  const colEnd = range['column'][1]

  if (dev) {
    console.log('------------------------ 选区log -------------------------')
    const log1 = `开始单元格：row：${rowStart + 1} col：${colStart + 1}`
    const log2 = `结束单元格：row：${rowEnd + 1} col：${colEnd + 1}`
    const log3 = `选中单元格数量：${rowEnd - rowStart + 1}行 ${colEnd - colStart + 1}列`
    console.log(`${log1} | ${log2} | ${log3}`)
  }

  return {
    cellIndex: { row: rowStart, column: colStart }, // 存储取值单元格的索引
    cellRange: range,
    cellPosition: {
      start: `${convertNumToUppercaseLetter(colStart)}${rowStart + 1}`,
      end: `${convertNumToUppercaseLetter(colEnd)}${rowEnd + 1}`,
    },
  }
}

// 将数值转换为大写字母
const convertNumToUppercaseLetter = number => {
  const charCodeA = 65 // A 的 ASCII 码

  // 使用 String.fromCharCode 方法将 ASCII 码转换为字母
  const letter = String.fromCharCode(charCodeA + number)

  return letter
}

/**
 * 根据当前的字符串选区，转换为cellRange
 * @param {*} text
 */
export function convertToRowColumn(text) {
  if (text.length === 0) return null
  let row = 0
  let column = 0
  // 处理第一个字母
  if (text.length > 0) {
    column = letterToNumber(text.charAt(0))
    if (text.length > 1) {
      let char = text.charAt(1)
      // 如果第二个是字母则追加column列
      if (isLetter(char)) {
        column = (column + 1) * 26 + letterToNumber(char)
      }
    }
    const num = extractNumber(text)
    row = num - 1
  }
  if (row < 0 || column < 0) return null

  return { row, column }
}

// 取出数字
function extractNumber(text) {
  let matches = text.match(/\d+$/)
  if (matches) {
    return parseInt(matches[0], 10)
  }
  return null
}

function letterToNumber(letter) {
  return letter.charCodeAt(0) - 65
}

function isLetter(char) {
  return /^[A-Z]$/.test(char)
}

function isNumber(char) {
  return /^\d$/.test(char)
}

/**
 * 根据配置的函数表达式，获取对应的参数信息
 *
 * @param {*} fx
 */
export function convertFxStr(fx) {
  let matchCellRange = null // 受哪个匹配单元格的影响
  let sourceList = [] // 陪陪的内容列表
  let orderIndex = 0 // 工作表内容

  let countIf = null

  // 拆出匹配函数MATCH()
  let regexMATCH = /MATCH\((.*?)\)/
  let matchMATCH = fx.match(regexMATCH)

  if (matchMATCH) {
    let matchExpression = matchMATCH[0] // 完整的 MATCH 表达式
    let matchParameters = matchMATCH[1] // 括号内的参数

    console.log('MATCH 表达式:', matchExpression)
    console.log('参数:', matchParameters)
    if (matchExpression && matchParameters) {
      const params = matchParameters.split(',')
      if (params.length === 3) {
        // 1.获取匹配后的填充单元格
        matchCellRange = convertToRowColumn(params[0])
        // 2. 获取匹配的数据源单元格数组
        sourceList = getCellsByRange(params[1])
        // 3.获取当前的sheet工作表下标
        orderIndex = +params[2]
      }
    }
    // 从sourceList和工作表中取值并使用逗号拼接
  } else {
    console.log('未找到 MATCH 表达式')
  }

  let regexCOUNTIF = /COUNTIF\((.*?)\)/
  let matchCOUNTIF = fx.match(regexCOUNTIF)

  if (matchCOUNTIF) {
    let matchExpression = matchCOUNTIF[0] // 完整的 COUNTIF表达式
    let matchParameters = matchCOUNTIF[1] // 括号内的参数

    console.log('COUNTIF 表达式:', matchExpression)
    console.log('参数:', matchParameters)
    if (matchExpression && matchParameters) {
      const params = matchParameters.split(',')
      let keysList = []
      let valuesList = []
      if (params.length === 2) {
        // 1. 获取条件key值列表
        keysList = getCellsByRange(params[0])
        valuesList = getCellsByRange(params[1])
        // 保存countIf条件
        countIf = {
          keysList,
          valuesList,
        }
      }
    }
  } else {
    console.log('未找到 COUNTIF 表达式')
  }

  const backData = {
    matchCellRange,
    sourceList,
    orderIndex,
    countIf,
  }

  console.log(backData)

  return backData
}

// 根据一个范围返回一个cells 集合 如：A1:A7
function getCellsByRange(range) {
  const list = []

  // 1. 获取条件key值列表
  const keys = range.split(':')
  // 如果首字母相同则表示同列
  const cellStart = convertToRowColumn(keys[0])
  const cellEnd = convertToRowColumn(keys[1])
  // 表示同列
  if (cellStart.column === cellEnd.column) {
    for (let i = cellStart.row; i <= cellEnd.row; i++) {
      list.push({
        column: cellStart.column,
        row: i,
      })
    }
  }
  // 表示同行取值
  if (cellStart.row === cellEnd.row) {
    for (let i = cellStart.column; i <= cellEnd.column; i++) {
      list.push({
        column: i,
        row: cellStart.row,
      })
    }
  }

  return list
}
