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
