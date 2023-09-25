/**
 * 根据range值显示当前位置信息
 * @param {{row:[],columns:[]}} range
 */
export function formateCellRange(range, dev = true) {
  const rowStart = range['row'][0]
  const rowEnd = range['row'][1]
  const colStart = range['column'][0]
  const colEnd = range['column'][1]

  if (dev) {
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
