// 生成预览图片方法。存成base64数据存储
import { toPng } from 'html-to-image'

// 生成缩略图
async function createPreviewThumb(el) {
  try {
    const width = el.clientWidth
    const height = el.clientHeight
    return await toPng(el, { quality: 1, width, height, backgroundColor: '#ffffff' })
  } catch (error) {
    console.error(error)
    return ''
  }
}

export { createPreviewThumb }
