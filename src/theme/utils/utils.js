// 读取文件转换为json
export function fileToJson(file) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader()
    // 文件读取载入后
    reader.onload = readerEvent => {
      let content = readerEvent.target.result
      try {
        let jsonData = JSON.parse(content)
        resolve(jsonData)
      } catch (error) {
        reject('文件不是json格式!', error)
      }
    }
    if (file) {
      reader.readAsText(file, 'UTF-8')
    } else {
      reject('文件不存在！')
    }
  })
}

// 导出全部json
export function exportJson(configStr) {
  const jsonStr = JSON.stringify(configStr, null, 2) //  把 JSON 对象转换为字符串
  const blob = new Blob([jsonStr]) //  创建 blob 对象
  const link = document.createElement('a')
  link.setAttribute('href', URL.createObjectURL(blob)) //  创建一个 URL 对象并传给 a 的 href
  link.setAttribute('download', 'theme-config.json') // 设置下载的默认文件名
  link.setAttribute('id', 'b-link-temp')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(document.getElementById('b-link-temp'))
}

// 保存一段文本至一个文件
export function saveFile(str, fileName, type = 'text/css') {
  const blob = new Blob([str], { type })
  const link = document.createElement('a')
  link.setAttribute('href', URL.createObjectURL(blob)) //  创建一个 URL 对象并传给 a 的 href
  link.setAttribute('download', fileName) // 设置下载的默认文件名
  link.setAttribute('id', 'b-link-temp')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(document.getElementById('b-link-temp'))
}

// 获取css变量文件vars.css
export function getCssVars(config) {
  const format = {
    global: [],
    header: [],
    sider: [],
    menu: [],
    tags: [],
    content: [],
    table: [],
    page: [],
    bin: [],
  }
  Object.keys(config).forEach(key => {
    const keyFormat = convertToCSSVariableName(key)
    const value = config[key]
    const obj = { key: keyFormat, value }
    if (key.startsWith('vG')) format.global.push(obj)
    if (key.startsWith('vHeader')) format.header.push(obj)
    if (key.startsWith('vSider')) format.sider.push(obj)
    if (key.startsWith('vMenu')) format.menu.push(obj)
    if (key.startsWith('vTags')) format.tags.push(obj)
    if (key.startsWith('vContent')) format.content.push(obj)
    if (key.startsWith('vTable')) format.table.push(obj)
    if (key.startsWith('vPage')) format.page.push(obj)
    if (key.startsWith('bin')) format.bin.push(obj)
  })

  let output = ':root {\n'
  // 根据类别取值并进行转换拼接
  output += '  /* 全局 global */\n'
  format.global.forEach(i => (output += `  ${i.key}: ${i.value};\n`))
  output += '  /* 头部 header */\n'
  format.header.forEach(i => (output += `  ${i.key}: ${i.value};\n`))
  output += '  /* 侧边栏 sider */\n'
  format.sider.forEach(i => (output += `  ${i.key}: ${i.value};\n`))
  output += '  /* 侧边菜单 menu */\n'
  format.menu.forEach(i => (output += `  ${i.key}: ${i.value};\n`))
  output += '  /* 多页签 tags-view */\n'
  format.tags.forEach(i => (output += `  ${i.key}: ${i.value};\n`))
  output += '  /* 内容区域 content */\n'
  format.content.forEach(i => (output += `  ${i.key}: ${i.value};\n`))
  output += '  /* table */\n'
  format.table.forEach(i => (output += `  ${i.key}: ${i.value};\n`))
  output += '  /* page */\n'
  format.page.forEach(i => (output += `  ${i.key}: ${i.value};\n`))
  output += '  /* ui library */\n'
  output += '  --colors: ('
  format.bin.forEach((i, index) => {
    if (i.key === '--bin-color-primary') output += `primary: ${i.value}`
    if (i.key === '--bin-color-success') output += `success: ${i.value}`
    if (i.key === '--bin-color-warning') output += `warning: ${i.value}`
    if (i.key === '--bin-color-danger') output += `danger: ${i.value}`
    if (i.key === '--bin-color-info') output += `info: ${i.value}`
    if (index < format.bin.length - 1) output += ', '
  })
  output += ');\n'

  // 色卡生成
  output += '  @each $val, $color in var(--colors) {\n'
  output += '    --bin-color-$(val): $(color);\n'
  output += '    --bin-color-$(val)-light1: mix(#fff, $(color), 0.2);\n'
  output += '    --bin-color-$(val)-light2: mix(#fff, $(color), 0.4);\n'
  output += '    --bin-color-$(val)-light3: mix(#fff, $(color), 0.6);\n'
  output += '    --bin-color-$(val)-light4: mix(#fff, $(color), 0.8);\n'
  output += '    --bin-color-$(val)-light5: mix(#fff, $(color), 0.9);\n'
  output += '    --bin-color-$(val)-light6: mix(#fff, $(color), 0.95);\n'
  output += '    --bin-color-$(val)-active: mix(#000, $(color), 0.1);\n'
  output += '  }\n'

  // 非必要条件
  output += '  /* 以下不需要进行变量覆盖，根据实际情况调节即可 */\n'
  output += '  /* 背景色 */\n'
  output += '  --bin-bg-color-1: var(--v-g-bg-color-1);\n'
  output += '  --bin-bg-color-2: var(--v-g-bg-color-2);\n'
  output += '  --bin-bg-color-3: var(--v-g-bg-color-3);\n'
  output += '  --bin-bg-color-4: var(--v-g-bg-color-4);\n'

  output += '  /* 文字色 */\n'
  output += '  --bin-text-color-1: var(--v-g-text-color-1);\n'
  output += '  --bin-text-color-2: var(--v-g-text-color-2);\n'
  output += '  --bin-text-color-3: var(--v-g-text-color-3);\n'
  output += '  --bin-text-color-4: var(--v-g-text-color-4);\n'

  output += '  /* 填充色 */\n'
  output += '  --bin-fill-color-1: var(--v-g-fill-color-1);\n'
  output += '  --bin-fill-color-2: var(--v-g-fill-color-2);\n'
  output += '  --bin-fill-color-3: var(--v-g-fill-color-3);\n'
  output += '  --bin-fill-color-4: var(--v-g-fill-color-4);\n'

  // 最后闭合
  output += '}\n'
  return output
}

