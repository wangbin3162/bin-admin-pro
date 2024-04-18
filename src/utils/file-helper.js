// 读取文件并读取图片宽高
export async function fileToImageBase64(file, maxWait = 2500) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader()
    // 文件读取载入后
    reader.onload = () => {
      let img = new Image()
      let url = (img.src = reader.result)
      if (img.complete) {
        const { width, height } = img
        resolve({
          url,
          width,
          height,
        })
      } else {
        let timeOut = setTimeout(() => {
          reject('图片加载失败！')
        }, maxWait)
        img.onload = () => {
          const { width, height } = img
          window.clearTimeout(timeOut)
          resolve({
            url,
            width,
            height,
          })
        }
      }
    }
    if (file) {
      reader.readAsDataURL(file)
    } else {
      reject('文件不存在！')
    }
  })
}

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

// base64转file
export function dataURLtoFile(dataurl, filename) {
  let arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}
