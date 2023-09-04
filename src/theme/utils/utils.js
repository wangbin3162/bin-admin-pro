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
  const link = document.createElement('a')
  const jsonStr = JSON.stringify(configStr, null, 2) //  把 JSON 对象转换为字符串
  const blob = new Blob([jsonStr]) //  创建 blob 对象
  link.setAttribute('href', URL.createObjectURL(blob)) //  创建一个 URL 对象并传给 a 的 href
  link.setAttribute('download', 'theme-config.json') // 设置下载的默认文件名
  link.setAttribute('id', 'b-link-temp')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(document.getElementById('b-link-temp'))
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