// readJson
export function loadJsonFile() {
  return new Promise(resolve => {
    let input = document.createElement('input')
    input.type = 'file'

    input.onchange = function (e) {
      let file = e.target.files[0]
      fileToJson(file).then(data => resolve(data))
    }

    input.click()
  })
}

// 比对默认配置对象，获取不同的属性值
export function getChangedProperties(obj1, obj2) {
  let changedProperties = {}
  function compareObjects(obj1, obj2, path) {
    for (let key in obj1) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj1.hasOwnProperty(key)) {
        let newPath = (path ? path + '.' : '') + key
        if (typeof obj2[key] === 'object' && typeof obj1[key] === 'object') {
          compareObjects(obj1[key], obj2[key], newPath)
        } else if (obj1[key] !== obj2[key]) {
          changedProperties[newPath] = obj2[key]
        }
      }
    }
  }
  compareObjects(obj1, obj2, '')
  return changedProperties
}

// 是否是颜色值
export function isColorValue(str) {
  // 使用正则表达式判断是否为颜色值或者 RGB/RGBA 值
  let colorRegex =
    // eslint-disable-next-line no-useless-escape
    /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$|^rgba?\([\d]+\s*,\s*[\d]+\s*,\s*[\d]+(,\s*[\d\.]+)?\)$/i

  // 检查字符串是否匹配颜色值或者 RGB/RGBA 值的正则表达式
  return colorRegex.test(str)
}

/**
 * 转换一个变量值为css变量 turn binColorPrimary => to  --bin-color-primary
 * @param {*} str
 * @returns
 */
export function convertToCSSVariableName(str) {
  return `--${str.replace(/([A-Z])/g, '-$1').toLowerCase()}`
}
