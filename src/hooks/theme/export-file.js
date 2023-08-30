import { fileToJson } from '@/utils/file-helper'

// 导出全部json
export function exportJson(configStr) {
  const link = document.createElement('a')
  const jsonStr = JSON.stringify(configStr, null, 2) //  把 JSON 对象转换为字符串
  const blob = new Blob([jsonStr]) //  创建 blob 对象
  link.setAttribute('href', URL.createObjectURL(blob)) //  创建一个 URL 对象并传给 a 的 href
  link.setAttribute('download', 'config.json') // 设置下载的默认文件名
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
